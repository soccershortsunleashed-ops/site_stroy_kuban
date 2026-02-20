import { PageReveal } from "@/components/animation"
import { activities } from "@/data/site-content"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function KeyActivitiesBento() {
  return (
    <section className="space-y-4">
      <PageReveal>
        <h2 className="text-2xl font-semibold">Ключевые направления</h2>
      </PageReveal>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {activities.map((activity, index) => (
          <PageReveal
            key={activity.title}
            delay={index * 0.05}
            className={index === 0 ? "xl:col-span-2" : undefined}
          >
            <Card>
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
