import { describe, expect, it } from "vitest"

import { getProjectCaseBySlug, projectCases } from "@/data/project-cases"

describe("project cases catalog", () => {
  it("contains project cards", () => {
    expect(projectCases.length).toBeGreaterThanOrEqual(4)
  })

  it("contains unique slugs", () => {
    const slugs = projectCases.map((project) => project.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it("finds project by slug", () => {
    const lyceum = getProjectCaseBySlug("presidential-lyceum-sirius")
    expect(lyceum).toBeDefined()
  })

  it("has non-empty alt text for all gallery images", () => {
    for (const project of projectCases) {
      for (const image of project.gallery) {
        expect(image.alt.trim().length).toBeGreaterThan(0)
      }
    }
  })
})
