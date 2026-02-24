import Image from "next/image"
import Link from "next/link"

import { brand, navItems } from "@/data/site-content"
import { services } from "@/data/site-content"

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/40 bg-[#0b0d11] text-[#d9dee7]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em]">
            {brand.companyName}
          </p>
          <p className="text-xs uppercase tracking-[0.14em] text-[#8893a8]">
            Качество - наш стандарт
          </p>
          <Image
            src="/brand-logo.jpg"
            alt="Логотип СтройТрест-23"
            width={84}
            height={84}
            className="rounded-sm border border-[#263244]/70 bg-white/95"
          />
        </div>
        <div>
          <h4 className="mb-3 text-xs uppercase tracking-[0.16em] text-[#8893a8]">
            Разделы
          </h4>
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
          <h4 className="mb-3 text-xs uppercase tracking-[0.16em] text-[#8893a8]">
            Услуги
          </h4>
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
        <div className="space-y-2 text-sm text-[#d9dee7]">
          <p className="text-xs uppercase tracking-[0.16em] text-[#8893a8]">Контакты</p>
          <p>г. Краснодар, Россия</p>
          <p>+7 (900) 000-00-00</p>
          <p>hello@stroytrust-23.ru</p>
          <p className="pt-4 text-xs text-[#8893a8]">© 2026 СтройТрест-23</p>
        </div>
      </div>
    </footer>
  )
}
