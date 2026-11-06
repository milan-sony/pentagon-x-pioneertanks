import type { MetadataRoute } from "next";
import { allRoutes } from "@/data/navigation.js";
import { BUILD_DATE, SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date(BUILD_DATE);
  return allRoutes().map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/products" ? 0.9 : 0.5,
  }));
}
