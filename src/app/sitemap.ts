import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";
import { getInsights, getProjects } from "@/lib/content";

type SitemapEntry = MetadataRoute.Sitemap[number];

const staticPages: Array<{
  path: string;
  changeFrequency: SitemapEntry["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.9 },
  { path: "/ecosystem", changeFrequency: "monthly", priority: 0.9 },
  { path: "/work", changeFrequency: "weekly", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.85 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.95 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [projects, articles] = await Promise.all([
    getProjects(),
    getInsights(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${SITE.url}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const workRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE.url}/work/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE.url}/blog/${article.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticRoutes, ...workRoutes, ...blogRoutes];
}
