import { PageReveal } from "@/components/animation"
import { activities } from "@/data/site-content"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function KeyActivitiesBento() {
  return (
    <section className="space-y-4">
      <PageReveal>
        <div className="border-b border-border/70 pb-3">
          <h2 className="text-2xl font-semibold uppercase tracking-[0.05em]">Ключевые направления</h2>
        </div>
      </PageReveal>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {activities.map((activity, index) => (
          <PageReveal
            key={activity.title}
            delay={index * 0.05}
            className={index === 0 ? "xl:col-span-2" : undefined}
          >
            <Card className="rounded-none border-border/70">
              <CardHeader>
                <CardTitle className="text-lg">{activity.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {activity.description}
              </CardContent>
            </Card>
          </PageReveal>
        ))}
      </div>
    </section>
  )
}
