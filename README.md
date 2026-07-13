# nathanmathieu.github.io

Personal academic website for **Nathan Mathieu** — PhD student in plant biology
at UC Riverside. Built with Astro, TypeScript, and Tailwind CSS; content is
authored in Markdown/MDX and deployed to GitHub Pages via GitHub Actions.

## Tech stack

| Concern     | Tool                                         |
| ----------- | -------------------------------------------- |
| Framework   | [Astro](https://astro.build) (static output) |
| Language    | TypeScript (strict)                          |
| Styling     | Tailwind CSS 4 (`@tailwindcss/vite`)         |
| Content     | Markdown / MDX content collections           |
| Fonts       | Self-hosted via `@fontsource` (no CDN)       |
| Environment | [pixi](https://pixi.sh) (provides Node.js)   |
| CI/CD       | GitHub Actions                               |
| Hosting     | GitHub Pages                                 |

Node.js is managed **inside** the pixi environment, so you don't need a system
Node install. All npm packages live in `node_modules/` in this repo.

## Prerequisites

- [pixi](https://pixi.sh/latest/#installation) installed and on your `PATH`.

That's it — pixi installs the correct Node.js version for you.

## Local development

```bash
# 1. Create the pixi environment (installs Node.js)
pixi install

# 2. Install npm dependencies
pixi run install

# 3. Start the dev server (http://localhost:4321/nathanmathieu.github.io/)
pixi run dev
```

### Common tasks

All tasks run through pixi so everyone uses the same toolchain:

| Command                 | What it does                                    |
| ----------------------- | ----------------------------------------------- |
| `pixi run dev`          | Start the local dev server with hot reload      |
| `pixi run build`        | Production build into `dist/`                   |
| `pixi run preview`      | Serve the production build locally              |
| `pixi run check`        | Type-check + validate templates (`astro check`) |
| `pixi run format`       | Auto-format with Prettier                       |
| `pixi run format-check` | Verify formatting (used in CI)                  |
| `pixi run ci-install`   | Reproducible install from the lockfile (CI)     |

Before opening a PR, run:

```bash
pixi run format
pixi run check
pixi run build
```

## Editing content

> **New here / just want to fill in your details?** See
> [`docs/EDITING-GUIDE.md`](docs/EDITING-GUIDE.md) — a plain-language, task-oriented
> walkthrough of where everything lives and how to replace each placeholder.

Content is intentionally separated from layout so you can update it without
touching components.

- **Site metadata & profile links** — `src/data/site.ts`
  (name, role, email, GitHub/Scholar/ORCID/LinkedIn links, navigation).
- **Collections** — Markdown/MDX files under `src/content/<collection>/`:
  - `blog/` — posts (`title`, `description`, `pubDate`, `tags`, `draft`)
  - `tutorials/` — tutorials (adds a `difficulty` field)
  - `projects/` — research projects
  - `software/` — software / GitHub projects
  - `publications/` — publications, preprints, posters, talks
  - `teaching/` — teaching and technical writing
- **CV** — edit `src/pages/cv.astro`; drop a PDF at `public/cv.pdf` to enable
  the download button.

Frontmatter is validated against typed schemas in `src/content.config.ts`. If a
required field is missing or has the wrong type, the build fails with a clear
error. Placeholder content is marked with `[PLACEHOLDER: …]`.

To add a blog post, create `src/content/blog/my-post.md`:

```markdown
---
title: "My post title"
description: "One-sentence summary for listings and social cards."
pubDate: 2026-08-01
tags: ["genomics"]
draft: false
---

Your Markdown here. Rename the file to `.mdx` to embed components.
```

The filename (minus extension) becomes the URL slug. Set `draft: true` to keep
a post out of the production build.

## Deployment

Deployment is automated by `.github/workflows/deploy.yml` on every push to
`main`.

**One-time setup** (in the GitHub repo):

1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.

The workflow reads the base path from GitHub's `configure-pages` action, so the
site works whether it's served from the project subpath or a custom domain.

### Custom domain (e.g. nathanmathieu.com)

1. Add a file `public/CNAME` containing just the domain, e.g. `nathanmathieu.com`.
2. In **Settings → Pages → Custom domain**, enter the same domain and save.
3. At your DNS provider, add the records GitHub shows (an `ALIAS`/`ANAME` or
   four `A` records for the apex, plus a `CNAME` for `www`).
4. Once DNS resolves, enable **Enforce HTTPS**.

With a custom domain, `configure-pages` reports an empty base path, so internal
links automatically drop the `/nathanmathieu.github.io` prefix — no code change
needed.

## Project structure

```text
astro.config.mjs        # site/base URL, MDX, sitemap, Tailwind
pixi.toml               # Node.js + task definitions
package.json            # npm dependencies and scripts
src/
  data/site.ts          # site metadata, profiles, nav (edit me)
  lib/paths.ts          # withBase() + date helpers
  styles/global.css     # palette tokens + Tailwind + prose styles
  layouts/              # Base (head/SEO), Article (posts/tutorials)
  components/           # Header, Footer, cards, page intro, leaf divider
  pages/                # routes (about, research, software, blog, ...)
  content/              # Markdown/MDX collections (edit me)
  content.config.ts     # typed collection schemas
public/                 # favicon, social image, (optional) CNAME + cv.pdf
docs/                   # design plan and progress notes
AGENTS.md               # conventions for coding agents
```

## License

Content © Nathan Mathieu. See `AGENTS.md` for contribution conventions.
