"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

import { ContainerScroll } from "@/components/ui/container-scroll-animation"

export function HomeScrollToSecond() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const tryPlay = () => {
      video.muted = true
      video.defaultMuted = true
      const promise = video.play()
      if (promise) {
        promise.catch(() => {
          // Автовоспроизведение может блокироваться политикой браузера.
        })
      }
    }

    tryPlay()
    video.addEventListener("canplay", tryPlay)

    return () => {
      video.removeEventListener("canplay", tryPlay)
    }
  }, [])

  return (
    <section data-testid="home-scroll-to-second">
      <ContainerScroll compact titleComponent={null}>
        <>
          <video
            ref={videoRef}
            data-testid="home-scroll-tablet-video"
            className="block h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            preload="metadata"
            poster="/projects/fok-sirius-poster.jpg"
          >
            <source src="/projects/fok-sirius-final.mp4" type="video/mp4" />
          </video>
          <Image
            data-testid="home-scroll-tablet-poster"
            src="/projects/fok-sirius-poster.jpg"
            alt="Переход к следующему экрану главной страницы"
            height={900}
            width={1600}
            className="hidden h-full w-full object-cover object-center"
            draggable={false}
          />
        </>
      </ContainerScroll>
    </section>
  )
}
