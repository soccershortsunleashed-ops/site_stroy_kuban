import Image from "next/image"
import Link from "next/link"

import { aboutCompany } from "@/data/about-company"
import { brand, navItems, services } from "@/data/site-content"

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/40 bg-[#0b0d11] text-[#d9dee7]">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Image
                src="/brand-logo-transparent.png"
                alt="Логотип СтройТрест-23"
                width={64}
                height={64}
                className="h-16 w-16 shrink-0 object-contain"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-[0.16em]">{brand.companyName}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#8893a8]">
                  Качество - наш стандарт
                </p>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <p>{aboutCompany.phone}</p>
              <p>
                <a
                  href={`mailto:${aboutCompany.email}`}
                  className="text-[#c7d4e8] hover:text-white underline-offset-2 hover:underline"
                >
                  {aboutCompany.email}
                </a>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 md:col-span-2 md:grid-cols-2 lg:col-span-2">
            <div>
              <h4 className="mb-3 text-xs uppercase tracking-[0.16em] text-[#8893a8]">Разделы</h4>
              <ul className="space-y-2 text-sm text-[#d9dee7]">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-white">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-xs uppercase tracking-[0.16em] text-[#8893a8]">Услуги</h4>
              <ul className="space-y-2 text-sm text-[#d9dee7]">
                {services.slice(0, 5).map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}`} className="hover:text-white">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-2 text-sm text-[#c7d4e8] md:col-span-2 lg:col-span-1">
            <p className="text-xs uppercase tracking-[0.16em] text-[#8893a8]">Реквизиты и адрес</p>
            <p className="text-[#d9dee7]">{aboutCompany.companyFullName}</p>
            <p>ИНН {aboutCompany.requisites[0]?.value} КПП {aboutCompany.requisites[1]?.value}</p>
            <p>ОГРН {aboutCompany.requisites[2]?.value}</p>
            <p>{aboutCompany.legalAddress}</p>
            <p>{aboutCompany.postalAddress}</p>
          </div>
        </div>

        <div className="mt-6 border-t border-border/30 pt-4">
          <p className="text-xs text-[#8893a8]">© 2021 - 2026 СтройТрест-23</p>
        </div>
      </div>
    </footer>
  )
}
