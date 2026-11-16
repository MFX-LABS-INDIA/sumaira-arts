import type { MetadataRoute } from "next";
import { routes } from "@/constants/routes";
import { site } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(routes).map((path) => ({
    url: new URL(path, site.url).toString(),
    lastModified: new Date(),
  }));
}
