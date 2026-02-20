import type { ReactNode } from "react"
import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import HomePage from "@/app/page"

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

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

describe("Главная страница с иммерсивными эффектами", () => {
  it("shows KPI numbers with animation wrappers", () => {
    render(<HomePage />)

    expect(screen.getAllByTestId("count-up-value").length).toBeGreaterThan(0)
  })
})
