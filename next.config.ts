import type { NextConfig } from "next";
import { phone } from "./src/config/site";

// Loud reminder on production builds while the phone number is a placeholder.
if (process.env.NODE_ENV === "production" && phone.isPlaceholder) {
  console.warn(
    "\n⚠  Assisted Shopping: phone number " +
      phone.display +
      " is a PLACEHOLDER. Replace it in src/config/site.ts and set isPlaceholder=false before launch.\n",
  );
}

const nextConfig: NextConfig = {
  // The site is hosted on GitHub Pages, which only serves static files.
  // `next build` writes the whole site to ./out (see .github/workflows/nextjs.yml).
  // Static export can't set HTTP response headers, so security headers would
  // need a CDN in front of Pages (e.g. Cloudflare) if they're required.
  output: "export",
  // Emit /about/index.html etc., so every route works on a plain static host.
  trailingSlash: true,
  images: { unoptimized: true },
  // Cache Components / Partial Prefetching are server features and are
  // incompatible with the `force-static` metadata routes a static export needs.
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
