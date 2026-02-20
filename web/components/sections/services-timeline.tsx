import { CheckCircle2 } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function ServicesTimeline({ timeline }: { timeline: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Этапы реализации</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {timeline.map((step, index) => (
          <div key={step}>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Этап {index + 1}</p>
                <p className="text-sm text-muted-foreground">{step}</p>
              </div>
            </div>
            {index < timeline.length - 1 ? <Separator className="mt-4" /> : null}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
