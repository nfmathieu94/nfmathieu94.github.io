/**
 * Site-wide metadata and profile links.
 * This is the single place to update personal details — components and
 * layouts read from here and never hardcode them.
 */
export const SITE = {
  name: "Nathan Mathieu",
  /** Short role line shown in the header/hero. */
  role: "PhD Student · Plant Biology", // [PLACEHOLDER: confirm program name]
  institution: "University of California, Riverside",
  /** Default page description for SEO and social cards. */
  description:
    "Nathan Mathieu — PhD student at UC Riverside studying plant biology. " +
    "Research, software, publications, tutorials, and notes from the bench.",
  email: "nmath020@ucr.edu",
  /** Deployed URL parts come from astro.config.mjs (site + base). */
} as const;

export interface ProfileLink {
  label: string;
  url: string;
  /** Marked true until the real profile URL is filled in. */
  placeholder?: boolean;
}

export const PROFILES: ProfileLink[] = [
  { label: "GitHub", url: "https://github.com/nfmathieu94" },
  {
    label: "Google Scholar",
    url: "https://scholar.google.com/citations?user=PLACEHOLDER",
    placeholder: true,
  },
  {
    label: "ORCID",
    url: "https://orcid.org/0000-0000-0000-0000",
    placeholder: true,
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/PLACEHOLDER",
    placeholder: true,
  },
];

/** Primary navigation, in display order. */
export const NAV = [
  { label: "About", href: "/about/" },
  { label: "Research", href: "/research/" },
  { label: "Software", href: "/software/" },
  { label: "Publications", href: "/publications/" },
  { label: "Teaching", href: "/teaching/" },
  { label: "Blog", href: "/blog/" },
  { label: "Tutorials", href: "/tutorials/" },
  { label: "CV", href: "/cv/" },
] as const;
