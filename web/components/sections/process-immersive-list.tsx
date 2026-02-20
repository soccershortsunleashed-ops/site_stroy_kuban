"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"

import { PageReveal } from "@/components/animation"
import { motionTokens } from "@/lib/motion-tokens"
import { useMotionMode } from "@/lib/use-motion-mode"
import { processSteps, projects } from "@/data/site-content"
import { Card, CardContent } from "@/components/ui/card"

type StepItem = (typeof processSteps)[number]

type ProcessImmersiveListProps = {
  steps?: readonly StepItem[]
  activeIndex?: number
}

export function ProcessImmersiveList({
  steps = processSteps,
  activeIndex,
}: ProcessImmersiveListProps) {
  const clampedIndex = useMemo(() => {
    if (activeIndex === undefined) {
      return undefined
    }

    return Math.max(0, Math.min(activeIndex, steps.length - 1))
  }, [activeIndex, steps.length])
  const [internalActiveIndex, setInternalActiveIndex] = useState(clampedIndex ?? 0)
  const currentActiveIndex = clampedIndex ?? internalActiveIndex
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const { isMobile, prefersReduced, profile } = useMotionMode()

  useEffect(() => {
    if (clampedIndex !== undefined || typeof window === "undefined") {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let nextIndex = currentActiveIndex

        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue
          }

          const index = Number(entry.target.getAttribute("data-step-index"))
          if (!Number.isNaN(index)) {
            nextIndex = index
          }
        }

        if (nextIndex !== currentActiveIndex) {
          setInternalActiveIndex(nextIndex)
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.3, 0.5, 0.7],
      },
    )

    for (const card of cardRefs.current) {
      if (card) {
        observer.observe(card)
      }
    }

    return () => observer.disconnect()
  }, [clampedIndex, currentActiveIndex])

  return (
    <div className="relative pl-8">
      <div className="pointer-events-none absolute left-1 top-2 h-[calc(100%-1rem)] w-px bg-border/60">
        <motion.div
          className="w-full bg-primary"
          animate={{
            height: `${((currentActiveIndex + 1) / Math.max(1, steps.length)) * 100}%`,
          }}
          transition={{
            duration: prefersReduced
              ? 0
              : isMobile
                ? motionTokens.mobile.revealDuration
                : motionTokens.full.revealDuration,
          }}
        />
      </div>

      <div className="space-y-5">
        {steps.map((step, index) => {
          const image = projects[index % projects.length]?.image
          const isActive = index === currentActiveIndex

          return (
            <PageReveal key={step.index} delay={index * 0.05}>
              <motion.div
                ref={(node) => {
                  cardRefs.current[index] = node
                }}
                data-step-index={index}
                animate={{
                  opacity: isActive ? 1 : isMobile ? 0.88 : 0.72,
                  scale: isMobile || prefersReduced ? 1 : isActive ? 1 : 0.98,
                }}
                transition={{ duration: prefersReduced ? 0 : Math.max(0.14, profile.revealDuration) }}
              >
                <Card
                  data-testid="process-step-card"
                  data-active={isActive ? "true" : "false"}
                  data-step-index={index}
                  className="overflow-hidden border-border/70"
                >
                  <CardContent className="grid gap-0 p-0 md:grid-cols-[1fr_360px]">
                    <div className="p-6 md:p-8">
                      <p className="text-5xl font-bold text-primary">{step.index}</p>
                      <h2 className="mt-4 text-2xl font-semibold">{step.title}</h2>
                      <p className="mt-3 text-sm text-muted-foreground">{step.body}</p>
                    </div>
                    <div className="relative min-h-56 border-l border-border/50">
                      {image ? (
                        <Image src={image} alt={step.title} fill className="object-cover" />
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </PageReveal>
          )
        })}
      </div>
    </div>
  )
}
