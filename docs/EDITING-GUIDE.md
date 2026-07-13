# Editing Guide — for Nathan

A personal map of the site: where everything lives, and exactly how to fill in
each placeholder. You don't need to touch design/layout code — everything you'll
edit is either **data** (`src/data/site.ts`) or **content** (Markdown files under
`src/content/`).

> **Tip:** to find everything left to fill in, run this from the project root:
>
> ```bash
> grep -rn "PLACEHOLDER" src/ public/
> ```
>
> Every unfinished spot is tagged `[PLACEHOLDER: …]`. When you replace one,
> delete the marker text too.

---

## How to work on the site

```bash
cd /bigdata/stajichlab/nmath020/github/github_tools/nathanmathieu.github.io

pixi run dev        # live preview at http://localhost:4321/nathanmathieu.github.io/
                    # edits show up instantly — leave this running while you write
```

When you're done editing, before committing:

```bash
pixi run format     # tidy formatting
pixi run check      # catch typos/mistakes in frontmatter (0 errors = good)
pixi run build      # confirm the site builds
```

Then commit and push to `main` — GitHub Actions deploys automatically.

---

## The big picture: where things live

```text
src/
├── data/site.ts          ← YOUR NAME, EMAIL, LINKS, NAV  (edit this first)
│
├── content/              ← ALL your written content lives here
│   ├── blog/                one .md file per blog post
│   ├── tutorials/           one .md file per tutorial
│   ├── projects/            one .md file per research project
│   ├── software/            one .md file per software tool
│   ├── publications/        one .md file per paper/preprint/poster/talk
│   └── teaching/            one .md file per teaching entry
│
├── pages/                ← page structure (mostly leave alone, except:)
│   ├── index.astro          home page — a few inline blurbs to personalize
│   ├── about.astro          your biography text
│   └── cv.astro             your CV content
│
└── styles/global.css     ← colors & fonts (only if you want to restyle)

public/                   ← drop files here to be served as-is
├── cv.pdf                   (add this) → enables the CV download button
├── favicon.svg             browser-tab icon
└── og-default.svg          image shown when the site is shared on social media
```

**Rule of thumb:** to change _words and facts_, edit `src/data/site.ts` or a file
in `src/content/`. To change _how things look_, that's `src/styles/global.css`
and the components — you rarely need to.

---

## Step 1 — Your identity and links (`src/data/site.ts`)

This one file feeds your name, role, email, and profile links into every page.
Open `src/data/site.ts` and update:

| What                                 | Where in the file           | Notes                                                                                    |
| ------------------------------------ | --------------------------- | ---------------------------------------------------------------------------------------- |
| Role line under your name            | `role:`                     | e.g. `"PhD Student · Botany & Plant Sciences"` — confirm your exact program              |
| Site description (for Google/social) | `description:`              | one or two sentences                                                                     |
| Email                                | `email:`                    | already set to your UCR address                                                          |
| GitHub link                          | `PROFILES` → GitHub         | already set                                                                              |
| Google Scholar                       | `PROFILES` → Google Scholar | replace `PLACEHOLDER` in the URL with your real profile, then delete `placeholder: true` |
| ORCID                                | `PROFILES` → ORCID          | replace the `0000-…` with your ORCID iD, delete `placeholder: true`                      |
| LinkedIn                             | `PROFILES` → LinkedIn       | replace `PLACEHOLDER`, delete `placeholder: true`                                        |

**About the `placeholder: true` flag:** any profile with it shows a small
"(placeholder)" note on the About page and a tooltip in the footer. Once you put
in the real URL, remove that line so the note disappears. To add another profile
(Bluesky, Mastodon, ResearchGate…), copy one of the existing entries in the
`PROFILES` list.

To change the top navigation menu, edit the `NAV` list in the same file.

---

## Step 2 — Home page personal blurbs (`src/pages/index.astro`)

The home page has four short bits of text to make your own. Search the file for
`PLACEHOLDER`:

1. **Positioning statement** (near the top) — the one/two-sentence intro under
   "Hi, I'm Nathan."
2. **Three "Current focus" cards** — short lines for _Research_, _Building_, and
   _Writing_. Replace the text inside each `<p class="text-ink-muted">…</p>`.

Everything else on the home page (selected projects, recent writing) fills in
automatically from your content files — see below.

---

## Step 3 — About page (`src/pages/about.astro`)

Three placeholders here, all inside the `.prose` section:

1. **Biography** — replace the paragraph with 2–3 paragraphs about your path into
   plant biology, prior training, and what brought you to UCR.
2. **Research interests** — edit the bullet list (`<li>` items).
3. **Beyond the bench** — an optional human note (teaching, outreach, hobbies).

Your contact email and profile links in the sidebar come from
`src/data/site.ts` automatically — no need to edit them here.

---

## Step 4 — Your CV (`src/pages/cv.astro`)

1. **PDF download:** put your CV file at `public/cv.pdf`. The "Download PDF"
   button then works automatically (the file path is already wired up).
2. **On-page CV summary:** fill in the placeholder list items under _Education_,
   _Research experience_, _Selected skills_, and _Awards & honors_.

---

## Step 5 — Your content collections (`src/content/…`)

This is where most of your ongoing updates happen. **Each entry is one Markdown
file.** The filename becomes the web address (the "slug"), so name files in
lowercase with hyphens, e.g. `arabidopsis-pangenome.md`.

Every file starts with a **frontmatter** block between `---` lines (the
structured fields), followed by optional body text in Markdown. The fields are
checked automatically when you run `pixi run check` or `pixi run build`, so if
you mistype a field name or forget a required one, you'll get a clear error.

There are placeholder example files already in each folder — the easiest way to
add a real entry is to **copy an example, rename it, and edit it.** Delete the
example files once you have real content.

