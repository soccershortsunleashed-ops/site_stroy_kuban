import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { getProjectCaseBySlug, projectCases } from "@/data/project-cases"
import { ProjectImageGallery } from "@/components/sections/project-image-gallery"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type RouteParams = {
  slug: string
}

type PageProps = {
  params: Promise<RouteParams>
}

export function generateStaticParams() {
  return projectCases.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectCaseBySlug(slug)

  if (!project) {
    return {
      title: "Проект не найден | СтройТрест-23",
    }
  }

  return {
    title: `${project.title} | СтройТрест-23`,
    description: project.summary,
  }
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectCaseBySlug(slug)
  if (!project) notFound()

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Button asChild variant="ghost" size="sm" className="w-fit px-2">
          <Link href="/projects">
            <ArrowLeft className="size-4" />
            К проектам
          </Link>
        </Button>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{project.category}</Badge>
          <Badge variant="outline">{project.year}</Badge>
          <Badge variant="outline">{project.status}</Badge>
        </div>
        <h1 className="text-3xl font-semibold leading-tight">{project.title}</h1>
        <p className="text-muted-foreground">{project.location}</p>
      </div>

      <section className="grid gap-4 lg:grid-cols-[1.6fr_1.2fr]">
        <Card>
          <CardHeader>
            <CardTitle>Видео проекта</CardTitle>
          </CardHeader>
          <CardContent>
            <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-none border">
              <video
                src={project.videoSrc}
                poster={project.videoPoster}
                controls
                preload="metadata"
                className="h-full w-full object-cover"
              />
            </AspectRatio>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Технико-экономические показатели</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3 text-sm">
              {project.facts.map((item) => (
                <div key={item.label} className="flex items-start justify-between gap-4">
                  <dt className="text-muted-foreground">{item.label}</dt>
                  <dd className="min-w-28 whitespace-nowrap text-right font-medium">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>О проекте</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {project.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Выполненные работы</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {project.scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Фотогалерея</h2>
        <ProjectImageGallery images={project.gallery} />
      </section>
    </div>
  )
}
