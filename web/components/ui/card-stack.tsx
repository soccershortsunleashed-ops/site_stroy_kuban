"use client"

import * as React from "react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "framer-motion"
import { SquareArrowOutUpRight } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"

export type CardStackItem = {
  id: string | number
  title: string
  description?: string
  imageSrc?: string
  href?: string
  ctaLabel?: string
  tag?: string
}

export type CardStackProps<T extends CardStackItem> = {
  items: T[]
  initialIndex?: number
  maxVisible?: number
  cardWidth?: number
  cardHeight?: number
  overlap?: number
  spreadDeg?: number
  perspectivePx?: number
  depthPx?: number
  tiltXDeg?: number
  activeLiftPx?: number
  activeScale?: number
  inactiveScale?: number
  springStiffness?: number
  springDamping?: number
  loop?: boolean
  autoAdvance?: boolean
  intervalMs?: number
  pauseOnHover?: boolean
  showDots?: boolean
  className?: string
  onChangeIndex?: (index: number, item: T) => void
  onCardClick?: (item: T, index: number) => void
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode
}

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0
  return ((n % len) + len) % len
}

function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active
  if (!loop || len <= 1) return raw
  const alt = raw > 0 ? raw - len : raw + len
  return Math.abs(alt) < Math.abs(raw) ? alt : raw
}

export function CardStack<T extends CardStackItem>({
  items,
  initialIndex = 0,
  maxVisible = 7,
  cardWidth = 520,
  cardHeight = 320,
  overlap = 0.48,
  spreadDeg = 48,
  perspectivePx = 1100,
  depthPx = 140,
  tiltXDeg = 12,
  activeLiftPx = 22,
  activeScale = 1.03,
  inactiveScale = 0.94,
  springStiffness = 280,
  springDamping = 28,
  loop = true,
  autoAdvance = false,
  intervalMs = 2800,
  pauseOnHover = true,
  showDots = true,
  className,
  onChangeIndex,
  onCardClick,
  renderCard,
}: CardStackProps<T>) {
  const reduceMotion = useReducedMotion()
  const len = items.length
  const [active, setActive] = React.useState(() => wrapIndex(initialIndex, len))
  const [hovering, setHovering] = React.useState(false)

  React.useEffect(() => {
    setActive((a) => wrapIndex(a, len))
  }, [len])

  React.useEffect(() => {
    if (!len) return
    onChangeIndex?.(active, items[active]!)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  const maxOffset = Math.max(0, Math.floor(maxVisible / 2))
  const cardSpacing = Math.max(10, Math.round(cardWidth * (1 - overlap)))
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0

  const canGoPrev = loop || active > 0
  const canGoNext = loop || active < len - 1

  const prev = React.useCallback(() => {
    if (!len || !canGoPrev) return
    setActive((a) => wrapIndex(a - 1, len))
  }, [canGoPrev, len])

  const next = React.useCallback(() => {
    if (!len || !canGoNext) return
    setActive((a) => wrapIndex(a + 1, len))
  }, [canGoNext, len])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev()
    if (e.key === "ArrowRight") next()
  }

  React.useEffect(() => {
    if (!autoAdvance || reduceMotion || !len) return
    if (pauseOnHover && hovering) return

    const id = window.setInterval(() => {
      if (loop || active < len - 1) next()
    }, Math.max(700, intervalMs))

    return () => window.clearInterval(id)
  }, [
    autoAdvance,
    intervalMs,
    hovering,
    pauseOnHover,
    reduceMotion,
    len,
    loop,
    active,
    next,
  ])

  if (!len) return null

  const activeItem = items[active]!

  return (
    <div
      className={cn("w-full", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className="relative w-full"
        style={{ height: Math.max(380, cardHeight + 80) }}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-48 w-[70%] rounded-full bg-black/5 blur-3xl dark:bg-white/5"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-40 w-[76%] rounded-full bg-black/10 blur-3xl dark:bg-black/30"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{ perspective: `${perspectivePx}px` }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len, loop)
              const abs = Math.abs(off)
              if (abs > maxOffset) return null

              const rotateZ = off * stepDeg
              const x = off * cardSpacing
              const y = abs * 10
              const z = -abs * depthPx
              const isActive = off === 0
              const scale = isActive ? activeScale : inactiveScale
              const lift = isActive ? -activeLiftPx : 0
              const rotateX = isActive ? 0 : tiltXDeg
              const zIndex = 100 - abs

              const dragProps = isActive
                ? {
                    drag: "x" as const,
                    dragConstraints: { left: 0, right: 0 },
                    dragElastic: 0.18,
                    onDragEnd: (
                      _event: MouseEvent | TouchEvent | PointerEvent,
                      info: PanInfo
                    ) => {
                      if (reduceMotion) return
                      const travel = info.offset.x
                      const velocity = info.velocity.x
                      const threshold = Math.min(160, cardWidth * 0.22)

                      if (travel > threshold || velocity > 650) prev()
                      else if (travel < -threshold || velocity < -650) next()
                    },
                  }
                : {}

              return (
                <motion.div
                  key={item.id}
                  data-testid="card-stack-card"
                  className={cn(
                    "group/card absolute bottom-0 overflow-hidden rounded-2xl p-[2px] shadow-xl",
                    "select-none will-change-transform",
                    isActive ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
                  )}
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: y + 40, x, rotateZ, rotateX, scale }
                  }
                  animate={{
                    opacity: 1,
                    x,
                    y: y + lift,
                    rotateZ,
                    rotateX,
                    scale,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: springStiffness,
                    damping: springDamping,
                  }}
                  onClick={() => {
                    setActive(i)
                    onCardClick?.(item, i)
                  }}
                  {...dragProps}
                >
                  <div
                    data-testid="card-stack-hover-border"
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
                  >
                    <div className="absolute -inset-[45%] bg-[conic-gradient(from_120deg_at_50%_50%,#f59e0b,#f97316,#fb923c,#fdba74,#f59e0b)] animate-[spin_2.7s_linear_infinite]" />
                  </div>
                  <div
                    className="relative z-10 h-full w-full overflow-hidden rounded-[14px] border-2 border-black/10 bg-black/5 dark:border-white/10"
                    style={{
                      transform: `translateZ(${z}px)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {renderCard ? (
                      renderCard(item, { active: isActive })
                    ) : (
                      <DefaultFanCard item={item} />
                    )}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      {showDots ? (
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            {items.map((it, idx) => {
              const isCurrent = idx === active
              return (
                <button
                  key={it.id}
                  onClick={() => setActive(idx)}
                  className={cn(
                    "h-2 w-2 rounded-full transition",
                    isCurrent
                      ? "bg-foreground"
                      : "bg-foreground/30 hover:bg-foreground/50"
                  )}
                  aria-label={`Перейти к карточке «${it.title}»`}
                />
              )
            })}
          </div>
          {activeItem.href ? (
            <Link
              href={activeItem.href}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground transition hover:text-foreground"
              aria-label={activeItem.ctaLabel ?? "Открыть карточку проекта"}
            >
              <SquareArrowOutUpRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

function DefaultFanCard({ item }: { item: CardStackItem; active?: boolean }) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0">
        {item.imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageSrc}
            alt={item.title}
            className="h-full w-full object-cover"
            draggable={false}
            loading="eager"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary text-sm text-muted-foreground">
            Изображение отсутствует
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="relative z-10 flex h-full flex-col justify-end p-5">
        <div className="truncate text-lg font-semibold text-white">{item.title}</div>
        {item.description ? (
          <div className="mt-1 line-clamp-2 text-sm text-white/80">{item.description}</div>
        ) : null}
      </div>
    </div>
  )
}
