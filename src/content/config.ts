import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.string(),
    status: z.enum(['shipped', 'prototype', 'internal']).default('shipped'),
    themes: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    evidence: z.array(z.string()).default([]),
    links: z
      .object({
        repo: z.string().url().optional(),
        demo: z.string().url().optional(),
        post: z.string().url().optional(),
      })
      .default({}),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    cover: z.string().optional(),
    sanitized: z.boolean().default(false),
  }),
});

export const collections = { projects };
