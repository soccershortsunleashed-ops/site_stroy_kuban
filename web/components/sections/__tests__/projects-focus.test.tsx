import type { ReactNode } from "react"
import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { ProjectsGallery } from "@/components/sections/projects-gallery"

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const normalized = { ...props, alt: String(props.alt ?? "") }
    delete normalized.fill

    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={String(normalized.alt)} {...(normalized as Record<string, string>)} />
  },
}))

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => <a href={href}>{children}</a>,
}))

describe("ProjectsGallery", () => {
  it("marks one project card as active focus", () => {
    render(<ProjectsGallery />)

    const cards = screen.getAllByTestId("project-card")
    const activeCards = cards.filter((card) => card.getAttribute("data-active") === "true")

    expect(activeCards).toHaveLength(1)
  })
})
