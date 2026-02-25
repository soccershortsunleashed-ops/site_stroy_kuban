"use client"

import { motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useMotionMode } from "@/lib/use-motion-mode"

export type HomeSceneInfo = {
  id: string
  index: number
  title: string
}

type HomeSceneIndicatorProps = {
  scenes: HomeSceneInfo[]
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function HomeSceneIndicator({ scenes }: HomeSceneIndicatorProps) {
  const { prefersReduced } = useMotionMode()
  const [activeSceneId, setActiveSceneId] = useState<string>(scenes[0]?.id ?? "")

  useEffect(() => {
    if (scenes.length === 0) {
      return
    }

    let frame = 0
    const updateActiveScene = () => {
      frame = 0
      const viewportCenter = window.scrollY + window.innerHeight * 0.42
      let winner = scenes[0]
      let minDistance = Number.POSITIVE_INFINITY

      for (const scene of scenes) {
        const node = document.getElementById(scene.id)
        if (!node) {
          continue
        }

        const rect = node.getBoundingClientRect()
        const center = window.scrollY + rect.top + rect.height / 2
        const distance = Math.abs(center - viewportCenter)

        if (distance < minDistance) {
          minDistance = distance
          winner = scene
        }
      }

      setActiveSceneId(winner.id)
    }

    const scheduleUpdate = () => {
      if (frame) {
        return
      }

      frame = window.requestAnimationFrame(updateActiveScene)
    }

    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)
    scheduleUpdate()

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame)
      }
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
    }
  }, [scenes])

  const activeIndex = useMemo(
    () => scenes.findIndex((scene) => scene.id === activeSceneId),
    [activeSceneId, scenes],
  )
  const progressHeight = useMemo(() => {
    if (scenes.length < 2 || activeIndex < 0) {
      return 0
    }

    return clamp((activeIndex / (scenes.length - 1)) * 100, 0, 100)
  }, [activeIndex, scenes.length])

  if (scenes.length < 2) {
    return null
  }

  return (
    <aside className="pointer-events-none fixed right-7 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <div className="pointer-events-auto relative pl-2 pr-0">
        <div className="absolute bottom-2 left-3 top-2 w-px bg-border/80" />
        <motion.div
          className="absolute left-3 w-px bg-primary"
          initial={false}
          animate={{ height: `${progressHeight}%`, bottom: "0.5rem" }}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.32, ease: "easeOut" }}
        />

        <ul className="space-y-2">
          {scenes.map((scene) => {
            const isActive = scene.id === activeSceneId

            return (
              <li key={scene.id} className="relative">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className={`relative flex h-8 items-center pl-6 pr-1 text-[12px] font-medium tabular-nums transition-colors ${
                        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                      }`}
                      aria-label={`Go to scene ${scene.index}`}
                      onClick={() => {
                        document.getElementById(scene.id)?.scrollIntoView({
                          behavior: prefersReduced ? "auto" : "smooth",
                          block: "start",
                        })
                      }}
                    >
                      <span className="relative z-10">{scene.index.toString().padStart(2, "0")}</span>
                      <span
                        className={`absolute left-[9px] top-1/2 h-[5px] w-[5px] -translate-y-1/2 border border-border bg-background transition-colors ${
                          isActive ? "border-primary bg-primary" : ""
                        }`}
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="left">{scene.title}</TooltipContent>
                </Tooltip>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
