import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const GET: APIRoute = ({ site }) => {
  const baseUrl = (site ? site.toString() : (process.env.PUBLIC_URL || 'http://localhost:4321')).replace(/\/$/, '');

  // If built sitemap-index.xml exists, serve it directly
  const distIndex = path.resolve('dist/sitemap-index.xml');
  if (fs.existsSync(distIndex)) {
    return new Response(fs.readFileSync(distIndex, 'utf-8'), {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  }

  // Fallback for dev mode: valid sitemap index pointing to sitemap-0.xml
  const xml = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="${baseUrl}/sitemap.xsl"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${baseUrl}/sitemap-0.xml</loc><lastmod>${new Date().toISOString()}</lastmod></sitemap></sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
