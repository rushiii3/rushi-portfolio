import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

export const blogCategoriesEnum = z.enum([
  'Security Tools',
  'Cybersecurity Fundamentals',
  'Security Writeups',
  'Web Security',
  'Vulnerability Research',
  'Penetration Testing',
  'Application Security',
]);

export type BlogCategoryName = z.infer<typeof blogCategoriesEnum>;

const dateSchema = z
  .union([z.string(), z.date()])
  .nullable()
  .optional()
  .transform((val) => {
    if (!val) return undefined;
    if (val instanceof Date) {
      return val.toISOString().split('T')[0];
    }
    return String(val);
  });

const requiredDateSchema = z
  .union([z.string(), z.date()])
  .transform((val) => {
    if (val instanceof Date) {
      return val.toISOString().split('T')[0];
    }
    return String(val);
  });

const blogs = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blogs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: requiredDateSchema,
    dateModified: dateSchema,
    updated: dateSchema,
    category: blogCategoriesEnum,
    keywords: z.array(z.string()).default([]),
    image: z.string(),
    isPillar: z.boolean().optional(),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
    faqSchema: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),
    relatedPosts: z.array(z.string()).optional(),
    relatedProjects: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: requiredDateSchema,
    updated: dateSchema,
    category: z.string(),
    type: z.string().optional(),
    stack: z.array(z.string()),
    github: z.string().optional(),
    link: z.string().optional(),
    image: z.string(),
    relatedPosts: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blogs, projects };
