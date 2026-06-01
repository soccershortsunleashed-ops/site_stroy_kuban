import type { Metadata } from "next"

import { aboutCompany } from "@/data/about-company"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: "О компании | СтройТрест-23",
  description:
    "Профиль деятельности, перечень услуг, реквизиты, адреса и контакты компании СтройТрест-23.",
  keywords: [
    "о компании СтройТрест-23",
    "строительная компания Краснодар реквизиты",
    "генподрядчик Краснодарский край",
    "контакты строительной компании",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "О компании СтройТрест-23",
    description:
      "Реквизиты, профиль деятельности, услуги и контакты строительной компании СтройТрест-23.",
    url: "/about",
    type: "website",
  },
}

const serviceItems = aboutCompany.services
  .replace("Перечень услуг:", "")
  .split(",")
  .map((service) => service.trim())
  .filter(Boolean)

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">О компании</p>
        <h1 className="text-4xl font-semibold tracking-tight">{aboutCompany.headline}</h1>
        <p className="max-w-4xl text-muted-foreground">
          {aboutCompany.sroMembership} Работаем в Краснодаре, Сочи и на федеральной территории
          Сириус.
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Профиль деятельности</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{aboutCompany.profile}</p>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>Перечень услуг</CardTitle>
            <CardDescription>
              Строительство, реконструкция, ремонт и управление проектами
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {serviceItems.map((service) => (
              <Badge key={service} variant="secondary">
                {service}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Реквизиты</CardTitle>
            <CardDescription>{aboutCompany.companyFullName}</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              {aboutCompany.requisites.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start justify-between gap-3 rounded-md border p-3"
                >
                  <dt className="text-muted-foreground">{item.label}</dt>
                  <dd className="text-right font-medium">{item.value}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>Контакты и адреса</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="space-y-1">
              <p className="font-medium text-foreground">Юр. адрес</p>
              <p>{aboutCompany.legalAddress}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">Почтовый адрес</p>
              <p>{aboutCompany.postalAddress}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">Телефон</p>
              <p>{aboutCompany.phone}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">Электронная почта</p>
              <a href={`mailto:${aboutCompany.email}`} className="text-primary hover:underline">
                {aboutCompany.email}
              </a>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">География работы</p>
              <p>{aboutCompany.geography}</p>
            </div>
          </CardContent>
        </Card>
      </section>

    </div>
  )
}
