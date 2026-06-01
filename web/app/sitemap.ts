import type { MetadataRoute } from "next"

import { projectCases } from "@/data/project-cases"
import { services } from "@/data/site-content"

const baseUrl = "https://stroytrest-23.ru"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/projects",
    "/services",
    "/process",
    "/technologies",
    "/investors",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }))

  const projectPages: MetadataRoute.Sitemap = projectCases.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticPages, ...projectPages, ...servicePages]
}
