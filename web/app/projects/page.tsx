import type { Metadata } from "next"

import { PageReveal } from "@/components/animation"
import { ProjectsGallery } from "@/components/sections/projects-gallery"

export const metadata: Metadata = {
  title: "Проекты | СтройТрест-23",
  description:
    "Портфолио компании СтройТрест-23: жилые, общественные хабы и ревитализация.",
}

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <PageReveal>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Проекты</h1>
          <p className="max-w-3xl text-muted-foreground">
            Фильтруемая галерея кейсов с акцентом на активный проект, поэтапным раскрытием
            деталей и плавными переходами.
          </p>
        </div>
      </PageReveal>
      <ProjectsGallery />
    </div>
  )
}
