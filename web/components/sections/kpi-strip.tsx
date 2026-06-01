"use client"

import { motion } from "framer-motion"

import { CountUp } from "@/components/animation"
import { kpi } from "@/data/site-content"
import { Card, CardContent } from "@/components/ui/card"

function parseCounter(rawValue: string) {
  const normalized = rawValue.trim().replace(/\s+/g, " ")
  const match = normalized.match(/^([\d\s.,]+)(.*)$/u)
  const numericRaw = (match?.[1] ?? normalized).replace(/\s+/g, "")
  const suffixRaw = (match?.[2] ?? "").trim()
  const suffix =
    suffixRaw.length === 0
      ? ""
      : suffixRaw.startsWith("+") || suffixRaw.startsWith("%")
        ? suffixRaw
        : ` ${suffixRaw}`
  const numericPart = numericRaw.replace(/[^\d.,]/g, "").replace(",", ".")
  const parsedValue = Number.parseFloat(numericPart)
  const value = Number.isFinite(parsedValue) ? parsedValue : 0
  const decimals = numericPart.includes(".") ? 1 : 0

  return { value, suffix, decimals }
}

export function KpiStrip() {
  return (
    <section className="mx-auto grid w-full max-w-[1360px] grid-cols-1 gap-4 px-1 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4">
      {kpi.map((item, index) => {
        const counter = parseCounter(item.value)

        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: "linear" }}
          >
            <Card className="h-full rounded-[8px] border border-white/10 bg-[rgba(255,255,255,0.02)] shadow-none transition-transform duration-200 ease-linear hover:-translate-y-0.5 hover:border-white/20">
              <CardContent className="flex min-h-[118px] flex-col justify-between gap-2 p-6 md:min-h-[122px] md:p-7">
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-foreground/50">
                  {item.label}
                </p>
                <p className="flex max-w-full flex-wrap items-end gap-x-1.5 gap-y-0.5 text-foreground">
                  <CountUp
                    value={counter.value}
                    decimals={counter.decimals}
                    suffix={counter.suffix}
                    duration={1.2}
                    easing="linear"
                    className="tabular-nums text-[clamp(1.9rem,4vw,2.75rem)] font-semibold leading-none tracking-[-0.02em]"
                  />
                  <span className="pb-0.5 text-[clamp(1.2rem,2.2vw,1.85rem)] font-semibold leading-none tracking-[-0.015em]">
                    {item.unit}
                  </span>
                </p>
                <p className="text-[13px] leading-snug text-foreground/70">{item.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </section>
  )
}
