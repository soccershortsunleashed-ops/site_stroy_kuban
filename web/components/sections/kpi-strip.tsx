import { CountUp, PageReveal } from "@/components/animation"
import { kpi } from "@/data/site-content"
import { Card, CardContent } from "@/components/ui/card"

function parseCounter(rawValue: string) {
  const compact = rawValue.replace(/\s+/g, "")
  const suffix = compact.replace(/[\d.,]/g, "")
  const numericPart = compact.replace(/[^\d.,]/g, "").replace(",", ".")
  const parsedValue = Number.parseFloat(numericPart)
  const value = Number.isFinite(parsedValue) ? parsedValue : 0
  const decimals = numericPart.includes(".") ? 1 : 0

  return { value, suffix, decimals }
}

export function KpiStrip() {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {kpi.map((item, index) => {
        const counter = parseCounter(item.value)

        return (
          <PageReveal key={item.label} delay={index * 0.06}>
            <Card className="h-[170px] rounded-none border-border/70 bg-card/75">
              <CardContent className="flex h-full flex-col justify-between p-5">
                <p className="text-2xl font-bold">
                  <CountUp
                    value={counter.value}
                    decimals={counter.decimals}
                    suffix={counter.suffix}
                  />
                </p>
                <p className="mt-1 text-sm uppercase tracking-[0.08em] text-muted-foreground">{item.label}</p>
              </CardContent>
            </Card>
          </PageReveal>
        )
      })}
    </section>
  )
}
