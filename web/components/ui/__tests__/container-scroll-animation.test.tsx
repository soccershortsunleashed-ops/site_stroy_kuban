import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { ContainerScroll } from "@/components/ui/container-scroll-animation"

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>(
    "framer-motion"
  )

  return {
    ...actual,
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: () => ({ get: () => 0 }),
  }
})

describe("ContainerScroll", () => {
  it("keeps title area above the tablet card", () => {
    render(
      <ContainerScroll titleComponent={<div>Заголовок перехода</div>}>
        <div>Контент планшета</div>
      </ContainerScroll>
    )

    const card = screen.getByTestId("container-scroll-card")
    expect(card).toHaveClass("mt-8")
    expect(card).not.toHaveClass("-mt-12")
  })
})
