"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type GalleryImage = {
  src: string
  alt: string
}

type ProjectImageGalleryProps = {
  images: GalleryImage[]
}

export function ProjectImageGallery({ images }: ProjectImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const currentImage = selectedIndex === null ? null : images[selectedIndex]

  const showPrevious = useCallback(() => {
    if (!images.length) return
    setSelectedIndex((current) => {
      if (current === null) return current
      return (current - 1 + images.length) % images.length
    })
  }, [images.length])

  const showNext = useCallback(() => {
    if (!images.length) return
    setSelectedIndex((current) => {
      if (current === null) return current
      return (current + 1) % images.length
    })
  }, [images.length])

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

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <Card key={image.src} className="overflow-hidden">
            <button
              type="button"
              className="group block w-full text-left"
              onClick={() => setSelectedIndex(index)}
              aria-label={`Открыть фото: ${image.alt}`}
            >
              <AspectRatio ratio={16 / 9} className="relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </AspectRatio>
            </button>
          </Card>
        ))}
      </div>

      <Dialog
        open={selectedIndex !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) setSelectedIndex(null)
        }}
      >
        <DialogContent className="sm:max-w-5xl">
          {currentImage ? (
            <>
              <DialogHeader>
                <DialogTitle>Фото проекта</DialogTitle>
                <DialogDescription>
                  {selectedIndex !== null ? `${selectedIndex + 1} / ${images.length} · ` : ""}
                  {currentImage.alt}
                </DialogDescription>
              </DialogHeader>
              <div className="relative">
                <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg border">
                  <Image
                    src={currentImage.src}
                    alt={currentImage.alt}
                    fill
                    className="object-contain bg-black/70"
                    sizes="(max-width: 1280px) 100vw, 1200px"
                  />
                </AspectRatio>
                {images.length > 1 ? (
                  <>
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="secondary"
                      className="absolute top-1/2 left-3 -translate-y-1/2"
                      onClick={showPrevious}
                      aria-label="Предыдущее фото"
                    >
                      <ChevronLeft />
                    </Button>
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="secondary"
                      className="absolute top-1/2 right-3 -translate-y-1/2"
                      onClick={showNext}
                      aria-label="Следующее фото"
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
