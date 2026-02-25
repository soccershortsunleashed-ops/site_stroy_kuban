"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu } from "lucide-react"
import { useState } from "react"

import { brand, navItems } from "@/data/site-content"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  InteractiveHoverLinks,
  type InteractiveLinkItem,
} from "@/components/ui/interactive-hover-links"
import { cn } from "@/lib/utils"

const navPreviewByHref: Record<string, string> = {
  "/": "/projects/fok-sirius-01.jpeg",
  "/process": "/process/process-goals-vision.jpeg",
  "/services": "/projects/project-04.jpg",
  "/projects": "/projects/presidential-lyceum-sirius/lyceum-01.jpeg",
  "/about": "/brand-logo.jpg",
}

const navSubheadingByHref: Record<string, string> = {
  "/": "Главный экран",
  "/process": "Этапы реализации",
  "/services": "Структура услуг",
  "/projects": "Портфолио проектов",
  "/about": "О компании",
}

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const interactiveMenuLinks: InteractiveLinkItem[] = navItems.map((item) => ({
    heading: item.title,
    subheading: navSubheadingByHref[item.href] ?? brand.subtitle,
    href: item.href,
    imgSrc: navPreviewByHref[item.href] ?? "/brand-logo.jpg",
  }))

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur">
      <div className="relative mx-auto flex h-18 w-full max-w-7xl items-center justify-start gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand-logo.jpg"
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

        <NavigationMenu className="absolute left-1/2 hidden -translate-x-1/2 xl:flex">
          <NavigationMenuList className="rounded-full border border-border/80 bg-background/90 p-1 shadow-[0_12px_28px_-18px_rgba(24,32,56,0.7)] backdrop-blur-xl">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`)

              return (
                <NavigationMenuItem key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "h-9 rounded-full bg-transparent px-4 text-[11px] uppercase tracking-[0.14em]",
                      "text-muted-foreground hover:text-foreground",
                      isActive && "bg-accent text-accent-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-2">
          <Button className="hidden rounded-full md:inline-flex" size="sm">
            Консультация
          </Button>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="rounded-full px-3 sm:px-4"
                size="sm"
              >
                <Menu className="size-4" />
                <span className="ml-2 uppercase tracking-[0.12em]">Разделы</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[min(98vw,1840px)] max-w-none rounded-none border-l border-border/60 p-0"
            >
              <SheetHeader className="border-b border-border/40 px-6 pb-4 pt-6 sm:px-8">
                <SheetTitle className="text-xs uppercase tracking-[0.26em] text-muted-foreground">
                  Разделы
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Навигация по разделам сайта
                </SheetDescription>
              </SheetHeader>

              <div className="px-6 pb-8 pt-2 sm:px-8">
                <InteractiveHoverLinks
                  links={interactiveMenuLinks}
                  activeHref={pathname}
                  onNavigate={(href, event) => {
                    if (href.startsWith("/")) {
                      event.preventDefault()
                      setIsMenuOpen(false)
                      router.push(href)
                      return
                    }
                    setIsMenuOpen(false)
                  }}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
