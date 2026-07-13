# Progress Notes

## 2026-07-12 — Initial site build

### Purpose

Scaffold the complete initial version of the personal academic website (Astro +
TypeScript + Tailwind 4, pixi-managed, GitHub Pages deploy).

### Current status

Complete and building cleanly. All routes render; placeholder content in place.

- `pixi run build` → succeeds, 12 pages.
- `pixi run check` → 0 errors, 0 warnings.
- `pixi run format-check` → clean.

### Commands

```bash
pixi install          # create env (installs Node.js)
pixi run install      # npm install
pixi run dev          # local dev server
pixi run build        # production build -> dist/
pixi run check        # astro check
pixi run format       # prettier --write
```

### What was built

- Config: `astro.config.mjs` (site/base, MDX, sitemap, Tailwind vite plugin),
  `tsconfig.json` (strict), Prettier config.
- Design system: `src/styles/global.css` — herbarium palette as CSS tokens
  mapped to Tailwind via `@theme inline`, light/dark themes, prose styles.
- Layout/components: `Base` (SEO/OG head, skip link), `Article`, `Header`
  (responsive nav + theme toggle), `Footer`, card/list components, leaf divider.
- Data: `src/data/site.ts` (metadata, profiles, nav), `src/lib/paths.ts`
  (`withBase`, `formatDate`).
- Content collections (typed in `src/content.config.ts`): blog, tutorials,
  projects, software, publications, teaching — each with placeholder entries.
- Pages: home, about, research, software, publications, teaching, cv, blog
  (+ post), tutorials (+ tutorial), 404.
- CI/CD: `.github/workflows/ci.yml` (PR checks) and `deploy.yml` (Pages deploy).
- Docs: design plan under `docs/plans/`, this note; `README.md`, `AGENTS.md`.

### Decisions / logic

- pixi provides Node.js; npm deps in `node_modules/`. All work via `pixi run`.
- Deploys as a GitHub **project page** (repo name ≠ username) under
  `/nathanmathieu.github.io/`. The deploy workflow feeds the base path from
  `actions/configure-pages`, so a custom domain later needs only a `CNAME` file
  and the DNS/Pages settings — no code change.
- Zod imported from `astro/zod` (the `astro:content` re-export of `z` is
  deprecated in Astro 7).
- Fonts self-hosted via `@fontsource` (Fraunces / Alegreya Sans / IBM Plex
  Mono) — no CDN, builds offline.

### Failures / issues

- None outstanding. Initial `astro check` flagged deprecated `z` import; fixed
  by importing from `astro/zod`.

### Next steps

1. Enable Pages: repo **Settings → Pages → Source = GitHub Actions**, then merge
   the PR to trigger the first deploy.
2. Replace `[PLACEHOLDER: …]` content: bio, research/software/publications/
   teaching entries, profile URLs in `src/data/site.ts`, `public/cv.pdf`.
3. Optional: custom domain (`public/CNAME` + DNS), RSS feed, interactive
   figures as Astro islands.
