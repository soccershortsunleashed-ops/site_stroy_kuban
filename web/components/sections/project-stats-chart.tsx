"use client"

import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts"

import { PageReveal } from "@/components/animation"
import { statsByQuarter } from "@/data/site-content"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const chartConfig = {
  built: { label: "Построено (тыс.м²)", color: "var(--chart-1)" },
  bim: { label: "Покрытие цифровой моделью (%)", color: "var(--chart-2)" },
  efficiency: { label: "Снижение эксплуатационных расходов (%)", color: "var(--chart-3)" },
} satisfies ChartConfig

const quarterlyColors = ["#f5a158", "#f39b4a", "#ef8f3b", "#eb8230"]

type IsometricBarShapeProps = {
  x?: number
  y?: number
  width?: number
  height?: number
  fill?: string
}

function IsometricBar({ x, y, width, height, fill = "#ef8f3b" }: IsometricBarShapeProps) {
  if (
    x === undefined ||
    y === undefined ||
    width === undefined ||
    height === undefined ||
    width <= 0 ||
    height <= 0
  ) {
    return null
  }

  const depthX = Math.min(12, width * 0.2)
  const depthY = Math.min(8, width * 0.14)
  const frontWidth = Math.max(8, width - depthX)

  return (
    <g filter="url(#barShadow)">
      <rect x={x} y={y} width={frontWidth} height={height} rx={9} fill={fill} />
      <polygon
        points={`${x},${y} ${x + depthX},${y - depthY} ${x + width},${y - depthY} ${x + frontWidth},${y}`}
        fill="rgba(255,255,255,0.34)"
      />
      <polygon
        points={`${x + frontWidth},${y} ${x + width},${y - depthY} ${x + width},${y + height - depthY} ${x + frontWidth},${y + height}`}
        fill="rgba(109, 51, 8, 0.28)"
      />
    </g>
  )
}

export function ProjectStatsChart() {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <PageReveal>
        <Card className="relative overflow-hidden rounded-none border-border/70 bg-gradient-to-br from-[#f7fafc] via-white to-[#eef3f9] shadow-none dark:border-[#c99738]/35 dark:bg-gradient-to-br dark:from-[#0b1018] dark:via-[#0f1724] dark:to-[#121d2d]">
          <CardHeader className="space-y-3">
            <CardTitle className="dark:text-[#f7f9fe]">Динамика строительства</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="rounded-none border border-border/70 dark:border-[#c99738]/65 dark:bg-[#f3f6fb] dark:text-[#0c1320]"
              >
                Изометрические столбцы
              </Badge>
              <Badge
                variant="outline"
                className="rounded-none border-border/80 dark:border-[#c99738]/75 dark:bg-transparent dark:text-[#edf2fb]"
              >
                3D визуализация объема
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <BarChart data={statsByQuarter}>
                <defs>
                  <filter id="barShadow" x="-20%" y="-20%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="16" stdDeviation="9" floodColor="#9a561f" floodOpacity="0.22" />
                  </filter>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="4 6" opacity={0.34} />
                <XAxis
                  dataKey="quarter"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontWeight: 500 }}
                />
                <YAxis hide domain={[0, 54]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="built" shape={<IsometricBar />} isAnimationActive>
                  {statsByQuarter.map((item, index) => (
                    <Cell key={`${item.quarter}-${item.built}`} fill={quarterlyColors[index] ?? quarterlyColors[0]} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </PageReveal>

      <PageReveal delay={0.1}>
        <Card className="relative overflow-hidden rounded-none border-border/70 bg-gradient-to-br from-[#f4f7ff] via-[#f8faff] to-[#eef2ff] shadow-none dark:border-[#c99738]/35 dark:bg-gradient-to-br dark:from-[#0b1018] dark:via-[#0f1724] dark:to-[#121d2d]">
          <CardHeader className="space-y-3">
            <CardTitle className="dark:text-[#f7f9fe]">Цифровая модель и энергоэффективность</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="rounded-none border border-border/70 dark:border-[#c99738]/65 dark:bg-[#f3f6fb] dark:text-[#0c1320]"
              >
                Комбинированный слой
              </Badge>
              <Badge
                variant="outline"
                className="rounded-none border-border/80 dark:border-[#c99738]/75 dark:bg-transparent dark:text-[#edf2fb]"
              >
                Аналитика
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <ComposedChart data={statsByQuarter}>
                <defs>
                  <linearGradient id="builtLayerGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.08} />
                  </linearGradient>
                  <linearGradient id="bimAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="bimLineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <filter id="efficiencyGlow" x="-20%" y="-20%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#0f172a" floodOpacity="0.35" />
                  </filter>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="4 6" opacity={0.35} />
                <XAxis
                  dataKey="quarter"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontWeight: 500 }}
                />
                <YAxis yAxisId="progress" hide domain={[0, 100]} />
                <YAxis yAxisId="volume" hide domain={[0, 54]} />
                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                <Bar
                  yAxisId="volume"
                  dataKey="built"
                  barSize={18}
                  fill="url(#builtLayerGradient)"
                  radius={[7, 7, 0, 0]}
                />
                <Area
                  yAxisId="progress"
                  dataKey="bim"
                  type="monotone"
                  stroke="url(#bimLineGradient)"
                  strokeWidth={3}
                  fill="url(#bimAreaGradient)"
                />
                <Line
                  yAxisId="progress"
                  dataKey="bim"
                  type="monotone"
                  stroke="url(#bimLineGradient)"
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2, fill: "#dbeafe", stroke: "#2563eb" }}
                />
                <Line
                  yAxisId="progress"
                  dataKey="efficiency"
                  type="monotone"
                  stroke="#0f172a"
                  strokeWidth={2}
                  filter="url(#efficiencyGlow)"
                  dot={{ r: 4, strokeWidth: 2, fill: "#ffffff", stroke: "#0f172a" }}
                />
              </ComposedChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </PageReveal>
    </section>
  )
}
