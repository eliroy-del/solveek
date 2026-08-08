import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";
import { getInsights, getProjects, getServices } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, projects, insights] = await Promise.all([
    getServices(),
    getProjects(),
    getInsights(),
  ]);

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/industries",
    "/projects",
    "/insights",
    "/faqs",
    "/contact",
    "/quote",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  return [
    ...staticRoutes,
    ...services.map((service) => ({
      url: `${SITE.url}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...projects.map((project) => ({
      url: `${SITE.url}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...insights.map((insight) => ({
      url: `${SITE.url}/insights/${insight.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