### Blog posts → `src/content/blog/`

```markdown
---
title: "Your post title"
description: "One-sentence summary (shows in the list and when shared)."
pubDate: 2026-08-01
tags: ["genomics", "notes"]
draft: false
---

Write your post here in Markdown. Headings, **bold**, lists, links,
and code blocks all work.
```

- Required: `title`, `description`, `pubDate`. Optional: `tags`, `updatedDate`,
  `draft`.
- Set `draft: true` to keep a post hidden until you're ready.
- Rename the file to `.mdx` if you want to embed interactive components later.
- Placeholder to replace/delete: `src/content/blog/welcome.md`.

### Tutorials → `src/content/tutorials/`

Same as blog posts, plus a required `difficulty` field:

```markdown
---
title: "Calling variants with X"
description: "A short, reproducible walkthrough."
pubDate: 2026-08-01
difficulty: "beginner" # beginner | intermediate | advanced
tags: ["bioinformatics"]
draft: false
---

Step-by-step content here.
```

- Placeholder to replace/delete: `src/content/tutorials/getting-started.md`.

### Research projects → `src/content/projects/`

```markdown
---
title: "Comparative Plant Genomics"
summary: "One or two sentences: the question and why it matters."
status: "active" # active | completed | planned
tags: ["genomics", "comparative"]
order: 1 # lower numbers show first
links:
  repo: "https://github.com/nfmathieu94/your-repo"
  preprint: "https://doi.org/…" # optional
  data: "https://…" # optional
---
```

- Required: `title`, `summary`, `status`. `links` is optional — omit any you
  don't have.
- `order` controls the sort on the Research page and which two show on the home
  page (the two lowest `order` numbers).
- Placeholders to replace/delete: `example-project.md`, `second-project.md`.

### Software → `src/content/software/`

```markdown
---
name: "toolname"
summary: "What it does and who it's for, in one line."
repo: "https://github.com/nfmathieu94/toolname"
docs: "https://…" # optional
language: "Python"
status: "active" # active | stable | archived
order: 1
---
```

- Required: `name`, `summary`, `repo`, `language`, `status`.
- Placeholder to replace/delete: `example-tool.md`.

### Publications → `src/content/publications/`

```markdown
---
title: "Full title of the paper"
authors: ["Mathieu, Nathan", "Coauthor, A.", "Advisor, B."]
venue: "Journal or Conference Name"
year: 2026
type: "article" # article | preprint | poster | talk
doi: "10.1234/xyz" # optional — just the DOI, no https://
pdf: "https://…" # optional
code: "https://…" # optional
highlight: true # true = also feature on other pages
---

Optional abstract or notes.
```

- Your name (exactly `"Mathieu, Nathan"`, matching `SITE.name`) is automatically
  **bolded** in the author list.
- Publications are grouped by `year` automatically, newest first.
- Placeholder to replace/delete: `example-publication.md`.

### Teaching → `src/content/teaching/`

```markdown
---
role: "Teaching Assistant"
course: "Introduction to Bioinformatics"
institution: "University of California, Riverside"
term: "2026 Spring"
description: "One or two sentences about your role."
---
```

- All fields required.
- Entries sort by `term` (newest first), so keep the format consistent
  (e.g. `"2026 Spring"`, `"2025 Fall"`).
- Placeholder to replace/delete: `example-teaching.md`.

---

## Adding images

Put image files in `public/` (e.g. `public/images/my-figure.png`), then
reference them in Markdown with the site base path:

```markdown
![Description of the image](/nathanmathieu.github.io/images/my-figure.png)
```

> The `/nathanmathieu.github.io/` prefix is needed because the site is hosted
> under that subpath. Once you move to a custom domain (e.g. nathanmathieu.com),
> that prefix goes away — see the README's custom-domain section.

Always include the alt text (the part in `[ … ]`) for accessibility.

---

## Changing colors or fonts (optional)

Only if you want to. Everything visual is controlled from the top of
`src/styles/global.css`:

- **Colors:** the `:root { … }` block (light theme) and `[data-theme="dark"]`
  block (dark theme). Each color is a named variable with a comment. Change a hex
  value and every element using it updates.
- **Fonts:** the `--font-display`, `--font-sans`, and `--font-mono` lines in the
  `@theme inline` block. (Changing to a new font also means installing its
  `@fontsource` package — ask your future self or an agent to help.)

---

## Quick reference: "I want to…"

| I want to…                                  | Edit this                                    |
| ------------------------------------------- | -------------------------------------------- |
| Fix my name, role, email, or a profile link | `src/data/site.ts`                           |
| Change the nav menu                         | `src/data/site.ts` (`NAV`)                   |
| Write my bio                                | `src/pages/about.astro`                      |
| Add my CV PDF                               | drop it at `public/cv.pdf`                   |
| Fill in CV details                          | `src/pages/cv.astro`                         |
| Personalize the home-page blurbs            | `src/pages/index.astro`                      |
| Add a blog post                             | new file in `src/content/blog/`              |
| Add a tutorial                              | new file in `src/content/tutorials/`         |
| Add a research project                      | new file in `src/content/projects/`          |
| Add a software tool                         | new file in `src/content/software/`          |
| Add a publication                           | new file in `src/content/publications/`      |
| Add a teaching entry                        | new file in `src/content/teaching/`          |
| Add an image                                | put it in `public/`, link with the base path |
| Change colors/fonts                         | `src/styles/global.css`                      |
| Find everything still unfilled              | `grep -rn "PLACEHOLDER" src/ public/`        |

---

_Deeper technical conventions (for coding agents and future you) are in
`AGENTS.md`. Setup and deployment instructions are in `README.md`._
