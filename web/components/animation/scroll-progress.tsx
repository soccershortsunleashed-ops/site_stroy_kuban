"use client"

import { motion, useScroll } from "framer-motion"

import { cn } from "@/lib/utils"
import { useMotionMode } from "@/lib/use-motion-mode"

type ScrollProgressProps = {
  className?: string
  reduced?: boolean
}

export function ScrollProgress({ className, reduced }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  const { isReduced } = useMotionMode()
  const shouldReduce = reduced ?? isReduced

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-1 origin-left bg-border/40",
        className,
      )}
      aria-hidden
    >
      <motion.div
        className="h-full w-full origin-left bg-primary"
        style={shouldReduce ? { scaleX: 1 } : { scaleX: scrollYProgress }}
      />
    </div>
  )
}
