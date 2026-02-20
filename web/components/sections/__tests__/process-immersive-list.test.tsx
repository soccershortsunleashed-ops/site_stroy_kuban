import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { ProcessImmersiveList } from "@/components/sections/process-immersive-list"

describe("ProcessImmersiveList", () => {
  it("highlights active step as scroll index changes", () => {
    render(<ProcessImmersiveList activeIndex={2} />)

    const cards = screen.getAllByTestId("process-step-card")
    const activeCards = cards.filter((card) => card.getAttribute("data-active") === "true")

    expect(activeCards).toHaveLength(1)
    expect(activeCards[0]).toHaveAttribute("data-step-index", "2")
  })
})
