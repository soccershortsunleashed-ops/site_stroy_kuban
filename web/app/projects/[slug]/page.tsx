import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Script from "next/script"

import { getProjectCaseBySlug, projectCases } from "@/data/project-cases"
import { services } from "@/data/site-content"
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
      title: "Проект не найден",
      robots: { index: false, follow: false },
    }
  }

  return {
    title: `${project.title} — реализованный проект`,
    description: `${project.summary} ${project.location}. Проект реализован СтройТрест-23 в Краснодарском крае (Краснодар/Сочи/Сириус).`,
    keywords: [
      project.title,
      project.category,
      "реализованный строительный проект",
      "строительство и реконструкция",
      "СтройТрест-23",
    ],
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
      url: `/projects/${project.slug}`,
      images: [{ url: project.previewImage, alt: project.title }],
    },
  }
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectCaseBySlug(slug)
  if (!project) notFound()
  const webmSrc = project.videoSrc.replace(/\.mp4$/i, ".webm")
  const h264Src = project.videoSrc.replace(/\.mp4$/i, "-h264.mp4")
  const siteUrl = "https://stroytrest-23.ru"
  const pageUrl = `${siteUrl}/projects/${project.slug}`
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Проекты", item: `${siteUrl}/projects` },
      { "@type": "ListItem", position: 3, name: project.title, item: pageUrl },
    ],
  }
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description: project.summary,
    about: project.category,
    datePublished: `${project.year}-01-01`,
    inLanguage: "ru-RU",
    mainEntityOfPage: pageUrl,
    image: [`${siteUrl}${project.previewImage}`],
    author: {
      "@type": "Organization",
      name: "СтройТрест-23",
    },
    publisher: {
      "@type": "Organization",
      name: "СтройТрест-23",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/brand-logo-transparent.png`,
      },
    },
  }
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: project.title,
    description: project.summary,
    thumbnailUrl: [`${siteUrl}${project.videoPoster}`],
    contentUrl: `${siteUrl}${project.videoSrc}`,
    embedUrl: pageUrl,
    uploadDate: `${project.year}-01-01T00:00:00+03:00`,
    inLanguage: "ru-RU",
    publisher: {
      "@type": "Organization",
      name: "СтройТрест-23",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/brand-logo-transparent.png`,
      },
    },
  }
  const relatedServicesByProject: Record<string, string[]> = {
    "fok-sirius": ["full-cycle", "infrastructure-engineering"],
    "presidential-lyceum-sirius": ["revitalization", "human-centric", "infrastructure-engineering"],
    "mys-adler-sports-park": ["landscape-transforming", "full-cycle"],
    "tsup-presentation-pavilion": ["full-cycle", "human-centric"],
  }
  const relatedServices = (relatedServicesByProject[project.slug] ?? [])
    .map((serviceSlug) => services.find((item) => item.slug === serviceSlug))
    .filter((item): item is (typeof services)[number] => Boolean(item))
  const siblingProjects = projectCases.filter((item) => item.slug !== project.slug).slice(0, 3)


  return (
    <div className="space-y-6">
      <Script
        id={`project-breadcrumb-${project.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id={`project-schema-${project.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <Script
        id={`project-video-schema-${project.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <div className="space-y-3">
        <Button asChild variant="ghost" size="sm" className="w-fit px-2">
          <Link href="/projects">
            <ArrowLeft className="size-4" />К проектам
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
            <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg border">
              <video poster={project.videoPoster} controls preload="metadata" className="h-full w-full object-cover">
                <source src={webmSrc} type="video/webm; codecs=av01.0.08M.08,opus" />
                <source src={project.videoSrc} type="video/mp4; codecs=av01.0.08M.08,mp4a.40.2" />
                <source src={h264Src} type="video/mp4; codecs=avc1.640028,mp4a.40.2" />
              </video>
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
                  <dd className="min-w-28 whitespace-nowrap text-right font-medium">{item.value}</dd>
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

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Релевантные услуги</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {relatedServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="block rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <p className="text-sm font-medium">{service.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{service.short}</p>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Другие проекты</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {siblingProjects.map((item) => (
              <Link
                key={item.slug}
                href={`/projects/${item.slug}`}
                className="block rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.summary}</p>
              </Link>
            ))}
          </CardContent>
        </Card>
      </section>

    </div>
  )
}
