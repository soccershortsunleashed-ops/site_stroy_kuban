import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { DigitalForeman } from "@/components/bot/digital-foreman"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { TooltipProvider } from "@/components/ui/tooltip"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const themeInitScript = `
(() => {
  try {
    const key = "stroytrust-theme";
    const saved = localStorage.getItem(key);
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const theme = saved === "dark" || saved === "light" ? saved : preferred;
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.setAttribute("data-theme", theme);
  } catch {}
})();
`

export const metadata: Metadata = {
  title: "СтройТрест-23",
  description:
    "Строительная компания полного цикла: цифровое информационное моделирование, ревитализация, энергоэффективные решения и цифровые двойники.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TooltipProvider>
          <SiteHeader />
          <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
          <SiteFooter />
          <DigitalForeman />
        </TooltipProvider>
      </body>
    </html>
  )
}
