import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { CountUp } from "@/components/animation/count-up"

describe("CountUp", () => {
  it("renders final number when reduced motion is on", () => {
    render(<CountUp value={27} reduced />)

    expect(screen.getByTestId("count-up-value")).toHaveTextContent("27")
  })
})
