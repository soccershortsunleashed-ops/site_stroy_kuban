"use client"

import { useEffect, useMemo, useState } from "react"

import { cn } from "@/lib/utils"
import { useMotionMode } from "@/lib/use-motion-mode"

type CountUpProps = {
  value: number
  className?: string
  decimals?: number
  prefix?: string
  suffix?: string
  duration?: number
  reduced?: boolean
}

const easeOutCubic = (progress: number) => 1 - (1 - progress) ** 3

export function CountUp({
  value,
  className,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration,
  reduced,
}: CountUpProps) {
  const { isReduced, profile } = useMotionMode()
  const shouldReduce = reduced ?? isReduced
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (shouldReduce) {
      return
    }

    const animationDuration = Math.max(
      0.001,
      (duration ?? profile.countUpDuration) * 1000,
    )
    let animationFrame = 0
    let startTimestamp = 0

    const animate = (timestamp: number) => {
      if (!startTimestamp) {
        startTimestamp = timestamp
      }

      const elapsed = timestamp - startTimestamp
      const progress = Math.min(1, elapsed / animationDuration)
      const nextValue = value * easeOutCubic(progress)

      setDisplayValue(nextValue)

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate)
      }
    }

    animationFrame = window.requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame)
      }
    }
  }, [duration, profile.countUpDuration, shouldReduce, value])

  const textValue = useMemo(() => {
    const baseValue = shouldReduce ? value : displayValue
    const rounded =
      decimals > 0
        ? Number(baseValue.toFixed(decimals))
        : Math.round(baseValue)

    return `${prefix}${rounded.toLocaleString("ru-RU")}${suffix}`
  }, [decimals, displayValue, prefix, shouldReduce, suffix, value])

  return (
    <span
      className={cn("tabular-nums", className)}
      data-count-up="true"
      data-testid="count-up-value"
    >
      {textValue}
    </span>
  )
}
