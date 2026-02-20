"use client"

import Image from "next/image"

import { projects } from "@/data/site-content"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ProjectsCarousel() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Примеры работ</h2>
      <Carousel
        opts={{ loop: true, align: "start" }}
        className="mx-auto w-full max-w-6xl px-12"
      >
        <CarouselContent>
          {projects.map((project) => (
            <CarouselItem key={project.slug} className="md:basis-1/2">
              <Card className="overflow-hidden">
                <AspectRatio ratio={16 / 10}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </AspectRatio>
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {project.summary}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}
