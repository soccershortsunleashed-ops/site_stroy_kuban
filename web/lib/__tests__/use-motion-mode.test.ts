import { renderHook } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { useMotionMode } from "@/lib/use-motion-mode"

function setMediaQuery(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe("useMotionMode", () => {
  it("returns mobile mode for small viewport without reduced-motion", () => {
    setMediaQuery(false)
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      writable: true,
      value: 480,
    })

    const { result } = renderHook(() => useMotionMode())

    expect(result.current.mode).toBe("mobile")
    expect(result.current.isMobile).toBe(true)
    expect(result.current.isReduced).toBe(false)
  })

  it("returns reduced mode when prefers-reduced-motion is enabled", () => {
    setMediaQuery(true)
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      writable: true,
      value: 1280,
    })

    const { result } = renderHook(() => useMotionMode())

    expect(result.current.mode).toBe("reduced")
    expect(result.current.prefersReduced).toBe(true)
    expect(result.current.isReduced).toBe(true)
  })
})
