# Initial Site — Design & Implementation Plan

Date: 2026-07-12

## Purpose

Personal academic website for Nathan Mathieu (PhD student, UC Riverside, plant
science). Professional but warm, with a nature-based visual identity. Will grow
to hold a biography, publications, blog posts, interactive figures, tutorials,
and software.

## Stack (fixed by requirements)

- **Astro 7** — static-first framework, content collections, MDX support
- **TypeScript** (strict) — type-checked frontmatter schemas and components
- **Tailwind CSS 4** — via `@tailwindcss/vite`, theme tokens in CSS `@theme`
- **Markdown/MDX** — all content lives in `src/content/` collections
- **pixi** — manages Node.js itself (`nodejs` from conda-forge); npm packages
  live in `node_modules/` inside the repo. All commands run via `pixi run`.
- **GitHub Actions** — CI (format check, `astro check`, build) + Pages deploy
- **GitHub Pages** — hosting; custom domain later

## Key decisions & assumptions

1. **Pages URL / base path.** The repo is `nfmathieu94/nathanmathieu.github.io`.
   Because the repo name does not match the GitHub username, this deploys as a
   _project_ page at `https://nfmathieu94.github.io/nathanmathieu.github.io/`.
   The site therefore uses Astro's `base` config, and all internal links go
   through a `withBase()` helper. When a custom domain (or a rename to
   `nfmathieu94.github.io`) happens, set `SITE_URL`/`SITE_BASE` in
   `astro.config.mjs` and add a `CNAME`; nothing else changes.
2. **Content/layout separation.** All editable content is either (a) Markdown/
   MDX in `src/content/<collection>/`, or (b) plain data in `src/data/` (site
   metadata, profile links, CV facts). Components never hardcode personal
   details. Placeholders are marked `[PLACEHOLDER: …]`.
3. **Fonts are self-hosted** via `@fontsource` npm packages (no CDN):
   Fraunces Variable (display serif — organic, botanical character), Alegreya
   Sans (humanist body), IBM Plex Mono (code).
4. **No client-side JS framework yet.** Astro islands can be added later for
   interactive figures; the initial site is pure static HTML/CSS plus a tiny
   inline script for the mobile nav and theme toggle.
5. **Light + dark themes**, honoring `prefers-color-scheme` with a manual
   toggle persisted in `localStorage`.
6. **Formatting/validation**: Prettier (with `prettier-plugin-astro`),
   `astro check` (TypeScript + template checking). Both run in CI and are
   exposed as pixi tasks.

## Visual identity

Nature palette ("herbarium" theme):

- Ink: deep bark brown-green for text
- Paper: warm cream background (light) / deep pine (dark)
- Primary: forest green; hover: moss
- Accents: lichen gold (highlights, links underline), clay red used sparingly
- Typography: Fraunces for headings (high-contrast serif, slightly botanical),
  Alegreya Sans for body; generous line-height; max ~70ch measure for prose.
- Distinctive touches: leaf-vein divider motif (inline SVG), botanical specimen
  card styling for projects, subtle grain-free flat surfaces (no glassmorphism,
  no purple gradients).

## Information architecture

```
/                 Home — intro, current focus, recent highlights
/about/           Biography, research interests, contact + profile links
/research/        Research projects (collection: projects)
/software/        Software & GitHub projects (collection: software)
/publications/    Publications & presentations (collection: publications)
/teaching/        Teaching & technical writing (collection: teaching)
/blog/            Posts (collection: blog), newest first
/blog/<slug>/     Individual post
/tutorials/       Tutorials (collection: tutorials)
/tutorials/<slug>/ Individual tutorial
/cv/              HTML CV summary + link to PDF placeholder
/404              Not-found page
```

Header nav: About, Research, Software, Publications, Teaching, Blog, Tutorials,
CV. Footer: contact email, GitHub / Google Scholar / ORCID / LinkedIn / Bluesky
placeholders.

## Content collections (typed schemas in `src/content.config.ts`)

- `blog` — title, description, pubDate, updatedDate?, tags[], draft
- `tutorials` — title, description, pubDate, difficulty, tags[], draft
- `projects` — title, summary, status, tags[], image?, links{}, order
- `software` — name, summary, repo, docs?, language, status, order
- `publications` — title, authors[], venue, year, type (article/preprint/
  poster/talk), doi?, pdf?, code?, highlight
- `teaching` — role, course, institution, term, description

## Repository layout

```
pixi.toml              # nodejs + tasks (install/dev/build/check/format)
package.json           # npm deps + scripts
astro.config.mjs       # site/base, MDX, sitemap, Tailwind vite plugin
tsconfig.json          # astro/tsconfigs/strict
.prettierrc.json
.github/workflows/ci.yml       # PRs: format check + astro check + build
.github/workflows/deploy.yml   # main: build + deploy to Pages
src/
  styles/global.css    # Tailwind import + @theme tokens
  data/site.ts         # name, title, description, profiles, email
  lib/paths.ts         # withBase() helper
  layouts/Base.astro   # <head> (SEO/OG), header, footer
  components/          # Header, Footer, ThemeToggle, Card variants, SEO bits
  pages/               # routes listed above
  content/             # collections with placeholder entries
public/                # favicon.svg, og-default image (SVG->PNG placeholder)
docs/                  # this plan + progress notes
AGENTS.md              # conventions for coding agents (un-ignored)
README.md              # local dev + deployment instructions
```

## CI/CD

- `ci.yml` (pull_request + push to non-main): setup pixi → `pixi run install`
  → `pixi run format:check` → `pixi run check` → `pixi run build`.
- `deploy.yml` (push to main): same build, then `actions/deploy-pages`.
  Uses the official `actions/configure-pages`, `upload-pages-artifact`,
  `deploy-pages` flow. Repo setting required once: Pages → Source → GitHub
  Actions.

## Out of scope for this pass

- Real content (bio, publications, images) — placeholders only
- Interactive figures (planned as Astro islands later)
- RSS feed and search (easy follow-ups; RSS noted in AGENTS.md)
- Custom domain DNS setup (documented in README)
