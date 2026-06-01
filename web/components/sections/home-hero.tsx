import Image from "next/image"
import Link from "next/link"

import { PageReveal } from "@/components/animation"
import { brand } from "@/data/site-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function HomeHero() {
  return (
    <Card className="overflow-hidden border-border/60 bg-card/60">
      <CardContent className="grid gap-8 p-6 md:grid-cols-[1.2fr_1fr] md:p-10">
        <div className="space-y-6">
          <PageReveal>
            <Badge variant="secondary" className="bg-primary/15 text-primary">
              Инженерная точность
            </Badge>
          </PageReveal>
          <PageReveal delay={0.06}>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              {brand.companyName}
            </h1>
          </PageReveal>
          <PageReveal delay={0.1}>
            <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
              Строительство и BIM-проектирование объектов полного цикла. Специализируемся на
              отелях, резиденциях и общественных пространствах. Выполняем работы от разработки
              концепции до ввода объекта в эксплуатацию.
            </p>
          </PageReveal>
          <PageReveal delay={0.12}>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Генподряд, реконструкция и инженерные системы в Краснодаре, Сочи и Сириусе.
            </p>
          </PageReveal>
          <PageReveal delay={0.16}>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/projects">
                <Button>Смотреть проекты</Button>
              </Link>
              <Link href="/services">
                <Button variant="outline">Изучить услуги</Button>
              </Link>
            </div>
          </PageReveal>
        </div>
        <div className="relative h-[260px] overflow-hidden rounded-xl border border-border/50 md:h-[320px]">
          <Image
            src="/brand-logo-transparent.png"
            alt="Логотип СтройТрест-23"
            fill
            className="object-contain object-center p-6 md:p-8"
            priority
          />
        </div>
      </CardContent>
    </Card>
  )
}
