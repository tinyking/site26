import { defineCollection, z } from 'astro:content';

const journalCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.string(),
    readTime: z.string(),
    image: z.string(),
    category: z.string(),
    author: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  journal: journalCollection,
};
