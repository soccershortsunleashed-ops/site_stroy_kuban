import type { Metadata } from "next"

import { TechnologiesDashboard } from "@/components/sections/technologies-dashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Технологии | СтройТрест-23",
  description:
    "Цифровое информационное моделирование, интеллектуальная диспетчеризация и управление цифровыми двойниками компании СтройТрест-23.",
}

export default function TechnologiesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Технологии</h1>
        <p className="max-w-3xl text-muted-foreground">
          Инженерная экосистема на базе цифрового информационного моделирования и цифровых
          двойников для контроля жизненного цикла объекта.
        </p>
      </div>

      <TechnologiesDashboard />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Эскиз</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Генерация сценариев проектной экономики и оценка рисков до старта СМР.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Цифровое информационное проектирование</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Согласование разделов, поиск коллизий и контроль инженерных зависимостей.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Передача в эксплуатацию</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Передача модели эксплуатации и контроль ключевых показателей после ввода объекта.
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
