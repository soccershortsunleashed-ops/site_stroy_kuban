import type { Metadata } from "next"
import Link from "next/link"

import { services } from "@/data/site-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Услуги | СтройТрест-23",
  description:
    "Направления компании СтройТрест-23: строительство полного цикла, цифровое информационное моделирование, ревитализация и человекоориентированные интерьеры.",
}

export default function ServicesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Услуги</h1>
        <p className="max-w-3xl text-muted-foreground">
          Каждое направление оформлено как отдельная услуга с прозрачным графиком
          внедрения и инженерными этапами.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.slug}>
            <CardHeader className="space-y-3">
              <CardTitle>{service.title}</CardTitle>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{service.description}</p>
              <Link href={`/services/${service.slug}`}>
                <Button variant="outline">Открыть страницу услуги</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
