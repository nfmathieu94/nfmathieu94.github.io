# AGENTS.md

Conventions for humans and coding agents working on this repository. Read this
before making changes. The design rationale lives in
`docs/plans/2026-07-12-initial-site-design.md`.

## What this project is

A static personal academic website (Astro + TypeScript + Tailwind CSS 4),
authored in Markdown/MDX and deployed to GitHub Pages via GitHub Actions.

## Environment & tooling

- **pixi owns the toolchain.** Node.js comes from the pixi environment
  (`pixi.toml`); there is no reliance on a system Node install. Do **not** add a
  `.nvmrc` or assume a global `node`.
- **Run everything through pixi tasks**, e.g. `pixi run dev`, `pixi run build`,
  `pixi run check`, `pixi run format`. Add new tasks to `pixi.toml`, mirroring
  them as npm scripts in `package.json` where it makes sense.
- **Add npm dependencies** with `pixi run npm install <pkg>` (or
  `pixi run npm install --save-dev <pkg>`), then commit both `package.json` and
  `package-lock.json`.
- **No CDNs at runtime.** Fonts and assets are self-hosted (`@fontsource`
  packages). Keep it that way — the site must build and run fully offline.

## Before you commit

Always run and confirm these pass:

```bash
pixi run format      # Prettier (or format-check to verify only)
pixi run check       # astro check — type + template validation, 0 errors
pixi run build       # production build must succeed
```

CI (`.github/workflows/ci.yml`) runs `format-check`, `check`, and `build` on
every PR. Don't merge red.

## Content vs. layout — keep them separate

This separation is the core convention. Respect it.

- **Editable content** goes in one of two places:
  - `src/data/site.ts` — site metadata, email, profile links, navigation.
  - `src/content/<collection>/*.md(x)` — collection entries.
- **Components and layouts never hardcode personal details** (name, email,
  links, publication data). Read them from `src/data/site.ts` or collection
  frontmatter instead.
- Unfinished content is marked `[PLACEHOLDER: …]` so it's greppable. When you
  add real content, remove the marker.

## Content collections

Schemas are defined and typed in `src/content.config.ts` using Zod (imported
from `astro/zod`). Collections: `blog`, `tutorials`, `projects`, `software`,
`publications`, `teaching`. When adding a field:

1. Update the Zod schema (keep new fields optional or give them a default so
   existing entries still validate).
2. Update the component that renders it.
3. Rebuild — a schema mismatch fails the build loudly, which is intended.

## Routing & the base path

The site currently deploys as a GitHub **project page** under
`/nathanmathieu.github.io/`, so it has a non-root base path.

- **Always wrap internal links and asset paths in `withBase()`** from
  `src/lib/paths.ts`: `href={withBase("/blog/")}`. Never hardcode a leading
  `/path` for an internal link — it will 404 on the deployed subpath.
- The base path is configured in `astro.config.mjs` and overridden in CI by the
  `configure-pages` action, so it "just works" for both the project subpath and
  a future custom domain. Don't hardcode the subpath anywhere else.

## Styling

- Tailwind utility classes in markup; shared patterns live as component classes
  in `src/styles/global.css` (`.specimen-card`, `.link-vine`, `.tag-label`,
  `.prose`).
- Colors come from CSS custom properties mapped to Tailwind via `@theme inline`
  (`bg-paper`, `text-ink`, `text-pine`, `border-line`, etc.). Use these tokens
  rather than raw hex values so light/dark themes stay consistent.
- Dark mode is driven by a `data-theme` attribute on `<html>` (set before first
  paint in `Base.astro`), toggled in `Header.astro`, and persisted in
  `localStorage`. Style dark variants with the `dark:` variant.

## Accessibility & semantics

- Use semantic elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<time>`).
- Every page renders through `Base.astro`, which provides the skip link,
  `<title>`, meta description, canonical URL, and Open Graph/Twitter tags. New
  pages should pass a `title` (and ideally `description`) to it.
- Decorative SVGs get `aria-hidden="true"`; interactive controls get accessible
  labels (`aria-label`) and correct ARIA state (`aria-current`, `aria-expanded`).
- Keep color contrast adequate in both themes.

## Commit & PR conventions

- Work on a feature branch; keep commits focused and message-clear.
- Open a PR into `main`; CI must be green before merge.
- Pushing to `main` triggers a production deploy — treat `main` as always
  deployable.

## Good follow-up tasks (not yet implemented)

- RSS feed for `blog` (and maybe `tutorials`) via `@astrojs/rss`.
- Client-side interactive figures as Astro islands (add a UI framework
  integration when the first one is needed).
- Tag index pages and simple client-side search.
- Replace the SVG social image with a per-page generated OG image.
