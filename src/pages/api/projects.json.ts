import type { APIRoute } from 'astro';
import { getAllProjects } from '../../lib/content';

export const GET: APIRoute = async () => {
  const projects = await getAllProjects();
  const data = projects.map((p) => ({
    slug: p.id.replace(/\.mdx$/, ''),
    title: p.data.title,
    description: p.data.description,
    date: p.data.date,
    category: p.data.category,
    image: p.data.image,
    stack: p.data.stack,
    github: p.data.github,
    link: p.data.link,
  }));

  return new Response(JSON.stringify({ projects: data, total: data.length }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
