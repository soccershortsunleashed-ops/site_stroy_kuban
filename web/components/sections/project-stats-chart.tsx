"use client"

import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts"

import { PageReveal } from "@/components/animation"
import { statsByQuarter } from "@/data/site-content"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const chartConfig = {
  built: { label: "Построено (тыс.м²)", color: "var(--chart-1)" },
  bim: { label: "Покрытие цифровой моделью (%)", color: "var(--chart-2)" },
  efficiency: { label: "Снижение эксплуатационных расходов (%)", color: "var(--chart-3)" },
} satisfies ChartConfig

export function ProjectStatsChart() {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <PageReveal>
        <Card>
          <CardHeader>
            <CardTitle>Динамика строительства</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[260px] w-full">
              <BarChart data={statsByQuarter}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="quarter" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="built" fill="var(--color-built)" radius={6} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </PageReveal>

      <PageReveal delay={0.1}>
        <Card>
          <CardHeader>
            <CardTitle>Цифровая модель и энергоэффективность</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[260px] w-full">
              <LineChart data={statsByQuarter}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="quarter" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  dataKey="bim"
                  type="monotone"
                  stroke="var(--color-bim)"
                  strokeWidth={2}
                />
                <Line
                  dataKey="efficiency"
                  type="monotone"
                  stroke="var(--color-efficiency)"
                  strokeWidth={2}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </PageReveal>
    </section>
  )
}
