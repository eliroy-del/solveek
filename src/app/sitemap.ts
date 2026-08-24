import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";
import { getProjects } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  const staticRoutes = ["", "/ecosystem", "/work", "/about", "/contact"].map(
    (path) => ({
      url: `${SITE.url}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.85,
    })
  );

  return [
    ...staticRoutes,
    ...projects.map((project) => ({
      url: `${SITE.url}/work/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];
}
