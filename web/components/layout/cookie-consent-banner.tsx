"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const CONSENT_KEY = "stroytrest_cookie_consent_v1"

type ConsentValue = "accepted" | "necessary"

export function CookieConsentBanner() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem(CONSENT_KEY)
    if (!saved) {
      const frame = window.requestAnimationFrame(() => setIsOpen(true))
      return () => window.cancelAnimationFrame(frame)
    }
  }, [])

  const saveConsent = (value: ConsentValue) => {
    window.localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({
        value,
        at: new Date().toISOString(),
      }),
    )
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-x-0 bottom-4 z-[70] px-4 sm:px-6 lg:px-8">
      <Card className="mx-auto w-full max-w-3xl border-border/80 bg-background/95 shadow-2xl backdrop-blur">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Мы используем cookie</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-6 text-muted-foreground">
            Cookie помогают корректно работать сайту, анализировать посещаемость и улучшать
            сервис. Нажимая «Принять все», вы соглашаетесь с использованием всех cookie.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => saveConsent("necessary")}>
              Только необходимые
            </Button>
            <Button onClick={() => saveConsent("accepted")}>Принять все</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
