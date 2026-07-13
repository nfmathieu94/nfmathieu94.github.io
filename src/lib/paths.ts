/**
 * Prefix an internal path with the configured base path.
 * Required because the site currently deploys as a GitHub project page
 * under /nathanmathieu.github.io/ — see astro.config.mjs.
 *
 * Always use this for internal <a href> and asset references:
 *   <a href={withBase("/blog/")}>Blog</a>
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Format a date for display, e.g. "12 Jul 2026". */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
