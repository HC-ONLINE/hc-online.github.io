import { defineCollection, z } from "astro:content";

const pagesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    subtitle: z.string(),
    stack: z.string(),
    github: z.string().url().optional(),
    site: z.string().url().optional(),
  }),
});

export const collections = {
  pages: pagesCollection,
  projects: projectsCollection,
};
