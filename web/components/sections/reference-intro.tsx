import Image from "next/image"

import { CountUp, PageReveal, ParallaxLayer } from "@/components/animation"
import { brand } from "@/data/site-content"

export function ReferenceIntro() {
  return (
    <section className="relative flex min-h-[72vh] items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-[#eff1f4] text-[#0b0f18]">
      <div className="absolute inset-0 opacity-35">
        <div className="absolute top-[8%] left-[14%] h-56 w-56 rotate-45 border-[12px] border-[#dce1e8]" />
        <div className="absolute top-[26%] right-[12%] h-44 w-44 rotate-45 border-[10px] border-[#dce1e8]" />
        <div className="absolute -bottom-8 left-[34%] h-52 w-52 rotate-45 border-[10px] border-[#dce1e8]" />
      </div>

      <ParallaxLayer className="relative z-10 mx-auto w-full max-w-2xl" strength={0.6}>
        <div className="space-y-5 px-6 text-center">
          <PageReveal>
            <div className="mx-auto w-fit rounded-md border border-[#cfd6df] bg-white p-3">
              <Image
                src="/brand-logo.jpg"
                alt={`Логотип ${brand.companyName}`}
                width={86}
                height={86}
                className="h-auto w-auto"
                priority
              />
            </div>
          </PageReveal>
          <PageReveal delay={0.06}>
            <p className="text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              {brand.companyName}
            </p>
          </PageReveal>
          <PageReveal delay={0.1}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#5a6475]">
              Строительные решения
            </p>
          </PageReveal>
          <PageReveal delay={0.16}>
            <p className="mx-auto max-w-xl text-sm text-[#3f4654] sm:text-base">
              Технологичное развитие территорий, цифровое информационное моделирование и
              ревитализация пространств с качеством, подтвержденным на каждом этапе.
            </p>
          </PageReveal>
        </div>
      </ParallaxLayer>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p className="text-3xl font-bold text-[#8d95a2]">
          <CountUp value={77} />
        </p>
        <p className="text-[11px] uppercase tracking-[0.28em] text-[#5a6475]">
          Качество - наш стандарт
        </p>
      </div>
    </section>
  )
}
