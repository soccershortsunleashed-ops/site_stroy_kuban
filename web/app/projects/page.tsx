import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { PageReveal } from "@/components/animation"
import { projectCases } from "@/data/project-cases"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Проекты | СтройТрест-23",
  description:
    "Каталог реализованных проектов СтройТрест-23: карточки объектов с детальными страницами, видео и фотогалереей.",
}

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <PageReveal>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold">Проекты</h1>
          <p className="max-w-3xl text-muted-foreground">
            Выберите проект, чтобы открыть отдельную страницу объекта с видео, фотогалереей
            и ключевой информацией.
          </p>
        </div>
      </PageReveal>

      <section className="grid gap-4 md:grid-cols-2">
        {projectCases.map((project) => (
          <Card key={project.slug} className="overflow-hidden">
            <AspectRatio ratio={16 / 10} className="relative border-b">
              <Image
                src={project.previewImage}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 720px"
              />
            </AspectRatio>
            <CardHeader className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{project.category}</Badge>
                <Badge variant="outline">{project.year}</Badge>
              </div>
              <CardTitle className="leading-tight">{project.title}</CardTitle>
              <CardDescription>{project.summary}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{project.location}</p>
              <Button asChild>
                <Link href={`/projects/${project.slug}`}>Открыть проект</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}
