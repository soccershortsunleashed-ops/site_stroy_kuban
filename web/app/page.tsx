import { ScrollProgress } from "@/components/animation"
import { HomeHero } from "@/components/sections/home-hero"
import { HomeFullscreenVideo } from "@/components/sections/home-fullscreen-video"
import { HomeSceneIndicator } from "@/components/sections/home-scene-indicator"
import { HomeSceneStage } from "@/components/sections/home-scene-stage"
import { HomeScrollToSecond } from "@/components/sections/home-scroll-to-second"
import { KpiStrip } from "@/components/sections/kpi-strip"
import { ProcessReferenceSection } from "@/components/sections/process-reference"
import { ProjectStatsChart } from "@/components/sections/project-stats-chart"
import { ProjectsCarousel } from "@/components/sections/projects-carousel"
import { ReferenceIntro } from "@/components/sections/reference-intro"

export default function HomePage() {
  const homeScenes = [
    { id: "scene-reference-intro", index: 1, title: "Вступление" },
    { id: "scene-scroll-transition", index: 2, title: "Переход" },
    { id: "scene-home-hero", index: 3, title: "Позиционирование" },
    { id: "scene-kpi-strip", index: 4, title: "Метрики" },
    { id: "scene-process", index: 5, title: "Процесс" },
    { id: "scene-analytics", index: 6, title: "Аналитика" },
    { id: "scene-projects", index: 7, title: "Портфолио" },
  ] as const

  return (
    <div className="space-y-10 pb-2">
      <ScrollProgress />
      <HomeSceneIndicator scenes={[...homeScenes]} />
      <HomeSceneStage
        id={homeScenes[0].id}
        index={homeScenes[0].index}
        title={homeScenes[0].title}
        sectionClassName="relative min-h-[92vh] lg:min-h-[118vh]"
        stickyClassName="lg:sticky lg:top-6"
        contentClassName="rounded-none"
      >
        <ReferenceIntro />
      </HomeSceneStage>
      <HomeSceneStage
        id={homeScenes[1].id}
        index={homeScenes[1].index}
        title={homeScenes[1].title}
        contentClassName="rounded-none"
      >
        <HomeScrollToSecond />
      </HomeSceneStage>
      <HomeSceneStage id={homeScenes[2].id} index={homeScenes[2].index} title={homeScenes[2].title}>
        <HomeHero />
      </HomeSceneStage>
      <HomeFullscreenVideo
        videoSrc="/projects/fok-sirius-final.mp4"
        posterSrc="/projects/fok-sirius-poster.jpg"
      />
      <HomeSceneStage
        id={homeScenes[3].id}
        index={homeScenes[3].index}
        title={homeScenes[3].title}
        sectionClassName="relative min-h-[38vh] lg:min-h-[55vh]"
        stickyClassName="lg:sticky lg:top-20"
      >
        <KpiStrip />
      </HomeSceneStage>
      <HomeSceneStage id={homeScenes[4].id} index={homeScenes[4].index} title={homeScenes[4].title}>
        <ProcessReferenceSection />
      </HomeSceneStage>
      <HomeSceneStage id={homeScenes[5].id} index={homeScenes[5].index} title={homeScenes[5].title}>
        <ProjectStatsChart />
      </HomeSceneStage>
      <HomeFullscreenVideo
        videoSrc="/projects/presidential-lyceum-sirius/lyceum-final.mp4"
        posterSrc="/projects/presidential-lyceum-sirius/lyceum-01.jpeg"
      />
      <HomeSceneStage id={homeScenes[6].id} index={homeScenes[6].index} title={homeScenes[6].title}>
        <ProjectsCarousel />
      </HomeSceneStage>
    </div>
  )
}
