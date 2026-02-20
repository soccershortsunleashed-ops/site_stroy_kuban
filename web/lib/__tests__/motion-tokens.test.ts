import { describe, expect, it } from "vitest"
import { motionTokens } from "@/lib/motion-tokens"

describe("motion tokens", () => {
  it("contains balanced durations", () => {
    expect(motionTokens.reveal.duration).toBeGreaterThan(0.4)
  })

  it("exposes reduced profile", () => {
    expect(motionTokens.reduced.revealDuration).toBe(0)
  })
})
