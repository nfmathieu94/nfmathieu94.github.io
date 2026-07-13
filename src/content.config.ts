import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const tutorials = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/tutorials" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    difficulty: z.enum(["beginner", "intermediate", "advanced"]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(["active", "completed", "planned"]),
    tags: z.array(z.string()).default([]),
    /** Lower numbers appear first. */
    order: z.number().default(99),
    links: z
      .object({
        repo: z.string().url().optional(),
        preprint: z.string().url().optional(),
        data: z.string().url().optional(),
      })
      .default({}),
  }),
});

const software = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/software" }),
  schema: z.object({
    name: z.string(),
    summary: z.string(),
    repo: z.string().url(),
    docs: z.string().url().optional(),
    language: z.string(),
    status: z.enum(["active", "stable", "archived"]),
    order: z.number().default(99),
  }),
});

const publications = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/publications",
  }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    year: z.number().int(),
    type: z.enum(["article", "preprint", "poster", "talk"]),
    doi: z.string().optional(),
    pdf: z.string().url().optional(),
    code: z.string().url().optional(),
    /** Featured on the home page when true. */
    highlight: z.boolean().default(false),
  }),
});

const teaching = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/teaching" }),
  schema: z.object({
    role: z.string(),
    course: z.string(),
    institution: z.string(),
    term: z.string(),
    description: z.string(),
  }),
});

export const collections = {
  blog,
  tutorials,
  projects,
  software,
  publications,
  teaching,
};
