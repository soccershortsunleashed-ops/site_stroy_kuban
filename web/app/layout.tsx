import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"

import "./globals.css"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { CookieConsentBanner } from "@/components/layout/cookie-consent-banner"
import { aboutCompany } from "@/data/about-company"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const siteUrl = "https://stroytrest-23.ru"
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
const yandexVerification = process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
const mailruVerification = process.env.NEXT_PUBLIC_MAILRU_VERIFICATION

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "СтройТрест-23 | Строительная компания полного цикла",
    template: "%s | СтройТрест-23",
  },
  description:
    "СтройТрест-23: строительство полного цикла, реконструкция, инженерные системы и проектное управление. Краснодар, Краснодарский край, Сириус.",
  keywords: [
    "строительная компания Краснодар",
    "генподряд Краснодарский край",
    "строительство полного цикла",
    "реконструкция зданий",
    "инженерные сети",
    "СтройТрест-23",
  ],
  category: "construction",
  applicationName: "СтройТрест-23",
  alternates: {
    canonical: "/",
    languages: {
      "ru-RU": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "СтройТрест-23",
    title: "СтройТрест-23 | Строительная компания полного цикла",
    description:
      "Строительство, реконструкция и управление проектами в Краснодарском крае.",
    images: [
      {
        url: "/brand-logo-transparent.png",
        width: 1200,
        height: 630,
        alt: "СтройТрест-23",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "СтройТрест-23",
    description:
      "Строительная компания полного цикла: строительство, реконструкция, инженерные решения.",
    images: ["/brand-logo-transparent.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: googleSiteVerification,
    yandex: yandexVerification,
    other: mailruVerification
      ? {
          "mailru-domain": [mailruVerification],
        }
      : undefined,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "GeneralContractor"],
    name: "СтройТрест-23",
    legalName: aboutCompany.companyFullName,
    url: siteUrl,
    logo: `${siteUrl}/brand-logo-transparent.png`,
    email: aboutCompany.email,
    telephone: aboutCompany.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Героев-Разведчиков, д. 40, офис 66",
      addressLocality: "Краснодар",
      addressRegion: "Краснодарский край",
      postalCode: "350028",
      addressCountry: "RU",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: aboutCompany.phone,
        email: aboutCompany.email,
        contactType: "customer service",
        areaServed: "RU",
        availableLanguage: ["ru"],
      },
    ],
    identifier: [
      { "@type": "PropertyValue", name: "ИНН", value: "2311327281" },
      { "@type": "PropertyValue", name: "КПП", value: "231101001" },
      { "@type": "PropertyValue", name: "ОГРН", value: "1212300068045" },
    ],
    areaServed: ["Краснодар", "Краснодарский край", "Сириус", "Россия"],
    foundingLocation: {
      "@type": "Place",
      name: "Краснодарский край",
    },
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "СтройТрест-23",
    url: siteUrl,
    inLanguage: "ru-RU",
    publisher: {
      "@type": "Organization",
      name: "СтройТрест-23",
      url: siteUrl,
    },
  }

  return (
    <html lang="ru" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <TooltipProvider>
          <SiteHeader />
          <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
          <SiteFooter />
          <CookieConsentBanner />
        </TooltipProvider>
      </body>
    </html>
  )
}
