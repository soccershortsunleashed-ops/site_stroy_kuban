"use client"

import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "stroytrust-theme"

export function ThemeToggle({ className }: { className?: string }) {
  const toggleTheme = () => {
    const root = document.documentElement
    const isDark = root.classList.contains("dark")
    const nextTheme = isDark ? "light" : "dark"

    root.classList.toggle("dark", nextTheme === "dark")
    root.setAttribute("data-theme", nextTheme)
    window.localStorage.setItem(STORAGE_KEY, nextTheme)
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "relative h-14 w-14 rounded-none border border-border/80 hover:bg-primary/10",
        className
      )}
      aria-label="Переключить тему"
    >
      <Moon className="size-5 dark:hidden" />
      <Sun className="hidden size-5 dark:block" />
      <span className="sr-only">Переключатель темы</span>
    </Button>
  )
}
