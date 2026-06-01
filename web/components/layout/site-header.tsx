"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

import { brand, navItems } from "@/data/site-content"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SiteHeader() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true
    const saved = window.localStorage.getItem("stroytrust-theme")
    return saved ? saved === "dark" : true
  })

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
    window.localStorage.setItem("stroytrust-theme", isDark ? "dark" : "light")
  }, [isDark])

  const toggleTheme = () => {
    const nextDark = !isDark
    setIsDark(nextDark)
  }

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur">
      <div className="relative mx-auto flex h-18 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand-logo-transparent.png"
            alt="Логотип СтройТрест-23"
            width={52}
            height={52}
            className="rounded-xl border border-border/50"
          />
          <div className="hidden min-[420px]:block">
            <p className="text-xs font-semibold uppercase tracking-[0.18em]">
              {brand.companyName}
            </p>
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Строительные решения
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-md border border-border/80"
            onClick={toggleTheme}
            aria-label="Переключить тему"
          >
            {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </Button>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="h-10 w-10 rounded-md border border-border/80 p-0"
                size="icon"
                aria-label="Открыть меню"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[min(92vw,380px)] rounded-none border-l border-border/60 p-0"
            >
              <SheetHeader className="border-b border-border/40 px-6 pb-4 pt-6 sm:px-8">
                <SheetTitle className="text-xs uppercase tracking-[0.26em] text-muted-foreground">
                  Разделы
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Навигация по разделам сайта
                </SheetDescription>
              </SheetHeader>

              <div className="px-6 pb-8 pt-4 sm:px-8">
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => {
                    const isActive =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname === item.href || pathname.startsWith(`${item.href}/`)

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`rounded-md px-3 py-2 text-sm uppercase tracking-[0.14em] transition-colors ${
                          isActive
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        }`}
                      >
                        {item.title}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

