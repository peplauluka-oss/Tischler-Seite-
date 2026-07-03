import type { NextConfig } from "next";

/**
 * Zwei Deploy-Ziele:
 *  - Vercel (Standard): SSR + API-Route fürs Kontaktformular
 *  - GitHub Pages (Preview): statischer Export unter /<repo-name>/
 *    → aktiviert über GITHUB_PAGES=true im Pages-Workflow
 */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(isPages && {
    output: "export" as const,
    basePath,
    assetPrefix: basePath,
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
