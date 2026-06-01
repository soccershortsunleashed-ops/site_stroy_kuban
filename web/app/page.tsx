import type { Metadata } from "next"

import { HomeHero } from "@/components/sections/home-hero"
import { HomeScrollToSecond } from "@/components/sections/home-scroll-to-second"
import { KpiStrip } from "@/components/sections/kpi-strip"
import { ProcessReferenceSection } from "@/components/sections/process-reference"
import { ProjectsCarousel } from "@/components/sections/projects-carousel"
import { ReferenceIntro } from "@/components/sections/reference-intro"
import { ResponsiveVideo } from "@/components/ui/responsive-video"

export const metadata: Metadata = {
  title: "СтройТрест-23 | Строительная компания полного цикла в Краснодаре",
  description:
    "СтройТрест-23: проектирование, строительство, реконструкция и инженерные работы в Краснодаре, Сириусе и по Краснодарскому краю.",
  keywords: [
    "строительная компания Краснодар",
    "строительство под ключ Краснодарский край",
    "генподряд Сириус",
    "реконструкция и инженерные сети",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": 0,
    },
  },
  openGraph: {
    title: "СтройТрест-23 | Строительная компания полного цикла",
    description:
      "Проектирование, строительство, реконструкция и инженерные решения для жилых и общественных объектов.",
    url: "/",
    type: "website",
  },
}

export default function HomePage() {
  return (
    <div className="space-y-6 md:space-y-10">
      <section className="relative min-h-[58vh] md:min-h-[92vh] lg:min-h-[118vh]">
        <div className="lg:sticky lg:top-6">
          <ReferenceIntro />
        </div>
      </section>
      <HomeScrollToSecond />
      <HomeHero />
      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden bg-black">
        <ResponsiveVideo
          className="h-[46vh] w-full object-cover"
          poster="/projects/fok-sirius-01.avif"
          sources={[
            { src: "/projects/fok-sirius-final.webm", type: "video/webm; codecs=av01.0.08M.08,opus" },
            { src: "/projects/fok-sirius-final.mp4", type: "video/mp4; codecs=av01.0.08M.08,mp4a.40.2" },
            { src: "/projects/fok-sirius-final-h264.mp4", type: "video/mp4; codecs=avc1.640028,mp4a.40.2" },
          ]}
        />
      </section>
      <section className="relative min-h-[38vh] lg:min-h-[55vh]">
        <div className="lg:sticky lg:top-20">
          <KpiStrip />
        </div>
      </section>
      <ProcessReferenceSection />
      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden bg-black">
        <ResponsiveVideo
          className="h-[46vh] w-full object-cover"
          poster="/projects/presidential-lyceum-sirius/lyceum-01-mobile.avif"
          sources={[
            {
              src: "/projects/presidential-lyceum-sirius/lyceum-final.webm",
              type: "video/webm; codecs=av01.0.08M.08,opus",
            },
            {
              src: "/projects/presidential-lyceum-sirius/lyceum-final.mp4",
              type: "video/mp4; codecs=av01.0.08M.08,mp4a.40.2",
            },
            {
              src: "/projects/presidential-lyceum-sirius/lyceum-final-h264.mp4",
              type: "video/mp4; codecs=avc1.640028,mp4a.40.2",
            },
          ]}
        />
      </section>
      <ProjectsCarousel />
    </div>
  )
}
