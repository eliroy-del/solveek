import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";

const publicDisallow = ["/api/", "/admin/", "/crm/"];

/** Major AI / answer-engine crawlers — keep in sync with public/llms.txt intent. */
const aiUserAgents = [
  "GPTBot",
  "ChatGPT-User",
  "Google-Extended",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...publicDisallow, "/_next/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: publicDisallow,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: publicDisallow,
      },
      ...aiUserAgents.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: publicDisallow,
      })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
