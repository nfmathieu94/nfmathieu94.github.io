// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Deployed as the GitHub *user* page (repo `nfmathieu94.github.io`), so the
// site is served from the domain root and the base path is "/". The deploy
// workflow still feeds SITE_URL/SITE_BASE from actions/configure-pages, so a
// future custom domain (public/CNAME + Settings → Pages) or a move back to a
// project subpath needs no code change here.
const SITE_URL = process.env.SITE_URL || "https://nfmathieu94.github.io";
const SITE_BASE = process.env.SITE_BASE || "/";

export default defineConfig({
  site: SITE_URL,
  base: SITE_BASE,
  trailingSlash: "ignore",
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
