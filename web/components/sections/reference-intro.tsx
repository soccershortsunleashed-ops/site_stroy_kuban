import Image from "next/image"

import { CountUp, PageReveal, ParallaxLayer } from "@/components/animation"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { brand } from "@/data/site-content"

export function ReferenceIntro() {
  return (
    <section className="relative flex min-h-[72vh] flex-col items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-[#eff1f4] px-3 pb-8 text-[#0b0f18] md:grid md:min-h-[72vh] md:grid-rows-[1fr_auto] md:items-center md:px-0 md:py-10 md:pb-6 lg:py-14 dark:bg-[#0b1018] dark:text-[#f2f6fd]">
      <div className="absolute inset-0 z-[1] opacity-35 dark:opacity-30">
        <div className="absolute left-[4%] top-[6%] h-44 w-44 rotate-45 border-[10px] border-[#dce1e8] md:left-[10%] md:top-[10%] md:h-56 md:w-56 md:border-[12px] dark:border-[#1f2a3a]" />
        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rotate-45 border-[9px] border-[#dce1e8] md:left-[72%] md:top-[42%] md:h-44 md:w-44 md:translate-x-0 md:translate-y-0 md:border-[10px] dark:border-[#1f2a3a]" />
        <div className="absolute bottom-[4%] right-[4%] h-44 w-44 rotate-45 border-[9px] border-[#dce1e8] md:bottom-[-2%] md:left-[30%] md:right-auto md:h-52 md:w-52 md:border-[10px] dark:border-[#1f2a3a]" />
      </div>

      <ParallaxLayer className="relative z-10 mx-auto w-full max-w-2xl md:self-end" strength={0.6}>
        <div className="grid justify-items-center gap-5 px-6 text-center">
          <PageReveal>
            <div data-testid="hero-logo-hover" className="logo-float mx-auto w-fit">
              <div className="relative w-fit rounded-md border border-[#cfd6df] bg-transparent p-3 transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-110 dark:border-[#2a3547]">
                <GlowingEffect
                  spread={38}
                  glow
                  disabled={false}
                  proximity={52}
                  inactiveZone={0.18}
                  borderWidth={2}
                />
                <Image
                  src="/brand-logo-transparent.png"
                  alt={`Логотип ${brand.companyName}`}
                  width={86}
                  height={86}
                  className="h-auto w-auto"
                  priority
                />
              </div>
            </div>
          </PageReveal>
          <PageReveal delay={0.06}>
            <p className="text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              {brand.companyName}
            </p>
          </PageReveal>
          <PageReveal delay={0.1}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#5a6475] dark:text-[#aab7c9]">
              Строительные решения
            </p>
          </PageReveal>
          <PageReveal delay={0.16}>
            <p className="mx-auto max-w-xl text-sm text-[#3f4654] sm:text-base dark:text-[#cbd6e5]">
              У домов, как у людей, есть своя душа и своё лицо, на котором отражается их
              внутренняя сущность.
              <br />
              <span className="italic">Александр Дюма</span>
            </p>
          </PageReveal>
        </div>
      </ParallaxLayer>

      <div className="relative z-10 mt-6 text-center md:mt-8 md:pb-1">
        <p className="text-3xl font-bold text-[#8d95a2] dark:text-[#dbe6f5]">
          <CountUp value={123} />
        </p>
        <p className="text-[11px] uppercase tracking-[0.28em] text-[#5a6475] dark:text-[#aab7c9]">
          Качество - наш стандарт
        </p>
      </div>
    </section>
  )
}
