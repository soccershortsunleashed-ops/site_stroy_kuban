export type MotionProfile = {
  revealDuration: number
  revealDistance: number
  parallaxStrength: number
  countUpDuration: number
  stickyOffset: number
}

export const motionTokens = {
  reveal: {
    duration: 0.52,
    distance: 24,
    delayStep: 0.08,
  },
  full: {
    revealDuration: 0.52,
    revealDistance: 24,
    parallaxStrength: 1,
    countUpDuration: 1.15,
    stickyOffset: 120,
  } satisfies MotionProfile,
  mobile: {
    revealDuration: 0.4,
    revealDistance: 14,
    parallaxStrength: 0.45,
    countUpDuration: 0.85,
    stickyOffset: 0,
  } satisfies MotionProfile,
  reduced: {
    revealDuration: 0,
    revealDistance: 0,
    parallaxStrength: 0,
    countUpDuration: 0,
    stickyOffset: 0,
  } satisfies MotionProfile,
} as const
