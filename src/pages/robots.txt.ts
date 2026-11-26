import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const baseUrl = (site ? site.toString() : (process.env.PUBLIC_URL || 'http://localhost:4321')).replace(/\/$/, '');
  const content = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${baseUrl}/sitemap-index.xml
Sitemap: ${baseUrl}/sitemap-0.xml
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
