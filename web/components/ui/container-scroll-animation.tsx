"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"

export function ContainerScroll({
  titleComponent,
  compact = false,
  children,
}: {
  titleComponent?: string | ReactNode | null
  compact?: boolean
  children: ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const scaleDimensions = () => (isMobile ? [0.7, 0.9] : [1.05, 1]) as [number, number]

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0])
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions())
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100])

  const hasTitle = titleComponent !== null && titleComponent !== undefined

  return (
    <div
      className={`relative flex items-start justify-center ${
        compact
          ? "h-[34rem] p-0 md:h-[46rem] md:p-4"
          : "h-[60rem] p-2 md:h-[80rem] md:p-20"
      }`}
      ref={containerRef}
    >
      <div
        className={`relative w-full ${compact ? "py-0 md:py-8" : "py-10 md:py-40"}`}
        style={{
          perspective: "1000px",
        }}
      >
        {hasTitle ? <Header translate={translate} titleComponent={titleComponent} /> : null}
        <Card rotate={rotate} scale={scale} compact={compact}>
          {children}
        </Card>
      </div>
    </div>
  )
}

export function Header({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>
  titleComponent: string | ReactNode
}) {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="mx-auto -mt-4 max-w-5xl pb-8 text-center md:-mt-8 md:pb-14"
    >
      {titleComponent}
    </motion.div>
  )
}

export function Card({
  rotate,
  scale,
  compact = false,
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  compact?: boolean
  children: ReactNode
}) {
  return (
    <motion.div
      data-testid="container-scroll-card"
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className={`mx-auto h-[30rem] w-full max-w-5xl rounded-[30px] border-4 border-[#6C6C6C] bg-[#222222] p-2 shadow-2xl md:h-[40rem] md:p-6 ${
        compact ? "mt-0 md:mt-1" : "mt-8 md:mt-10"
      }`}
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  )
}
