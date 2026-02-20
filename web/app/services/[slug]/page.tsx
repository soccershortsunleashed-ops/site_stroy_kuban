import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { services } from "@/data/site-content"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ServicesTimeline } from "@/components/sections/services-timeline"

type Params = {
  slug: string
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const service = services.find((item) => item.slug === params.slug)
  if (!service) {
    return { title: "Услуга не найдена | СтройТрест-23" }
  }
  return {
    title: `${service.title} | СтройТрест-23`,
    description: service.short,
  }
}

export default function ServiceDetailsPage({ params }: { params: Params }) {
  const service = services.find((item) => item.slug === params.slug)
  if (!service) notFound()

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold">{service.title}</h1>
        <p className="max-w-3xl text-muted-foreground">{service.description}</p>
        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <ServicesTimeline timeline={service.timeline} />
        <Card>
          <CardHeader>
            <CardTitle>Технические спецификации и вопросы с ответами</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="q1">
                <AccordionTrigger>Какие данные нужны для старта?</AccordionTrigger>
                <AccordionContent>
                  Базовый пакет: функциональные требования, исходные планы и приоритеты по
                  срокам/бюджету.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>Как контролируется срок этапов?</AccordionTrigger>
                <AccordionContent>
                  Через этапы цифровой информационной модели и регламент контрольных точек с
                  отчетностью для заказчика.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>Как формируется экономическая модель?</AccordionTrigger>
                <AccordionContent>
                  Модель основана на сценарии эксплуатации объекта и прогнозной оценке
                  эксплуатационных расходов.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
