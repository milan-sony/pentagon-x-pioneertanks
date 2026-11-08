import type { NextConfig } from "next";

/** Build-time values; `new Date()` is not allowed during prerendering with Cache Components. */
const buildDate = new Date();

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  env: {
    NEXT_PUBLIC_BUILD_YEAR: String(buildDate.getFullYear()),
    NEXT_PUBLIC_BUILD_DATE: buildDate.toISOString(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 390, 640, 768, 1024, 1366, 1440, 1920],
    // Hero (72) and PageHero (70) use lighter quality for large banner photos; 75 is the default.
    qualities: [70, 72, 75],
  },
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
