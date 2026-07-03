import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { path: "", priority: 1.0 },
    { path: "/kurse", priority: 0.9 },
    { path: "/werkstatt-mieten", priority: 0.9 },
    { path: "/auftragsarbeiten", priority: 0.9 },
    { path: "/holzkurse-koepenick", priority: 0.8 },
    { path: "/kontakt", priority: 0.8 },
  ];
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));
}
