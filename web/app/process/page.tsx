import type { Metadata } from "next"

import { ProcessImmersiveList } from "@/components/sections/process-immersive-list"

export const metadata: Metadata = {
  title: "Процесс | СтройТрест-23",
  description:
    "Дисциплинированный процесс реализации: от целей и бюджетирования до ввода в эксплуатацию.",
}

export default function ProcessPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Процесс</p>
        <h1 className="text-4xl font-semibold tracking-tight">Успех строится процессом</h1>
        <p className="max-w-3xl text-muted-foreground">
          Системный контроль каждого шага обеспечивает предсказуемый результат, качество и
          прозрачность для заказчика.
        </p>
      </header>

      <ProcessImmersiveList />
    </div>
  )
}
