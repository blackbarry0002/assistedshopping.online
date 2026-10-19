import type { MetadataRoute } from "next";
import { site } from "@/config/site";

// Update when page content changes materially.
const LAST_MODIFIED = "2026-10-19";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/terms", priority: 0.3 },
    { path: "/privacy", priority: 0.3 },
    { path: "/refund-policy", priority: 0.3 },
  ];
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
