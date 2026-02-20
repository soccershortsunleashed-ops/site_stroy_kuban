import { processSteps } from "@/data/site-content"
import { Card, CardContent } from "@/components/ui/card"

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
        {processSteps.map((step) => (
          <Card key={step.index} className="overflow-hidden">
            <CardContent className="grid items-start gap-4 p-0 md:grid-cols-[96px_1fr]">
              <div className="flex h-full items-center justify-center bg-muted/40 py-6 text-3xl font-semibold text-primary md:text-4xl">
                {step.index}
              </div>
              <div className="space-y-2 p-5 md:p-6">
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.body}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
