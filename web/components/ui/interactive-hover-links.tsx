"use client"

import { useMotionValue, motion, useSpring, useTransform } from "motion/react"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useRef } from "react"

import { cn } from "@/lib/utils"

export type InteractiveHoverLinkItem = {
  heading: string
  imgSrc: string
  subheading: string
  href: string
}

interface InteractiveHoverLinksProps {
  links?: InteractiveHoverLinkItem[]
  currentPath?: string
  className?: string
  onNavigate?: () => void
}

export function InteractiveHoverLinks({
  links = INTERACTIVE_LINKS,
  currentPath,
  className,
  onNavigate,
}: InteractiveHoverLinksProps) {
  return (
    <section className={cn("w-full bg-background p-4 md:px-8 md:py-8", className)}>
      <div className="mx-auto w-full max-w-none">
        {links.map((link) => (
          <InteractiveLinkRow
            key={link.heading}
            {...link}
            currentPath={currentPath}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </section>
  )
}

interface LinkProps extends InteractiveHoverLinkItem {
  currentPath?: string
  onNavigate?: () => void
}

function InteractiveLinkRow({
  heading,
  imgSrc,
  subheading,
  href,
  currentPath,
  onNavigate,
}: LinkProps) {
  const ref = useRef<HTMLAnchorElement | null>(null)
  const router = useRouter()
  const isActive = currentPath === href

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 18 })
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 18 })

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["42%", "58%"])
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["58%", "42%"])

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const node = ref.current
    if (!node) return

    const rect = node.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  return (
    <motion.a
      href={href}
      ref={ref}
      onClick={(event) => {
        if (href.startsWith("/")) {
          event.preventDefault()
          router.push(href)
        }
        onNavigate?.()
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      initial="initial"
      whileHover="whileHover"
      className={cn(
        "group relative flex items-center justify-between overflow-hidden border-b border-muted py-2 transition-colors duration-500 hover:border-foreground md:py-4",
        isActive && "border-primary/70"
      )}
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -12 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.05,
            delayChildren: 0.15,
          }}
          className={cn(
            "relative z-10 block whitespace-nowrap text-[clamp(0.78rem,2.2vw,1.85rem)] font-bold text-muted-foreground transition-colors duration-500 group-hover:text-foreground",
            isActive && "text-primary"
          )}
        >
          {heading.split("").map((letter, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 12 },
              }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="inline-block"
              key={`${heading}-${i}`}
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-0.5 hidden text-xs text-muted-foreground transition-colors duration-500 group-hover:text-foreground sm:block">
          {subheading}
        </span>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-10%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-9deg" },
          whileHover: { scale: 1, rotate: "8deg" },
        }}
        transition={{ type: "spring", stiffness: 230, damping: 20 }}
        src={imgSrc}
        className="pointer-events-none absolute z-0 h-24 w-32 rounded-none border border-border/70 object-cover shadow-lg md:h-44 md:w-64 dark:border-[#c99738]/50"
        alt={`Image representing ${heading}`}
      />

      <div className="overflow-hidden">
        <motion.div
          variants={{
            initial: {
              x: "100%",
              opacity: 0,
            },
            whileHover: {
              x: "0%",
              opacity: 1,
            },
          }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className="relative z-10 p-3"
        >
          <ArrowRight className="size-7 text-foreground md:size-10" />
        </motion.div>
      </div>
    </motion.a>
  )
}

export const INTERACTIVE_LINKS: InteractiveHoverLinkItem[] = [
  {
    heading: "Главная",
    subheading: "Бренд и ключевые показатели",
    imgSrc:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format&fit=crop",
    href: "/",
  },
  {
    heading: "Процесс",
    subheading: "Этапы и контроль реализации",
    imgSrc:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop",
    href: "/process",
  },
  {
    heading: "Услуги",
    subheading: "Полный цикл строительных работ",
    imgSrc:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format&fit=crop",
    href: "/services",
  },
  {
    heading: "Проекты",
    subheading: "Портфолио выполненных объектов",
    imgSrc:
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1200&q=80&auto=format&fit=crop",
    href: "/projects",
  },
  {
    heading: "О компании",
    subheading: "Компетенции и реквизиты",
    imgSrc:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80&auto=format&fit=crop",
    href: "/about",
  },
]
