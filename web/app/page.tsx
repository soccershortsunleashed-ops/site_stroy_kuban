import { ScrollProgress } from "@/components/animation"
import { HomeHero } from "@/components/sections/home-hero"
import { HomeScrollToSecond } from "@/components/sections/home-scroll-to-second"
import { KeyActivitiesBento } from "@/components/sections/key-activities-bento"
import { KpiStrip } from "@/components/sections/kpi-strip"
import { ProcessReferenceSection } from "@/components/sections/process-reference"
import { ProjectStatsChart } from "@/components/sections/project-stats-chart"
import { ProjectsCarousel } from "@/components/sections/projects-carousel"
import { ReferenceIntro } from "@/components/sections/reference-intro"

export default function HomePage() {
  return (
    <div className="space-y-10">
      <ScrollProgress />
      <section className="relative min-h-[92vh] lg:min-h-[118vh]">
        <div className="lg:sticky lg:top-6">
          <ReferenceIntro />
        </div>
      </section>
      <HomeScrollToSecond />
      <HomeHero />
      <section className="relative min-h-[38vh] lg:min-h-[55vh]">
        <div className="lg:sticky lg:top-20">
          <KpiStrip />
        </div>
      </section>
      <ProcessReferenceSection />
      <KeyActivitiesBento />
      <ProjectStatsChart />
      <ProjectsCarousel />
    </div>
  )
}
