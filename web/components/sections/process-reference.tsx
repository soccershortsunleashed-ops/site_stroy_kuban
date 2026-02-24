import { processSteps } from "@/data/site-content"
import {
  CalendarClock,
  ClipboardCheck,
  Hammer,
  ShieldCheck,
  Target,
  Wallet,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const stepInfographics = {
  "01": {
    title: "Контур целей",
    metric: "100%",
    detail: "Критерии успеха зафиксированы",
    progress: 100,
    accent: "#ef8f3b",
    icon: Target,
    tags: ["бриф", "ограничения", "KPI"],
  },
  "02": {
    title: "Финансовая модель",
    metric: "4 сценария",
    detail: "Бюджет и варианты оптимизации",
    progress: 84,
    accent: "#e47d27",
    icon: Wallet,
    tags: ["смета", "сценарии", "резервы"],
  },
  "03": {
    title: "План-график",
    metric: "12 этапов",
    detail: "Разбитие по срокам и поставкам",
    progress: 78,
    accent: "#4f79f6",
    icon: CalendarClock,
    tags: ["сроки", "логистика", "риски"],
  },
  "04": {
    title: "Готовность площадки",
    metric: "92%",
    detail: "Документы и стартовые ресурсы",
    progress: 92,
    accent: "#30a46c",
    icon: ClipboardCheck,
    tags: ["разрешения", "доступ", "закупки"],
  },
  "05": {
    title: "Исполнение",
    metric: "24/7",
    detail: "Контроль работ и качества",
    progress: 88,
    accent: "#7c6cf9",
    icon: Hammer,
    tags: ["СМР", "качество", "безопасность"],
  },
  "06": {
    title: "Передача объекта",
    metric: "1 пакет",
    detail: "Полная исполнительная документация",
    progress: 96,
    accent: "#0f6d88",
    icon: ShieldCheck,
    tags: ["финальный обход", "документы", "сервис"],
  },
} as const

export function ProcessReferenceSection() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Процесс
        </p>
        <h2 className="text-3xl font-semibold">Успех строится процессом</h2>
        <p className="max-w-3xl text-muted-foreground">
          В качестве референса мы берем процессный подход: от целей и видения до финальной
          передачи объекта и эксплуатационного сопровождения.
        </p>
      </div>

      <div className="space-y-4">
        {processSteps.map((step) => {
          const info = stepInfographics[step.index]
          const Icon = info?.icon

          return (
            <Card key={step.index} className="overflow-hidden">
              <CardContent className="grid items-start gap-4 p-0 md:grid-cols-[96px_1fr] xl:grid-cols-[96px_1fr_280px]">
              <div className="flex h-full items-center justify-center bg-muted/40 py-6 text-3xl font-semibold text-primary md:text-4xl">
                {step.index}
              </div>
              <div className="space-y-2 p-5 md:p-6">
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.body}</p>
              </div>
              {info && Icon ? (
                <div className="px-5 pb-5 md:px-6 md:pt-1 xl:px-0 xl:pb-0 xl:pr-6 xl:pt-6">
                  <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/35 p-4 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.45),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl">
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/35 blur-2xl" />
                    <div className="relative space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                            {info.title}
                          </p>
                          <p className="mt-1 text-lg font-semibold leading-tight">
                            {info.metric}
                          </p>
                        </div>
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/60 bg-white/45"
                          style={{ color: info.accent }}
                        >
                          <Icon className="size-4" />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{info.detail}</p>
                      <div className="h-1.5 rounded-full bg-white/65">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${info.progress}%`, backgroundColor: info.accent }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {info.tags.map((tag) => (
                          <Badge
                            key={`${step.index}-${tag}`}
                            variant="secondary"
                            className="border border-white/60 bg-white/60 px-2 py-0 text-[10px] font-medium text-foreground/80"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
          )
        })}
      </div>
    </section>
  )
}
