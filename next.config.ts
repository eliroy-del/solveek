import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/projects/:slug", destination: "/work/:slug", permanent: true },
      { source: "/services", destination: "/ecosystem", permanent: true },
      { source: "/services/:slug", destination: "/ecosystem", permanent: true },
      { source: "/quote", destination: "/contact", permanent: true },
      { source: "/insights", destination: "/", permanent: false },
      { source: "/insights/:slug", destination: "/", permanent: false },
      { source: "/faqs", destination: "/contact", permanent: false },
      { source: "/industries", destination: "/ecosystem", permanent: false },
      { source: "/tracking", destination: "/contact", permanent: false },
    ];
  },
};

export default nextConfig;
