import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  turbopack: {
    root: projectRoot,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.stroytrest-23.ru",
          },
        ],
        destination: "https://stroytrest-23.ru/:path*",
        permanent: true,
      },
      {
        source: "/projects/mys-adler",
        destination: "/projects/mys-adler-sports-park",
        permanent: true,
      },
      {
        source: "/projects/presidential-lyceum",
        destination: "/projects/presidential-lyceum-sirius",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
