import type { MetadataRoute } from "next";
import { routes } from "@/constants/routes";
import { site } from "@/constants/site";
import { journalPosts } from "@/data/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...Object.values(routes), ...journalPosts.map((post) => post.href)].map((path) => ({
    url: new URL(path, site.url).toString(),
    lastModified: new Date(),
  }));
}
