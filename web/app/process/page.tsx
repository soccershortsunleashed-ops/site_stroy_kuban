import type { Metadata } from "next"

import { ProcessImmersiveList } from "@/components/sections/process-immersive-list"

export const metadata: Metadata = {
  title: "Процесс",
  description:
    "Дисциплинированный процесс реализации проектов: от целей и бюджетирования до ввода в эксплуатацию.",
  keywords: [
    "этапы строительства",
    "управление строительным проектом",
    "процесс реализации объекта",
    "контроль качества строительства",
  ],
  alternates: {
    canonical: "/process",
  },
  openGraph: {
    title: "Процесс реализации проектов | СтройТрест-23",
    description:
      "От целей и бюджетирования до ввода в эксплуатацию: прозрачный и контролируемый процесс реализации.",
    url: "/process",
    type: "website",
  },
}

export default function ProcessPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Процесс</p>
        <h1 className="text-4xl font-semibold tracking-tight">Успех строится на системе</h1>
        <p className="max-w-3xl text-muted-foreground">
          Мы сопровождаем проект на каждом этапе: от постановки задач и проектирования до ввода
          объекта в эксплуатацию и дальнейшего сопровождения.
        </p>
      </header>

      <ProcessImmersiveList />
    </div>
  )
}
