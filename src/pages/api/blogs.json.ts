import type { APIRoute } from 'astro';
import { getAllBlogs } from '../../lib/content';

export const GET: APIRoute = async () => {
  const blogs = await getAllBlogs();
  const data = blogs.map((b) => ({
    slug: b.id.replace(/\.mdx$/, ''),
    title: b.data.title,
    description: b.data.description,
    date: b.data.date,
    dateModified: b.data.dateModified || b.data.date,
    category: b.data.category,
    image: b.data.image,
    keywords: b.data.keywords,
  }));

  return new Response(JSON.stringify({ blogs: data, total: data.length }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
