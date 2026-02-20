"use client"

import { motion } from "framer-motion"
import type { PropsWithChildren } from "react"

import { cn } from "@/lib/utils"
import { useMotionMode } from "@/lib/use-motion-mode"

type PageRevealProps = PropsWithChildren<{
  className?: string
  delay?: number
  reduced?: boolean
  once?: boolean
}>

export function PageReveal({
  children,
  className,
  delay = 0,
  reduced,
  once = true,
}: PageRevealProps) {
  const { prefersReduced, profile } = useMotionMode()
  const shouldReduce = reduced ?? prefersReduced

  if (shouldReduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: profile.revealDistance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: profile.revealDuration, delay }}
    >
      {children}
    </motion.div>
  )
}
