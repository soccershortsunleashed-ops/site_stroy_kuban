import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { ProcessImmersiveList } from "@/components/sections/process-immersive-list"

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const normalized = { ...props, alt: String(props.alt ?? "") }
    delete normalized.fill
    const { alt, ...rest } = normalized as Record<string, string>

    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt ?? ""} {...rest} />
  },
}))

describe("ProcessImmersiveList", () => {
  it("highlights active step as scroll index changes", () => {
    render(<ProcessImmersiveList activeIndex={2} />)

    const cards = screen.getAllByTestId("process-step-card")
    const activeCards = cards.filter((card) => card.getAttribute("data-active") === "true")

    expect(activeCards).toHaveLength(1)
    expect(activeCards[0]).toHaveAttribute("data-step-index", "2")
  })

  it("uses process-specific image for each step title", () => {
    render(<ProcessImmersiveList activeIndex={2} />)

    const image = screen.getByRole("img", { name: "Планирование этапов" })
    expect(image).toHaveAttribute("src", "/process/process-planning.jpeg")
  })
})
