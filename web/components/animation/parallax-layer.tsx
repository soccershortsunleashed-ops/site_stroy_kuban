"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef, type PropsWithChildren } from "react"

import { cn } from "@/lib/utils"
import { useMotionMode } from "@/lib/use-motion-mode"

type ParallaxLayerProps = PropsWithChildren<{
  className?: string
  contentClassName?: string
  strength?: number
  reduced?: boolean
}>

export function ParallaxLayer({
  children,
  className,
  contentClassName,
  strength = 1,
  reduced,
}: ParallaxLayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const isInView = useInView(containerRef, { amount: 0.1 })
  const { prefersReduced, profile } = useMotionMode()
  const shouldReduce = reduced ?? prefersReduced
  const intensity = Math.max(0, strength) * profile.parallaxStrength
  const y = useTransform(scrollYProgress, [0, 1], [26 * intensity, -26 * intensity])

  if (shouldReduce || intensity === 0) {
    return (
      <div ref={containerRef} className={className}>
        <div className={contentClassName}>{children}</div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={className}>
      <motion.div className={cn(contentClassName)} style={isInView ? { y } : undefined}>
        {children}
      </motion.div>
    </div>
  )
}
