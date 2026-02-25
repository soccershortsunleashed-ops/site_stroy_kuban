"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Bot, MessageSquare, X } from "lucide-react"

import { contractStatuses } from "@/data/site-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DigitalForeman() {
  const [open, setOpen] = useState(false)

  const [objectType, setObjectType] = useState("Офисный центр")
  const [solution, setSolution] = useState("Интеллектуальный фасад")
  const [area, setArea] = useState("3200")

  const [contractId, setContractId] = useState("")

  const [pace, setPace] = useState("Высокий")
  const [focus, setFocus] = useState("Командная работа")
  const [tone, setTone] = useState("Нейтральный")

  const roiResult = useMemo(() => {
    const areaNum = Number(area) || 0
    const baseline = objectType === "Офисный центр" ? 5200 : 4600
    const multiplier = solution === "Интеллектуальный фасад" ? 1.15 : 1.08
    const fiveYearSavings = Math.round((areaNum * baseline * 0.12 * multiplier) / 1000)
    return {
      paybackYears: (4.2 / multiplier).toFixed(1),
      savings: `${fiveYearSavings.toLocaleString("ru-RU")} тыс. ₽`,
    }
  }, [area, objectType, solution])

  const contractStatus = contractStatuses[contractId.trim().toUpperCase()]

  const interiorConcept = useMemo(() => {
    const paceLabel = pace === "Высокий" ? "динамичные сценарии" : "спокойный ритм"
    const focusLabel =
      focus === "Командная работа"
        ? "зоны совместной работы и быстрых встреч"
        : "тихие комнаты концентрации"
    const toneLabel =
      tone === "Теплый"
        ? "теплая световая температура и натуральные текстуры"
        : "контрастная световая сцена и нейтральные материалы"
    return `Рекомендуем ${paceLabel}: ${focusLabel}, ${toneLabel}.`
  }, [pace, focus, tone])

  return (
    <>
      <Button
        onClick={() => setOpen((value) => !value)}
        className="fixed bottom-4 right-4 z-50 h-12 rounded-none px-5 shadow-lg"
      >
        {open ? <X className="size-4" /> : <MessageSquare className="size-4" />}
        <span className="ml-2">Цифровой прораб</span>
      </Button>

      {open ? (
        <Card className="fixed bottom-20 right-4 z-50 h-[620px] w-[min(92vw,420px)] border-primary/40 shadow-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Bot className="size-4 text-primary" />
              Цифровой прораб
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[540px]">
            <Tabs defaultValue="roi" className="h-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="roi">Доходность</TabsTrigger>
                <TabsTrigger value="twins">Двойник</TabsTrigger>
                <TabsTrigger value="interior">Интерьер</TabsTrigger>
              </TabsList>

              <TabsContent value="roi" className="mt-3 h-[470px]">
                <ScrollArea className="h-full pr-3">
                  <div className="space-y-3">
                    <Select value={objectType} onValueChange={setObjectType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Тип объекта" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Офисный центр">Офисный центр</SelectItem>
                        <SelectItem value="ЖК">Жилой комплекс</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={solution} onValueChange={setSolution}>
                      <SelectTrigger>
                        <SelectValue placeholder="Инженерное решение" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Интеллектуальный фасад">
                          Интеллектуальный фасад
                        </SelectItem>
                        <SelectItem value="Биофильные концепции">
                          Биофильные концепции
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <Input
                      type="number"
                      value={area}
                      onChange={(event) => setArea(event.target.value)}
                      placeholder="Площадь объекта, м²"
                    />

                    <div className="rounded-none border border-border/70 bg-muted/30 p-3">
                      <p className="text-sm font-medium">Оценка окупаемости</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Срок окупаемости:{" "}
                        <span className="font-medium text-foreground">
                          {roiResult.paybackYears} лет
                        </span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Экономия за 5 лет:{" "}
                        <span className="font-medium text-foreground">{roiResult.savings}</span>
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="twins" className="mt-3 h-[470px]">
                <div className="space-y-3">
                  <Input
                    value={contractId}
                    onChange={(event) => setContractId(event.target.value)}
                    placeholder="Введите номер договора (например ДГ-1042)"
                  />
                  {contractStatus ? (
                    <div className="space-y-3 rounded-none border border-border/70 p-3">
                      <Badge variant="secondary">{contractStatus.stage}</Badge>
                      <p className="text-sm text-muted-foreground">
                        Прогноз завершения этапа:{" "}
                        <span className="font-medium text-foreground">{contractStatus.eta}</span>
                      </p>
                      {contractStatus.photo ? (
                        <div className="relative h-44 overflow-hidden rounded-none">
                          <Image
                            src={contractStatus.photo}
                            alt="Фото со стройплощадки"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Введите известный номер: ДГ-1042, ДГ-2025, ДГ-3099.
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="interior" className="mt-3 h-[470px]">
                <ScrollArea className="h-full pr-3">
                  <div className="space-y-3">
                    <Select value={pace} onValueChange={setPace}>
                      <SelectTrigger>
                        <SelectValue placeholder="Темп работы" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Высокий">Высокий</SelectItem>
                        <SelectItem value="Спокойный">Спокойный</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={focus} onValueChange={setFocus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Формат работы" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Командная работа">Командная работа</SelectItem>
                        <SelectItem value="Индивидуальная концентрация">
                          Индивидуальная концентрация
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger>
                        <SelectValue placeholder="Цветовая тональность" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Нейтральный">Нейтральный</SelectItem>
                        <SelectItem value="Теплый">Теплый</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="rounded-none border border-border/70 bg-muted/30 p-3">
                      <p className="text-sm font-medium">Человекоориентированная концепция</p>
                      <p className="mt-1 text-sm text-muted-foreground">{interiorConcept}</p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ) : null}
    </>
  )
}
