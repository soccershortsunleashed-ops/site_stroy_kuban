"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { motion } from "framer-motion"

import { useMotionMode } from "@/lib/use-motion-mode"
import type { ProjectItem } from "@/data/site-content"
import { projects } from "@/data/site-content"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Category = "Все" | ProjectItem["category"]

export function ProjectsGallery() {
  const categories = useMemo<Category[]>(
    () => ["Все", ...Array.from(new Set(projects.map((project) => project.category)))],
    [],
  )
  const [activeCategory, setActiveCategory] = useState<Category>("Все")
  const [selected, setSelected] = useState<ProjectItem | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const { isMobile, prefersReduced, profile } = useMotionMode()

  const filtered = useMemo(() => {
    if (activeCategory === "Все") return projects
    return projects.filter((project) => project.category === activeCategory)
  }, [activeCategory])

  return (
    <div className="space-y-6">
      <Tabs
        value={activeCategory}
        onValueChange={(value) => {
          setActiveCategory(value as Category)
          setActiveIndex(0)
        }}
      >
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="border border-border/70 data-[state=active]:border-primary data-[state=active]:bg-primary/15"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{
              opacity: activeIndex === index ? 1 : 0.7,
              y: prefersReduced ? 0 : activeIndex === index ? 0 : isMobile ? 2 : 6,
              scale: isMobile || prefersReduced ? 1 : activeIndex === index ? 1.01 : 0.985,
            }}
            viewport={{ amount: 0.22, once: false }}
            transition={{
              duration: prefersReduced ? 0 : Math.max(0.14, profile.revealDuration),
              delay: prefersReduced ? 0 : index * 0.04,
            }}
          >
            <Card
              data-testid="project-card"
              data-active={activeIndex === index ? "true" : "false"}
              className="cursor-pointer overflow-hidden transition-shadow duration-300 hover:shadow-lg"
              onClick={() => {
                setActiveIndex(index)
                setSelected(project)
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onFocusCapture={() => setActiveIndex(index)}
            >
              <AspectRatio ratio={16 / 10}>
                <motion.div
                  className="relative h-full w-full"
                  animate={{ y: activeIndex === index && !prefersReduced ? -3 : 0 }}
                  transition={{ duration: prefersReduced ? 0 : isMobile ? 0.2 : 0.35 }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AspectRatio>
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: activeIndex === index ? 1 : 0.65,
                    }}
                    transition={{ duration: prefersReduced ? 0 : 0.2 }}
                  >
                    <Badge variant="secondary">{project.category}</Badge>
                  </motion.div>
                </div>
                <motion.div
                  initial={false}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0.75,
                    y: activeIndex === index ? 0 : 3,
                  }}
                  transition={{
                    duration: prefersReduced ? 0 : 0.22,
                    delay: prefersReduced || isMobile ? 0 : activeIndex === index ? 0.04 : 0,
                  }}
                >
                  <CardDescription>
                    {project.location} · {project.year}
                  </CardDescription>
                </motion.div>
              </CardHeader>
              <motion.div
                initial={false}
                animate={{
                  opacity: activeIndex === index ? 1 : 0.72,
                  y: activeIndex === index ? 0 : 4,
                }}
                transition={{
                  duration: prefersReduced ? 0 : 0.24,
                  delay: prefersReduced || isMobile ? 0 : activeIndex === index ? 0.08 : 0,
                }}
              >
                <CardContent className="text-sm text-muted-foreground">
                  {project.summary}
                </CardContent>
              </motion.div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={Boolean(selected)} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
          {selected ? (
            <>
              <DialogHeader>
                <DialogTitle>{selected.title}</DialogTitle>
                <DialogDescription>
                  {selected.category} · {selected.location} · {selected.year}
                </DialogDescription>
              </DialogHeader>
              <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
                <Image
                  src={selected.image}
                  alt={selected.title}
                  fill
                  className="object-cover"
                />
              </AspectRatio>
              <p className="text-sm text-muted-foreground">{selected.summary}</p>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
