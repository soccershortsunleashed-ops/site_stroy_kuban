import { describe, expect, it } from "vitest"

import { getProjectCaseBySlug, projectCases } from "@/data/project-cases"

describe("project cases catalog", () => {
  it("contains exactly two top-level projects", () => {
    expect(projectCases).toHaveLength(2)
  })

  it("contains unique slugs", () => {
    const slugs = projectCases.map((project) => project.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it("finds project by slug", () => {
    const lyceum = getProjectCaseBySlug("presidential-lyceum-sirius")
    expect(lyceum?.title).toContain("Президентский Лицей")
  })
})
