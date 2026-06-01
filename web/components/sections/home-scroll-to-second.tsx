"use client"

import Image from "next/image"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

import { ResponsiveVideo } from "@/components/ui/responsive-video"

const ContainerScroll = dynamic(
  () =>
    import("@/components/ui/container-scroll-animation").then(
      (mod) => mod.ContainerScroll,
    ),
  { ssr: false },
)

export function HomeScrollToSecond() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)")
    const apply = () => setIsDesktop(media.matches)
    apply()
    media.addEventListener("change", apply)
    return () => media.removeEventListener("change", apply)
  }, [])

  if (!isDesktop) {
    return (
      <section
        data-testid="home-scroll-to-second"
        className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden bg-black"
      >
        <ResponsiveVideo
          className="h-[46vh] w-full object-cover"
          poster="/projects/mys-adler/mys-adler-poster-title.avif"
          sources={[
            { src: "/projects/mys-adler/mys-adler-final.mp4", type: "video/mp4; codecs=av01.0.08M.08,mp4a.40.2" },
            {
              src: "/projects/mys-adler/mys-adler-final-h264.mp4",
              type: "video/mp4; codecs=avc1.640028,mp4a.40.2",
            },
          ]}
        />
      </section>
    )
  }

  return (
    <section data-testid="home-scroll-to-second">
      <ContainerScroll compact titleComponent={null}>
        <>
          <ResponsiveVideo
            className="block h-full w-full object-cover object-center"
            poster="/projects/mys-adler/mys-adler-poster-title.avif"
            sources={[
              { src: "/projects/mys-adler/mys-adler-final.mp4", type: "video/mp4; codecs=av01.0.08M.08,mp4a.40.2" },
              {
                src: "/projects/mys-adler/mys-adler-final-h264.mp4",
                type: "video/mp4; codecs=avc1.640028,mp4a.40.2",
              },
            ]}
          />
          <Image
            data-testid="home-scroll-tablet-poster"
            src="/projects/mys-adler/mys-adler-01-mobile.avif"
            alt="Переход к следующему экрану главной страницы"
            height={536}
            width={960}
            className="hidden h-full w-full object-cover object-center"
            draggable={false}
          />
        </>
      </ContainerScroll>
    </section>
  )
}
