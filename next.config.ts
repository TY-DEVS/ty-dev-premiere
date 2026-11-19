import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ty-dev.site",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/fr",
        destination: "/",
        permanent: true,
      },
      {
        source: "/en",
        destination: "/",
        permanent: true,
      },
      {
        source: "/rss.xml",
        destination: "/feed.xml",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
