import { processSteps } from "@/data/site-content"
import {
  CalendarClock,
  ClipboardCheck,
  DraftingCompass,
  FileCheck,
  HardHat,
  Target,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const stepInfographics = {
  "01": {
    title: "ПАРАМЕТРЫ ПРОЕКТА",
    metric: "Зафиксировано",
    detail: "Цели, сроки и ограничения согласованы",
    progress: 100,
    accent: "#ef8f3b",
    icon: Target,
    tags: ["сроки", "бюджет", "задачи"],
  },
  "02": {
    title: "ОЦЕНКА РЕАЛИЗАЦИИ",
    metric: "3 сценария",
    detail: "Подготовлены решения и предварительный бюджет",
    progress: 84,
    accent: "#e47d27",
    icon: DraftingCompass,
    tags: ["смета", "решения", "оптимизация"],
  },
  "03": {
    title: "ГОТОВНОСТЬ К СТАРТУ",
    metric: "92%",
    detail: "Документация, согласования и доступы подготовлены",
    progress: 92,
    accent: "#ef8f3b",
    icon: FileCheck,
    tags: ["разрешения", "доступ", "логистика"],
  },
  "04": {
    title: "КАЛЕНДАРНЫЙ ПЛАН",
    metric: "12 этапов",
    detail: "Сформированы графики работ и поставок",
    progress: 78,
    accent: "#4f79f6",
    icon: CalendarClock,
    tags: ["сроки", "поставки", "контроль"],
  },
  "05": {
    title: "СТАТУС РАБОТ",
    metric: "В графике",
    detail: "Контролируем сроки, качество и безопасность",
    progress: 88,
    accent: "#4f79f6",
    icon: HardHat,
    tags: ["СМР", "качество", "безопасность"],
  },
  "06": {
    title: "СДАЧА ОБЪЕКТА",
    metric: "Готово к передаче",
    detail: "Подготовлены акты и исполнительная документация",
    progress: 96,
    accent: "#0f6d88",
    icon: ClipboardCheck,
    tags: ["акты", "ИД", "регламент"],
  },
} as const

export function ProcessReferenceSection() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Процесс
        </p>
        <h2 className="text-3xl font-semibold">Успех строится на системе</h2>
        <p className="max-w-3xl text-muted-foreground">
          Мы сопровождаем проект на каждом этапе: от постановки задач и проектирования до ввода
          объекта в эксплуатацию и дальнейшего сопровождения.
        </p>
      </div>

      <div className="space-y-4">
        {processSteps.map((step) => {
          const info = stepInfographics[step.index]
          const Icon = info?.icon

          return (
            <Card key={step.index} className="overflow-hidden">
              <CardContent className="grid grid-cols-1 items-start gap-0 p-0 md:grid-cols-[96px_1fr] xl:grid-cols-[96px_1fr_280px]">
              <div className="relative flex min-h-[112px] items-center justify-center bg-muted/40 py-6 text-primary md:min-h-0 md:h-full dark:bg-[#1a202b]/85">
                {Icon ? <Icon className="size-8 md:size-9" /> : null}
              </div>
              <div className="space-y-2 p-5 md:p-6">
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.body}</p>
              </div>
              {info && Icon ? (
                <div className="px-5 pb-5 md:px-6 md:pt-1 xl:px-0 xl:pb-0 xl:pr-6 xl:pt-6">
                  <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/35 p-4 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.45),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl dark:border-[#2b3444]/85 dark:bg-[#161d28]/88 dark:shadow-[0_10px_30px_-18px_rgba(2,6,12,0.7),inset_0_1px_0_rgba(148,163,184,0.08)]">
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/35 blur-2xl dark:bg-[#2a3344]/45" />
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
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/60 bg-white/45 dark:border-[#3a4558]/90 dark:bg-[#202838]/90"
                          style={{ color: info.accent }}
                        >
                          <Icon className="size-4" />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{info.detail}</p>
                      {step.index === "03" ? (
                        <div className="flex items-center gap-3">
                          <div
                            className="grid size-11 place-items-center rounded-full border border-white/60 text-[11px] font-semibold dark:border-[#3a4558]/90"
                            style={{
                              background: `conic-gradient(${info.accent} ${info.progress}%, rgba(148,163,184,0.2) 0)`,
                            }}
                          >
                            <span className="grid size-8 place-items-center rounded-full bg-white/80 text-foreground dark:bg-[#121926]">
                              {info.progress}%
                            </span>
                          </div>
                          <div className="h-1.5 flex-1 rounded-full bg-white/65 dark:bg-[#2d3a4f]/85">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${info.progress}%`, backgroundColor: info.accent }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="h-1.5 rounded-full bg-white/65 dark:bg-[#2d3a4f]/85">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${info.progress}%`, backgroundColor: info.accent }}
                          />
                        </div>
                      )}
                      <div className="flex flex-wrap gap-1.5">
                        {info.tags.map((tag) => (
                          <Badge
                            key={`${step.index}-${tag}`}
                            variant="secondary"
                            className="border border-white/60 bg-white/60 px-2 py-0 text-[10px] font-medium text-foreground/80 dark:border-[#3a4558]/90 dark:bg-[#1f2736]/92"
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
