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
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
