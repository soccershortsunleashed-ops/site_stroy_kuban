import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://stroytrest-23.ru/sitemap.xml",
    host: "stroytrest-23.ru",
  }
}
