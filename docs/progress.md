# Progress Notes

## 2026-07-16 — Motif art refresh + About photo deck

### Purpose

Second pass on the per-section header motifs (bigger, redesigned Software /
Blog / Tutorials art, idle "life" animations) and a rotating personal-photo
deck on the About page. Branch: `feat/motif-art-refresh`.

### What was built

- `PageIntro.astro`: motifs render larger (`h-14` → `h-20`).
- `PageMotif.astro` redesigns:
  - **Software**: potted plant between `< >` brackets (the cluttered
    vine-through-`/` is gone).
  - **Blog**: leaf-quill whose ink line unfurls into a fiddlehead spiral,
    trailing gold spore dots.
  - **Tutorials**: sprout now climbs on a tall curving stem well clear of the
    terminal, two leaves + gold bud.
- Idle "life" vocabulary in `global.css` (reduced-motion-gated): `.sway`
  (leaves breathe in a light breeze) and `.pulse-dot` (buds/spores/DNA base
  pairs glow softly, staggered) — applied across all eight motifs.
- About page photo deck (`PhotoDeck.astro` + `src/data/photos.ts` +
  `public/images/about/placeholder-*.svg`): stacked polaroid-style cards with
  a washi-tape detail that auto-shuffle (top card lifts and tucks under);
  pauses on hover, click to advance, disabled under reduced motion. Photos are
  data-driven; placeholders marked for replacement (see
  `docs/EDITING-GUIDE.md` → About → "Your photos").

### Next steps

1. Eyeball every page in `pixi run dev` (light + dark), then PR into `main`.
2. Replace placeholder photos with real ones.

## 2026-07-16 — First live deploy: user page at the domain root

### Purpose

Get the site publicly reachable and align config/docs after the repo rename.

### What happened

- GitHub Pages was never enabled, so every deploy failed at the
  `configure-pages` step. Fixed via **Settings → Pages → Source = GitHub
  Actions**; the deploy workflow now passes.
- Repo renamed `nathanmathieu.github.io` → **`nfmathieu94.github.io`**, making
  it a GitHub _user_ page served at the domain root
  (<https://nfmathieu94.github.io/>). Local git remote updated to match.
- The first successful deploy predated the rename, so the live HTML linked
  assets under the old `/nathanmathieu.github.io/` subpath and the site
  rendered unstyled. Fix: re-run "Deploy to GitHub Pages" (workflow_dispatch)
  so `configure-pages` bakes in the root base path.
- Updated `astro.config.mjs` (default `SITE_BASE` is now `/`),
  `src/lib/paths.ts`, `README.md`, `AGENTS.md`, and `docs/EDITING-GUIDE.md` to
  drop the stale project-subpath references. `withBase()` remains the rule for
  internal links.

### Next steps

1. Merge the pending `feat/botanical-aesthetic` commit (per-section motifs)
   plus these docs/config updates into `main`.
2. Replace `[PLACEHOLDER: …]` content (see `docs/EDITING-GUIDE.md`).
3. Optional: custom domain via `public/CNAME` + DNS (README has the steps).

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
