// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Deployed as a GitHub *project* page for now (repo name != GitHub username),
// so the site lives under a base path. When a custom domain is set up:
//   1. set SITE_URL to e.g. "https://nathanmathieu.com" and SITE_BASE to "/"
//      (either via env vars in the deploy workflow or by editing the defaults)
//   2. add a `public/CNAME` file containing the domain
const SITE_URL = process.env.SITE_URL || "https://nfmathieu94.github.io";
// configure-pages reports an empty base_path for user/custom-domain sites;
// fall back to "/" in that case rather than to the project-page default.
const SITE_BASE =
  process.env.SITE_BASE !== undefined
    ? process.env.SITE_BASE || "/"
    : "/nathanmathieu.github.io";

export default defineConfig({
  site: SITE_URL,
  base: SITE_BASE,
  trailingSlash: "ignore",
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
