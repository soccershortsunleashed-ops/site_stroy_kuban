"use client"

import { ArrowRight } from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import React, { useRef } from "react"

export interface InteractiveLinkItem {
  heading: string
  imgSrc: string
  subheading: string
  href: string
}

interface InteractiveHoverLinksProps {
  links?: InteractiveLinkItem[]
  activeHref?: string
  onNavigate?: (
    href: string,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => void
}

export function InteractiveHoverLinks({
  links = INTERACTIVE_LINKS,
  activeHref,
  onNavigate,
}: InteractiveHoverLinksProps) {
  return (
    <section className="w-full bg-transparent p-0">
      <div className="mx-auto w-full">
        {links.map((link) => (
          <InteractiveLink
            key={link.heading}
            {...link}
            active={activeHref === link.href}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </section>
  )
}

interface LinkProps extends InteractiveLinkItem {
  active?: boolean
  onNavigate?: (
    href: string,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => void
}

function InteractiveLink({
  heading,
  imgSrc,
  subheading,
  href,
  active = false,
  onNavigate,
}: LinkProps) {
  const ref = useRef<HTMLAnchorElement | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 25 })
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 25 })

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"])
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "40%"])

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return

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
      onMouseMove={handleMouseMove}
      onClick={(event) => onNavigate?.(href, event)}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b border-border/40 py-6 transition-colors duration-500 hover:border-foreground/60 md:py-8"
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -10 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.06,
            delayChildren: 0.15,
          }}
          className={`relative z-10 block text-[2.55rem] font-semibold leading-[0.95] tracking-tight transition-colors duration-500 md:text-[3.2rem] ${
            active
              ? "text-[var(--accent)]"
              : "text-foreground/90 group-hover:text-foreground"
          }`}
        >
          {heading.split("").map((letter, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 10 },
              }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="inline-block"
              key={`${heading}-${i}`}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-500 group-hover:text-foreground/80">
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
          whileHover: { scale: 1, rotate: "9deg" },
        }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        src={imgSrc}
        className="pointer-events-none absolute z-0 h-24 w-32 rounded-none border border-border/60 object-cover shadow-lg md:h-36 md:w-52"
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
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative z-10 p-2"
        >
          <ArrowRight className="size-7 text-foreground md:size-10" />
        </motion.div>
      </div>
    </motion.a>
  )
}

export const INTERACTIVE_LINKS: InteractiveLinkItem[] = [
  {
    heading: "Services",
    subheading: "Discover what we offer",
    imgSrc:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
    href: "#",
  },
  {
    heading: "Team",
    subheading: "Meet the amazing people behind it",
    imgSrc:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80",
    href: "#",
  },
  {
    heading: "Projects",
    subheading: "Explore our recent work",
    imgSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    href: "#",
  },
  {
    heading: "Careers",
    subheading: "Join our growing team",
    imgSrc:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    href: "#",
  },
  {
    heading: "Playground",
    subheading: "Fun experiments and side projects",
    imgSrc:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
    href: "#",
  },
]

export default InteractiveHoverLinks
