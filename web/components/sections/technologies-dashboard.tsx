"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { statsByQuarter } from "@/data/site-content"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const chartConfig = {
  bim: { label: "Покрытие цифровой моделью", color: "var(--chart-2)" },
  efficiency: { label: "Энергоэффективность", color: "var(--chart-3)" },
} satisfies ChartConfig

export function TechnologiesDashboard() {
  return (
    <Tabs defaultValue="bim" className="space-y-4">
      <TabsList>
        <TabsTrigger value="bim">Информационное моделирование</TabsTrigger>
        <TabsTrigger value="dispatch">Интеллектуальная диспетчеризация</TabsTrigger>
      </TabsList>

      <TabsContent value="bim" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Аналитика цифровых моделей проектов</CardTitle>
            <CardDescription>
              Доля объектов, переведенных в цифровой двойник, и прогноз снижения
              эксплуатационных расходов.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <AreaChart data={statsByQuarter}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="quarter" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="bim"
                  fill="var(--color-bim)"
                  fillOpacity={0.18}
                  stroke="var(--color-bim)"
                />
                <Area
                  type="monotone"
                  dataKey="efficiency"
                  fill="var(--color-efficiency)"
                  fillOpacity={0.2}
                  stroke="var(--color-efficiency)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="dispatch">
        <Card>
          <CardHeader>
            <CardTitle>Интеллектуальная диспетчеризация</CardTitle>
            <CardDescription>
              Контроль этапов через потоки цифрового двойника и статусы по регламенту работ.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Система обрабатывает данные стройплощадки, сопоставляет их с цифровой моделью и
              формирует прогноз отклонений по срокам.
            </p>
            <p>
              Критичные сигналы автоматически поднимаются в приоритетные карточки этапов
              для команды проектного офиса.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
