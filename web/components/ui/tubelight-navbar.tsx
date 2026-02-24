"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface TubelightNavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: TubelightNavItem[]
  className?: string
  activeUrl?: string
}

function getActiveName(items: TubelightNavItem[], activeUrl?: string) {
  if (!items.length) {
    return ""
  }

  if (!activeUrl) {
    return items[0].name
  }

  const matchedItem = items.find((item) => {
    if (item.url === "/") {
      return activeUrl === "/"
    }

    return activeUrl === item.url || activeUrl.startsWith(`${item.url}/`)
  })

  return matchedItem?.name ?? items[0].name
}

export function NavBar({ items, className, activeUrl }: NavBarProps) {
  const initialActiveName = useMemo(
    () => getActiveName(items, activeUrl),
    [items, activeUrl]
  )
  const [activeTab, setActiveTab] = useState(initialActiveName)

  useEffect(() => {
    setActiveTab(getActiveName(items, activeUrl))
  }, [items, activeUrl])

  return (
    <nav className={cn("relative", className)} aria-label="Разделы сайта">
      <div className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-background/90 p-1 shadow-[0_12px_28px_-18px_rgba(24,32,56,0.7)] backdrop-blur-xl">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              aria-current={isActive ? "page" : undefined}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors md:px-4",
                "text-muted-foreground hover:text-foreground",
                isActive && "text-foreground"
              )}
            >
              <Icon className="size-4 md:hidden" strokeWidth={2.3} />
              <span className="hidden md:inline">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="tubelight-lamp"
                  className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 28,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-t-full bg-primary shadow-[0_0_20px_rgba(242,153,74,0.8)]">
                    <div className="absolute -left-2 -top-2 h-6 w-14 rounded-full bg-primary/30 blur-md" />
                    <div className="absolute -top-1 left-0 h-5 w-10 rounded-full bg-primary/25 blur-sm" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
