"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { brand, navItems, services } from "@/data/site-content"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
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
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand-logo.jpg"
            alt="Логотип СтройТрест-23"
            width={34}
            height={34}
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

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "h-8 bg-transparent px-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground",
                    pathname === item.href && "bg-accent text-accent-foreground"
                  )}
                >
                  {item.title}
                </Link>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Направления</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[480px] gap-2 p-3 md:grid-cols-2">
                  {services.slice(0, 6).map((service) => (
                    <li key={service.slug}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={`/services/${service.slug}`}
                          className="rounded-sm border border-border/40 bg-card p-3"
                        >
                          <p className="text-sm font-medium">{service.title}</p>
                          <p className="line-clamp-2 text-xs text-muted-foreground">
                            {service.short}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

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
