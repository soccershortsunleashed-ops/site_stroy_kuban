import type { Metadata } from "next"

import { InvestorOverview } from "@/components/sections/investor-overview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Инвесторам | СтройТрест-23",
  description:
    "Раздел для инвесторов и партнеров: профиль доходности, риски и документация по объектам.",
}

export default function InvestorsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Инвесторам и партнерам</h1>
        <p className="max-w-3xl text-muted-foreground">
          Прозрачная структура проектной документации и дашборд доходности портфеля.
        </p>
      </div>

      <InvestorOverview />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Пакет документации</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Финансовая модель, график этапов, отчеты по цифровой модели, актовые материалы и
            прогнозные ключевые показатели по операционной эффективности.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Партнерская модель</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Форматы сотрудничества: совместная реализация проектов, генподряд с контрактом по
            целевым показателям, техническое сопровождение и эксплуатационный контроль через
            цифровые двойники.
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
