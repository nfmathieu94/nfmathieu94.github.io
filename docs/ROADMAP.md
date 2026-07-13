# Roadmap & Ideas — making the site more distinctive, interactive, and fun

A living list of upgrades, from quick polish to bigger features (React
components, interactive figures). Nothing here is required — it's a menu. Each
item notes roughly how hard it is and why it's worth doing, and points at the
files or packages involved so future-you (or a coding agent) can pick it up.

**Effort key:** 🟢 an afternoon · 🟡 a day or two · 🔴 a weekend project.

Guiding principle: the site already has a strong, specific identity (the
"herbarium" theme — pressed-paper palette, specimen cards, leaf-vein divider,
Fraunces display serif). The best upgrades **lean into that** rather than bolting
on generic portfolio features. Fewer, more intentional touches beat a pile of
widgets.

---

## 1. Quick wins (high impact, low effort)

These sharpen the site without new infrastructure.

- 🟢 **RSS feed** for the blog (and maybe tutorials). Scholars and colleagues
  subscribe in readers. Add `@astrojs/rss`, create `src/pages/rss.xml.ts`, and
  link it in `Base.astro`'s `<head>`. Listed as a follow-up in `AGENTS.md`.
- 🟢 **Reading time** on posts/tutorials. Compute from word count and show it
  next to the date in `Article.astro`. Small, but a nice touch readers notice.
- 🟢 **Tag index pages** (`/tags/genomics/`, etc.). You already store `tags[]` on
  posts, tutorials, and projects — surface them as clickable filters. Use
  `getStaticPaths()` to generate one page per tag.
- 🟢 **Prev/next navigation** at the bottom of posts and tutorials, so browsing
  feels continuous instead of dead-ending.
- 🟢 **"Updated on" transparency** — you already support `updatedDate`; add a
  subtle "last tended" line. (On-theme: a garden is maintained, not published.)
- 🟢 **Per-page Open Graph images** metadata polish — right now every page shares
  `og-default.svg`. Even just varying the OG `title`/`description` per collection
  entry (already partly done) helps link previews. The generated-image version
  is in §4.
