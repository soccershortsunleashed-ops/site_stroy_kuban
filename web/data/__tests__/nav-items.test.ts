import { describe, expect, it } from "vitest"

import { navItems } from "@/data/site-content"

describe("navigation items", () => {
  it("contains about tab and hides investors/technologies tabs", () => {
    const titles = navItems.map((item) => item.title)

    expect(titles).toContain("О компании")
    expect(titles).not.toContain("Технологии")
    expect(titles).not.toContain("Инвесторам")
  })
})
