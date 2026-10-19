import type { MetadataRoute } from "next";
import { site } from "@/config/site";

// Pre-render at build time (required for the static export to GitHub Pages).
export const dynamic = "force-static";

/**
 * Indexing is allowed only on the production deployment. Set
 * NEXT_PUBLIC_ALLOW_INDEXING=true in the production environment; previews
 * and staging stay out of search results by default.
 */
export default function robots(): MetadataRoute.Robots {
  const allow = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
  return allow
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml`, host: site.url }
    : { rules: { userAgent: "*", disallow: "/" } };
}
