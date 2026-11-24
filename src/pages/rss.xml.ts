import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllBlogs } from '../lib/content';

export async function GET(context: APIContext) {
  const blogs = await getAllBlogs();
  const site = context.site || 'https://hrushikeshshinde.tech';

  return rss({
    title: 'Hrushikesh Shinde — Cybersecurity Blog',
    description:
      'In-depth technical articles on web security, penetration testing, vulnerability research, and application security by Hrushikesh Shinde.',
    site,
    items: blogs.map((blog) => ({
      title: blog.data.title,
      pubDate: new Date(blog.data.date),
      description: blog.data.description,
      categories: [blog.data.category],
      link: `/blog/${blog.id.replace(/\.mdx$/, '')}`,
    })),
    customData: '<language>en-us</language>',
  });
}
