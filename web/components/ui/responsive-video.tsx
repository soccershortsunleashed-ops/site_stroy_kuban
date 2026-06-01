"use client"

import { useEffect, useRef, useState } from "react"

type VideoSource = {
  src: string
  type: string
}

type ResponsiveVideoProps = {
  className?: string
  poster?: string
  sources: VideoSource[]
}

export function ResponsiveVideo({ className, poster, sources }: ResponsiveVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [shouldLoadSources, setShouldLoadSources] = useState(false)

  const tryPlay = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.defaultMuted = true
    const promise = video.play()
    if (promise) promise.catch(() => {})
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting)
        if (isVisible) {
          setShouldLoadSources(true)
          observer.disconnect()
        }
      },
      { rootMargin: "300px 0px" },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (!shouldLoadSources) {
      return
    }
    tryPlay()
    const timer = window.setTimeout(() => tryPlay(), 300)
    return () => window.clearTimeout(timer)
  }, [shouldLoadSources])

  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay()
    }
    document.addEventListener("visibilitychange", onVisibility)
    return () => document.removeEventListener("visibilitychange", onVisibility)
  }, [])

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      autoPlay
      loop
      playsInline
      controls={false}
      preload={shouldLoadSources ? "metadata" : "none"}
      poster={poster}
      onLoadedData={tryPlay}
      onCanPlay={tryPlay}
      onTouchStart={tryPlay}
    >
      {shouldLoadSources &&
        sources.map((source) => <source key={source.src} src={source.src} type={source.type} />)}
    </video>
  )
}
