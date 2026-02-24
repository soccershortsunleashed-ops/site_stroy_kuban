"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BriefcaseBusiness,
  CircleUserRound,
  Building2,
  Hammer,
  Home,
  type LucideIcon,
  Menu,
} from "lucide-react"

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
import {
  NavBar,
  type TubelightNavItem,
} from "@/components/ui/tubelight-navbar"

const navIconByHref: Record<string, LucideIcon> = {
  "/": Home,
  "/process": BriefcaseBusiness,
  "/services": Hammer,
  "/projects": Building2,
  "/about": CircleUserRound,
}

export function SiteHeader() {
  const pathname = usePathname()
  const tubelightItems: TubelightNavItem[] = navItems.map((item) => ({
    name: item.title,
    url: item.href,
    icon: navIconByHref[item.href] ?? Home,
  }))

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand-logo.jpg"
            alt="Логотип СтройТрест-23"
            width={52}
            height={52}
            className="rounded-sm border border-border/50"
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

        <NavBar
          items={tubelightItems}
          activeUrl={pathname}
          className="hidden lg:block"
        />

        <div className="flex items-center gap-2">
          <Button className="hidden md:inline-flex" size="sm">
            Консультация
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Открыть меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[340px]">
              <SheetHeader>
                <SheetTitle>{brand.companyName}</SheetTitle>
                <SheetDescription>{brand.subtitle}</SheetDescription>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={pathname === item.href ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      {item.title}
                    </Button>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
