/**
 * Photos for the About-page deck (rendered by PhotoDeck.astro).
 *
 * To add your own: drop image files (JPG/PNG/WebP, portrait ~4:5 works best)
 * in `public/images/about/` and list them here, top of the array shows first.
 * Keep `src` starting with "/" — the component runs it through withBase().
 * Delete the placeholder entries (and their SVG files) once real photos exist.
 */
export interface AboutPhoto {
  /** Path under public/, starting with "/". */
  src: string;
  /** Meaningful alt text for screen readers. */
  alt: string;
  /** Optional short caption shown under the photo. */
  caption?: string;
}

export const ABOUT_PHOTOS: AboutPhoto[] = [
  {
    // [PLACEHOLDER: replace with a real photo, e.g. /images/about/field.jpg]
    src: "/images/about/placeholder-fern.svg",
    alt: "Placeholder illustration of a pressed fern specimen",
    caption: "Pressed fern — swap me for a real photo",
  },
  {
    // [PLACEHOLDER: replace with a real photo]
    src: "/images/about/placeholder-field.svg",
    alt: "Placeholder illustration of hills at dusk",
    caption: "Field site at dusk — swap me too",
  },
  {
    // [PLACEHOLDER: replace with a real photo]
    src: "/images/about/placeholder-night.svg",
    alt: "Placeholder illustration of a fiddlehead under a starry sky",
    caption: "Night in the field — and me as well",
  },
];
