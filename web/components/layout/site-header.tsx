"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { useMemo, useState } from "react"

import { ThemeToggle } from "@/components/layout/theme-toggle"
import {
  InteractiveHoverLinks,
  type InteractiveHoverLinkItem,
} from "@/components/ui/interactive-hover-links"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { brand, navItems } from "@/data/site-content"

const menuPreviewByHref: Record<string, string> = {
  "/": "/projects/fok-sirius-01.jpeg",
  "/process": "/process/process-goals-vision.jpeg",
  "/services": "/projects/project-04.jpg",
  "/projects": "/projects/presidential-lyceum-sirius/lyceum-01.jpeg",
  "/about": "/brand-logo.jpg",
}

const menuSubheadingByHref: Record<string, string> = {
  "/": "Бренд и ключевые показатели",
  "/process": "Этапы реализации и контроль",
  "/services": "Полный цикл строительных работ",
  "/projects": "Портфолио выполненных объектов",
  "/about": "О компании и компетенциях",
}

export function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const interactiveLinks = useMemo<InteractiveHoverLinkItem[]>(
    () =>
      navItems.map((item) => ({
        heading: item.title,
        href: item.href,
        subheading: menuSubheadingByHref[item.href] ?? brand.subtitle,
        imgSrc: menuPreviewByHref[item.href] ?? "/brand-logo.jpg",
      })),
    [],
  )

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/brand-logo.jpg"
            alt="Логотип СтройТрест-23"
            width={58}
            height={58}
            className="border border-border/70"
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em]">
              {brand.companyName}
            </p>
            <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              Строительные решения
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-14 w-14 rounded-none border border-border/80 hover:bg-primary/10"
                aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              >
                <Menu className="size-6" />
                <span className="sr-only">Открыть меню</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="h-[100dvh] w-screen max-w-none rounded-none border-0 bg-[#eef1f4] p-0 dark:bg-[#090b10]"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Меню сайта</SheetTitle>
                <SheetDescription>Основная навигация по разделам</SheetDescription>
              </SheetHeader>

              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-border/70 px-4 py-3 sm:px-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Разделы
                  </p>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      className="rounded-none px-4 text-xs uppercase tracking-[0.18em]"
                    >
                      Закрыть
                    </Button>
                  </SheetClose>
                </div>

                <div className="flex-1 overflow-hidden px-4 py-2 sm:px-8 sm:py-3">
                  <InteractiveHoverLinks
                    links={interactiveLinks}
                    currentPath={pathname}
                    className="bg-transparent p-0 md:px-0 md:py-0"
                    onNavigate={() => setMenuOpen(false)}
                  />
                </div>

                <div className="border-t border-border/70 px-4 py-3 sm:px-8">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Качество - наш стандарт
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
