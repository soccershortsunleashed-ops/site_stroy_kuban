"use client"

import { useEffect, useMemo, useState } from "react"

import { motionTokens } from "@/lib/motion-tokens"

const MOBILE_BREAKPOINT = 768

export type MotionMode = "full" | "mobile" | "reduced"

function resolveMotionMode(): MotionMode {
  if (typeof window === "undefined") {
    return "full"
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "reduced"
  }

  return window.innerWidth < MOBILE_BREAKPOINT ? "mobile" : "full"
}

export function useMotionMode() {
  const [mode, setMode] = useState<MotionMode>(resolveMotionMode)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setMode(resolveMotionMode())

    update()
    query.addEventListener("change", update)
    window.addEventListener("resize", update)

    return () => {
      query.removeEventListener("change", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  const profile = useMemo(() => {
    if (mode === "reduced") {
      return motionTokens.reduced
    }

    return mode === "mobile" ? motionTokens.mobile : motionTokens.full
  }, [mode])

  return {
    mode,
    profile,
    isReduced: mode !== "full",
    prefersReduced: mode === "reduced",
    isMobile: mode === "mobile",
  }
}
