"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

import { useMotionMode } from "@/lib/use-motion-mode"

type HomeFullscreenVideoProps = {
  videoSrc: string
  posterSrc: string
}

export function HomeFullscreenVideo({
  videoSrc,
  posterSrc,
}: HomeFullscreenVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { prefersReduced } = useMotionMode()

  useEffect(() => {
    if (prefersReduced) {
      return
    }

    const video = videoRef.current
    if (!video) {
      return
    }

    video.muted = true
    video.defaultMuted = true
    const playAttempt = video.play()
    if (playAttempt) {
      playAttempt.catch(() => {})
    }
  }, [prefersReduced])

  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
      <div className="relative h-[56vh] min-h-[420px] w-full overflow-hidden border-y border-border/55 bg-black">
        {prefersReduced ? (
          <Image
            src={posterSrc}
            alt="Видеокадр проекта"
            fill
            priority={false}
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={posterSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/45" />
      </div>
    </section>
  )
}
