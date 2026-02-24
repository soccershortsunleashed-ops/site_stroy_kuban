import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { SiteHeader } from "@/components/layout/site-header"

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}))

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

describe("Шапка сайта", () => {
  it("renders larger brand logo in header", () => {
    render(<SiteHeader />)

    const logo = screen.getByAltText("Логотип СтройТрест-23")
    expect(logo).toHaveAttribute("width", "52")
    expect(logo).toHaveAttribute("height", "52")
  })
})
