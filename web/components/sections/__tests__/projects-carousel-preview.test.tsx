import { act, fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { ProjectsCarousel } from "@/components/sections/projects-carousel"

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const normalized = { ...props, alt: String(props.alt ?? "") }
    delete normalized.fill
    delete normalized.priority
    const { alt, ...rest } = normalized as Record<string, string>

    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt ?? ""} {...rest} />
  },
}))

describe("ProjectsCarousel preview", () => {
  it("renders orange gradient border layer for card hover", () => {
    render(<ProjectsCarousel />)

    const cards = screen.getAllByTestId("card-stack-card")
    const hoverBorders = screen.queryAllByTestId("card-stack-hover-border")

    expect(cards.length).toBeGreaterThan(0)
    expect(hoverBorders).toHaveLength(cards.length)
  })

  it("opens large preview when clicking a card", () => {
    render(<ProjectsCarousel />)

    const cards = screen.getAllByTestId("card-stack-card")
    fireEvent.click(cards[0]!)

    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByTestId("home-project-preview-image")).toBeInTheDocument()
  })

  it("auto-shifts cards every 2 seconds", () => {
    vi.useFakeTimers()

    render(<ProjectsCarousel />)

    const getActiveDotIndex = () => {
      const dots = screen.getAllByRole("button", {
        name: /Перейти к карточке/,
      })

      return dots.findIndex((dot) => {
        const className = dot.getAttribute("class") ?? ""
        return (
          className.includes("bg-foreground") &&
          !className.includes("bg-foreground/30")
        )
      })
    }

    expect(getActiveDotIndex()).toBe(0)

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(getActiveDotIndex()).toBe(1)
    vi.useRealTimers()
  })
})