- 🟢 **404 personality** — the 404 page is already themed ("This trail ends
  here"); consider adding a couple of real links (recent posts, home, search)
  so a dead end becomes a soft landing.
- 🟢 **`prefers-reduced-motion` audit** — the global stylesheet already respects
  it; keep honoring it for any new animations (see §2).

---

## 2. Distinctive & fun — lean into the botanical identity

This is where the site becomes _yours_ and memorable. Pick one or two; don't do
all of them or it gets busy.

- 🟡 **A signature hero moment.** The home page is clean but static. A single,
  tasteful load animation — staggered fade-up of the intro lines and the leaf
  divider "growing" in — creates delight without noise. Pure CSS
  (`@keyframes` + `animation-delay`), gated behind `prefers-reduced-motion`.
- 🟡 **Botanical section dividers / textures.** You have one leaf-vein divider;
  build a small family (a vine, a spore print, a frond) as inline SVGs and rotate
  them between sections. Consider a very subtle pressed-paper grain as a tiling
  SVG/data-URI background on `--paper` (kept faint so text stays crisp).
- 🟡 **Specimen-tag detail on cards.** Your project/software cards already read
  like herbarium specimen sheets. Push it: a faux "accession number," a
  collected-date, a tiny corner fold, or a botanical-illustration accent. Turns a
  card grid into something people actually enjoy looking at.
- 🟡 **Seasonal or time-of-day accent.** A gentle, optional idea: shift the
  accent hue subtly by season (spring green → summer → autumn lichen-gold →
  winter pine) using a date check in `site.ts`. Playful, thematically perfect,
  and invisible until someone notices.
- 🟡 **Hand-drawn / illustrated touches.** A single custom botanical line
  illustration (yours, or commissioned) on the home or about page does more for
  "distinctive, not AI-generated" than any amount of CSS. High impact if you
  enjoy drawing or know an illustrator.
- 🟢 **Link hover microinteractions.** The `.link-vine` underline already
  thickens on hover; a tiny leaf or sprout that unfurls on nav hover would be a
  signature flourish. Keep it CSS-only and subtle.
- 🟡 **Dark-mode as "night in the field."** The dark theme is already good;
  consider giving it a slightly distinct personality (warmer paper, a faint
  star/spore fleck texture) so toggling feels like a scene change, not just an
  inversion.

---

## 3. Interactivity — React components & interactive figures

The site is currently 100% static HTML/CSS, which is _ideal_ — it's fast and
simple. Astro's **islands architecture** lets you add interactivity exactly where
you want it, without turning the whole site into a heavy single-page app. You opt
in per component.

### 3.1 Enabling React (or any UI framework) 🟡

Astro supports React, Preact, Svelte, Vue, and Solid as "islands." To add React:

```bash
pixi run npx astro add react
# installs @astrojs/react + react + react-dom and wires astro.config.mjs
```

Then write a normal React component in `src/components/`, and use it inside any
`.astro` page with a **client directive** that controls when it hydrates:

```
---
import Chart from "../components/Chart.tsx";
---

<!-- ships JS and becomes interactive only for this component -->
<Chart client:visible data={chartData} />
```

Client directives (choose the lightest that works):

| Directive        | Hydrates…                         | Use for                           |
| ---------------- | --------------------------------- | --------------------------------- |
| `client:load`    | immediately on page load          | above-the-fold, always-needed UI  |
| `client:idle`    | when the browser is idle          | non-urgent widgets                |
| `client:visible` | when scrolled into view           | **figures/charts below the fold** |
| `client:only`    | skips server render (client-only) | libraries that need `window`      |

For figures further down the page, `client:visible` is almost always the right
call — the chart's JS doesn't load until the reader scrolls to it.

> **Preact is a lighter alternative** (~3 kB vs React's ~45 kB) if you only need
> lightweight interactivity and don't depend on the React ecosystem. `astro add
preact`. You can even switch later; the JSX is nearly identical.

### 3.2 Interactive figures — options by need 🟡🔴

Your research is genomics/plant biology, so figures matter. Some good fits:

- **Observable Plot** or **Vega-Lite** — concise, declarative, great for
  scientific charts; render into a React island. 🟡
- **D3** — maximum control for bespoke/animated visualizations (phylogenies,
  genome tracks). More effort, highest ceiling. 🔴
- **Plotly** — quick interactive scientific plots (zoom/pan/hover) with little
  code; heavier bundle, so isolate it behind `client:visible`. 🟡
- **Nivo / Recharts** — polished React chart libraries for dashboards-style
  figures. 🟡

Recommended pattern regardless of library:

1. Keep the **data** in a separate file (`src/data/` or a JSON/CSV in `public/`)
   so figures stay content-like and easy to update.
2. Put the **figure component** in `src/components/figures/`.
3. Embed it in an `.mdx` post/tutorial or a project page with `client:visible`.
4. Provide a **static fallback** (a caption, a table, or a pre-rendered image)
   for accessibility and no-JS readers — important for a scientific audience.

> Switching a blog/tutorial file from `.md` to `.mdx` (already supported) is what
> lets you drop `<Figure />` components directly into prose.

### 3.3 Fun interactive ideas that fit the theme 🟡

- **Interactive phylogeny / tree-of-interests** — a small clickable tree on the
  about or research page instead of a bullet list. On-brand for a plant
  biologist.
- **A "specimen viewer"** for a project — toggle between views (map, data,
  method) inside one card.
- **Genome/sequence mini-widgets** in tutorials — e.g., a small interactive
  alignment or coverage track that readers can scrub.
- **Command-line playground** — a styled, fake terminal that "types out" a
  reproducible workflow step by step. Ties your HPC/bioinformatics work to the
  site's voice.

### 3.4 Keep the discipline 🟢

- Default to static. Add an island only when interactivity earns its bytes.
- Always gate motion behind `prefers-reduced-motion`.
- Always give figures a text/table/image fallback.
- Watch the JS budget — run `pixi run build` and check the reported bundle
  sizes; a personal site should stay light.

---

## 4. Content & scholarly upgrades

Features that make the site more useful to an academic audience.

- 🟡 **Auto-generated OG images** per post/publication (title + herbarium motif),
  using `@astrojs/og` or Satori. Makes every shared link look bespoke.
- 🟡 **Publications from BibTeX/CSL.** If you maintain a `.bib` file, generate the
  `publications` collection from it so you have one source of truth. Optional
  "Cite this" (BibTeX/RIS) buttons per entry.
- 🟢 **ORCID / Scholar sync note.** At minimum, keep `src/data/site.ts` links
  real (tracked as placeholders now). A periodic manual sync is fine; automated
  fetching is possible but rarely worth it.
- 🟡 **Client-side search** over posts/tutorials with **Pagefind** (built for
  static Astro sites — indexes at build time, tiny runtime). Great once you have
  a dozen+ pages.
- 🟢 **Series / collections of posts** — group multi-part tutorials so readers
  can follow a sequence.
- 🟡 **"Now" / research-log page** — an informal, frequently-updated page about
  what you're working on this month. Low-pressure, high-personality, and it keeps
  the site feeling alive between polished posts.
- 🟢 **Footnotes & citations in prose** — enable via a remark/rehype plugin so
  posts can cite properly. Fits the scholarly tone.
- 🟡 **Math rendering** (KaTeX via `rehype-katex`) if any posts need equations.
- 🟢 **Syntax-highlight themes** — Astro's Shiki is built in; pick/customize a
  code theme that matches the herbarium palette so code blocks feel designed.

---

## 5. Performance, SEO, accessibility

Mostly already solid — these keep it that way as the site grows.

- 🟢 **Astro `<Image />` / image optimization** — when you add real photos or
  figures, use Astro's built-in image component for responsive, compressed
  output instead of raw `<img>`.
- 🟢 **JSON-LD structured data** — add `Person` and `ScholarlyArticle`
  schema.org markup in `Base.astro` / publication pages so Google shows richer
  results. Meaningful for name-search discoverability.
- 🟢 **Lighthouse / a11y pass in CI** — add Lighthouse CI or `axe` checks to the
  GitHub Actions workflow to catch regressions in performance/contrast/labels.
- 🟢 **Sitemap is already generated**; submit it to Google Search Console once the
  custom domain is live.
- 🟢 **Skip-link, semantic landmarks, ARIA states** already in place — maintain
  the bar for any new interactive components (focus states, keyboard nav,
  labels).
- 🟢 **Font subsetting** — `@fontsource` ships full character sets; if you never
  use Cyrillic/Vietnamese glyphs, importing only the `latin` subset trims the
  woff2 payload noticeably.

---

## 6. Infrastructure & tooling

- 🟢 **ESLint** (with `eslint-plugin-astro`) alongside Prettier, wired into CI —
  catches bugs Prettier can't. Add a `pixi run lint` task.
- 🟢 **Lint-staged + a git pre-commit hook** (or a `pixi` task) so `format` and
  `check` run automatically before each commit.
- 🟡 **PR preview deploys** — deploy each PR to a temporary URL so you can see
  changes before merging. Cloudflare Pages / Netlify do this natively; on GitHub
  Pages it's more work, so this may be a reason to consider a different host
  later.
- 🟢 **Dependabot / Renovate** — automated dependency-update PRs so Astro,
  Tailwind, etc. stay current without manual chasing.
- 🟡 **Analytics (privacy-friendly)** — if you want visitor stats without
  surveillance-ware, self-hosted **Plausible** or **Umami**, or Cloudflare Web
  Analytics. Skip Google Analytics.
- 🟢 **Custom domain** (`nathanmathieu.com`) — steps already in the README; this
  is the single highest-impact "upgrade" for a professional presence, and it also
  simplifies the base-path handling.
- 🟡 **Consider the host tradeoff.** GitHub Pages is free and simple but
  static-only with no preview deploys. If you later want serverless functions
  (contact form, view counts, on-demand OG images) or PR previews, Cloudflare
  Pages or Netlify are easy migrations — Astro supports both with an adapter.

---

## Suggested order (if you want a path)

1. **Custom domain** + fill in placeholders (see `EDITING-GUIDE.md`). Foundation.
2. **RSS + tag pages + prev/next** — cheap, and they make the blog feel real.
3. **One signature botanical flourish** (hero animation or specimen-card detail)
   — the identity payoff.
4. **Add React/Preact and your first interactive figure** in a tutorial, using
   `client:visible` with a static fallback.
5. **Pagefind search + auto OG images** once you have enough content to warrant
   them.
6. **ESLint + Dependabot + analytics** — keep it healthy long-term.

Revisit this file whenever you finish something or get a new idea — it's meant to
grow with the site.
