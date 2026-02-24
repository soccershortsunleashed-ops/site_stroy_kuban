"use client"

import { CardStack, type CardStackItem } from "@/components/ui/card-stack"

const items: CardStackItem[] = [
  {
    id: 1,
    title: "Жилой квартал у моря",
    description: "Комплексное строительство с акцентом на среду для жизни",
    imageSrc:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    href: "/projects",
    ctaLabel: "Открыть раздел проектов",
  },
  {
    id: 2,
    title: "Деловой центр",
    description: "Пространства для работы, встреч и сервисов",
    imageSrc:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    href: "/projects",
    ctaLabel: "Открыть раздел проектов",
  },
  {
    id: 3,
    title: "Городская ревитализация",
    description: "Обновление территорий с сохранением функциональности",
    imageSrc:
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1600&q=80",
    href: "/projects",
    ctaLabel: "Открыть раздел проектов",
  },
  {
    id: 4,
    title: "Инженерный контур",
    description: "Надежные решения для долгого срока службы объектов",
    imageSrc:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=80",
    href: "/projects",
    ctaLabel: "Открыть раздел проектов",
  },
  {
    id: 5,
    title: "Новые общественные пространства",
    description: "Проекты, ориентированные на удобство жителей",
    imageSrc:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80",
    href: "/projects",
    ctaLabel: "Открыть раздел проектов",
  },
]

export function CardStackDemo() {
  return (
    <div className="mx-auto w-full max-w-6xl p-4 md:p-8">
      <CardStack
        items={items}
        initialIndex={0}
        autoAdvance
        intervalMs={2800}
        pauseOnHover
        showDots
        maxVisible={5}
        cardWidth={350}
        cardHeight={230}
      />
    </div>
  )
}
