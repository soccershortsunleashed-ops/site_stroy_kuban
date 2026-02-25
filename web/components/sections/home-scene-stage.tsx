"use client"

import { motion } from "framer-motion"
import type { PropsWithChildren } from "react"

import { useMotionMode } from "@/lib/use-motion-mode"
import { cn } from "@/lib/utils"

type HomeSceneStageProps = PropsWithChildren<{
  id: string
  index: number
  title: string
  sectionClassName?: string
  stickyClassName?: string
  contentClassName?: string
}>

export function HomeSceneStage({
  id,
  index,
  title,
  sectionClassName,
  stickyClassName,
  contentClassName,
  children,
}: HomeSceneStageProps) {
  const { isReduced, profile } = useMotionMode()

  if (isReduced) {
    return (
      <section
        id={id}
        data-home-scene
        data-scene-index={index}
        data-scene-title={title}
        className={cn("space-y-3", sectionClassName)}
      >
        {children}
      </section>
    )
  }

  return (
    <motion.section
      id={id}
      data-home-scene
      data-scene-index={index}
      data-scene-title={title}
      className={cn("space-y-3", sectionClassName)}
      initial={{ opacity: 0, y: profile.revealDistance * 0.65 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: profile.revealDuration + 0.18,
        delay: Math.min(0.14, Math.max(0, index - 1) * 0.018),
      }}
    >
      <div className={cn(stickyClassName)}>
        <motion.div
          className={cn("home-scene-focus", contentClassName)}
          initial={{ opacity: 0.86, scale: 0.992 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{
            duration: profile.revealDuration + 0.2,
            delay: 0.06 + Math.min(0.1, Math.max(0, index - 1) * 0.012),
          }}
        >
          <div className="pointer-events-none absolute inset-0 z-[2]">
            <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-primary/55" />
            <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-primary/55" />
            <span className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-primary/55" />
            <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-primary/55" />
            <span className="absolute left-0 top-1/2 h-px w-7 bg-primary/45" />
            <span className="absolute right-0 top-1/2 h-px w-7 bg-primary/45" />
          </div>
          <div className="relative z-[3]">{children}</div>
        </motion.div>
      </div>
    </motion.section>
  )
}
