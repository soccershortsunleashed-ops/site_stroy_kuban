import Image from "next/image"

import { CountUp, PageReveal, ParallaxLayer } from "@/components/animation"
import { brand } from "@/data/site-content"

export function ReferenceIntro() {
  return (
    <section className="relative flex min-h-[72vh] items-center justify-center overflow-hidden border border-border/70 bg-[#eff1f4] text-[#0b0f18] dark:bg-[#090b10] dark:text-[#f6f8fb]">
      <div className="absolute inset-0 z-[1] opacity-35 dark:opacity-45">
        <div className="absolute top-[8%] left-[14%] h-56 w-56 rotate-45 border-[12px] border-[#dce1e8] dark:border-[#c99738]/30" />
        <div className="absolute top-[26%] right-[12%] h-44 w-44 rotate-45 border-[10px] border-[#dce1e8] dark:border-[#c99738]/25" />
        <div className="absolute -bottom-8 left-[34%] h-52 w-52 rotate-45 border-[10px] border-[#dce1e8] dark:border-[#c99738]/20" />
      </div>

      <ParallaxLayer className="relative z-10 mx-auto w-full max-w-2xl" strength={0.6}>
        <div className="space-y-5 px-6 text-center">
          <PageReveal>
            <div data-testid="hero-logo-hover" className="mx-auto w-fit">
              <div className="relative w-fit border border-[#cfd6df] bg-white p-3 transition-transform duration-300 ease-out hover:-translate-y-0.5 dark:border-[#c99738]/60 dark:bg-[#0f1724]">
                <Image
                  src="/brand-logo.jpg"
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
            <p className="hero-contrast-outline text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              {brand.companyName}
            </p>
          </PageReveal>
          <PageReveal delay={0.1}>
            <p className="hero-contrast-outline text-[11px] font-semibold uppercase tracking-[0.3em] text-[#5a6475] dark:text-[#e7edf7]">
              Строительные решения
            </p>
          </PageReveal>
          <PageReveal delay={0.16}>
            <p className="hero-contrast-outline mx-auto max-w-xl text-sm text-[#3f4654] sm:text-base dark:text-[#eef3fb]">
              У домов, как у людей, есть своя душа и своё лицо, на котором отражается их
              внутренняя сущность.
              <br />
              <span className="italic">Александр Дюма</span>
            </p>
          </PageReveal>
        </div>
      </ParallaxLayer>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
        <p className="hero-contrast-outline text-3xl font-bold text-[#8d95a2] dark:text-[#f6f8fb]">
          <CountUp value={123} />
        </p>
        <p className="hero-contrast-outline text-[11px] uppercase tracking-[0.28em] text-[#5a6475] dark:text-[#dce4f1]">
          Качество - наш стандарт
        </p>
      </div>
    </section>
  )
}
