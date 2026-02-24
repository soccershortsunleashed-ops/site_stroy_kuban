"use client"

import Image from "next/image"
import { useState } from "react"

import { projectCases } from "@/data/project-cases"
import { CardStack, type CardStackItem } from "@/components/ui/card-stack"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const galleryItems: CardStackItem[] = projectCases.flatMap((project) =>
  project.gallery.map((image, index) => ({
    id: `${project.slug}-${index + 1}`,
    title: project.title,
    description: `${project.location}, ${project.year}. ${project.summary}`,
    imageSrc: image.src,
    href: `/projects/${project.slug}`,
    ctaLabel: "Открыть проект",
  })),
)

export function ProjectsCarousel() {
  const [selectedPreview, setSelectedPreview] = useState<CardStackItem | null>(null)

  return (
    <>
      <section className="space-y-4" data-testid="home-project-card-stack">
        <h2 className="text-2xl font-semibold">Галерея выполненных объектов</h2>
        <div className="mx-auto w-full max-w-6xl">
          <CardStack
            items={galleryItems}
            initialIndex={0}
            autoAdvance
            intervalMs={2000}
            pauseOnHover={false}
            showDots
            maxVisible={5}
            cardWidth={350}
            cardHeight={230}
            overlap={0.5}
            spreadDeg={44}
            depthPx={120}
            tiltXDeg={10}
            activeLiftPx={16}
            onCardClick={(item) => setSelectedPreview(item)}
          />
        </div>
      </section>

      <Dialog
        open={Boolean(selectedPreview)}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedPreview(null)
          }
        }}
      >
        <DialogContent className="sm:max-w-5xl">
          {selectedPreview ? (
            <>
              <DialogHeader>
                <DialogTitle>{selectedPreview.title}</DialogTitle>
                <DialogDescription>
                  {selectedPreview.description ??
                    "Крупный просмотр карточки проекта."}
                </DialogDescription>
              </DialogHeader>
              <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl border">
                {selectedPreview.imageSrc ? (
                  <Image
                    data-testid="home-project-preview-image"
                    src={selectedPreview.imageSrc}
                    alt={selectedPreview.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 960px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-muted text-sm text-muted-foreground">
                    Изображение отсутствует
                  </div>
                )}
              </AspectRatio>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
