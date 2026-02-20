"use client"

import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts"

import { investorStats } from "@/data/site-content"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const investorConfig = {
  roi: { label: "Доходность", color: "var(--chart-1)" },
  risk: { label: "Риск", color: "var(--chart-5)" },
} satisfies ChartConfig

export function InvestorOverview() {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Доходность по портфелям</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={investorConfig} className="h-[260px] w-full">
            <BarChart data={investorStats}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="roi" fill="var(--color-roi)" radius={6} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Профиль риска</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={investorConfig} className="h-[260px] w-full">
            <LineChart data={investorStats}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="risk"
                stroke="var(--color-risk)"
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </section>
  )
}
