"use client"

import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { projectCases } from "@/data/project-cases"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import type { CardStackItem } from "@/components/ui/card-stack"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const CardStack = dynamic(
  () => import("@/components/ui/card-stack").then((mod) => mod.CardStack),
  { ssr: false },
)

const galleryItems: CardStackItem[] = projectCases.map((project) => ({
  id: project.slug,
  title: project.title,
  description: `${project.location}, ${project.year}. ${project.summary}`,
  imageSrc: project.previewImage,
  href: `/projects/${project.slug}`,
  ctaLabel: "Открыть проект",
}))
export function ProjectsCarousel() {
  const [isDesktop, setIsDesktop] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)
  const selectedPreview = selectedIndex === null ? null : galleryItems[selectedIndex] ?? null

  const showPrevious = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null) return current
      return (current - 1 + galleryItems.length) % galleryItems.length
    })
  }, [])

  const showNext = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null) return current
      return (current + 1) % galleryItems.length
    })
  }, [])

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)")
    const apply = () => setIsDesktop(media.matches)
    apply()
    media.addEventListener("change", apply)
    return () => media.removeEventListener("change", apply)
  }, [])

  useEffect(() => {
    if (selectedIndex === null) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        showPrevious()
      }
      if (event.key === "ArrowRight") {
        event.preventDefault()
        showNext()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [selectedIndex, showNext, showPrevious])

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null
  }

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const startX = touchStartX.current
    const endX = event.changedTouches[0]?.clientX
    touchStartX.current = null
    if (startX === null || endX === undefined) return
    const delta = endX - startX
    if (Math.abs(delta) < 40) return
    if (delta > 0) showPrevious()
    else showNext()
  }

  return (
    <>
      <section className="space-y-6" data-testid="home-project-card-stack">
        <div className="relative py-2">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border/40" />
          <h2 className="relative mx-auto w-fit bg-background px-6 text-center text-2xl font-semibold uppercase tracking-[0.08em]">
            Галерея выполненных объектов
          </h2>
        </div>

        <div className="mx-auto w-full max-w-6xl">
          {isDesktop ? (
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
              onCardClick={(_, index) => setSelectedIndex(index)}
            />
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {galleryItems.map((item, index) => (
                <Link key={item.id} href={item.href ?? "/projects"} className="group block">
                  <AspectRatio ratio={16 / 10} className="overflow-hidden rounded-lg border">
                    {item.imageSrc ? (
                      <Image
                        src={item.imageSrc}
                        alt={item.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        loading="lazy"
                      />
                    ) : null}
                  </AspectRatio>
                  <button
                    type="button"
                    className="sr-only"
                    aria-label={`Открыть предпросмотр: ${item.title}`}
                    onClick={(event) => {
                      event.preventDefault()
                      setSelectedIndex(index)
                    }}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Dialog
        open={Boolean(selectedPreview)}
        onOpenChange={(isOpen) => !isOpen && setSelectedIndex(null)}
      >
        <DialogContent className="sm:max-w-5xl">
          {selectedPreview ? (
            <>
              <DialogHeader>
                <DialogTitle>{selectedPreview.title}</DialogTitle>
                <DialogDescription>
                  {selectedIndex !== null
                    ? `${selectedIndex + 1} / ${galleryItems.length} · `
                    : ""}
                  {selectedPreview.description ??
                    "Крупный просмотр карточки проекта."}
                </DialogDescription>
              </DialogHeader>
              <div className="relative" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl border">
                  {selectedPreview.imageSrc ? (
                    <Image
                      data-testid="home-project-preview-image"
                      src={selectedPreview.imageSrc}
                      alt={selectedPreview.title}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 960px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-muted text-sm text-muted-foreground">
                      Изображение отсутствует
                    </div>
                  )}
                </AspectRatio>
                {galleryItems.length > 1 ? (
                  <>
                    <button
                      type="button"
                      className="absolute inset-y-0 left-0 w-1/3 border-0 bg-transparent p-0 outline-none"
                      aria-label="Предыдущее изображение"
                      onClick={showPrevious}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 w-1/3 border-0 bg-transparent p-0 outline-none"
                      aria-label="Следующее изображение"
                      onClick={showNext}
                    />
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="secondary"
                      className="absolute top-1/2 left-3 -translate-y-1/2"
                      onClick={showPrevious}
                      aria-label="Предыдущее изображение"
                    >
                      <ChevronLeft />
                    </Button>
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="secondary"
                      className="absolute top-1/2 right-3 -translate-y-1/2"
                      onClick={showNext}
                      aria-label="Следующее изображение"
                    >
                      <ChevronRight />
                    </Button>
                  </>
                ) : null}
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}

