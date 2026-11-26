import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap, { ChangeFreqEnum, type SitemapItem } from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

try {
  process.loadEnvFile();
} catch {}

const site = process.env.PUBLIC_URL || process.env.SITE_URL || 'http://localhost:4321';

function getContentDates(dir: string): Record<string, string> {
  const dates: Record<string, string> = {};
  try {
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith('.mdx')) continue;
      const content = fs.readFileSync(path.join(dir, f), 'utf-8');
      const slug = f.replace(/\.mdx$/, '');
      const dateMatch = content.match(/date:\s*['"]?([^'"\n]+)['"]?/);
      const modMatch = content.match(/dateModified:\s*['"]?([^'"\n]+)['"]?/);
      const d = modMatch ? modMatch[1] : (dateMatch ? dateMatch[1] : null);
      if (d) dates[slug] = new Date(d).toISOString();
    }
  } catch {}
  return dates;
}

const blogDates = getContentDates('src/content/blogs');
const projectDates = getContentDates('src/content/projects');

// https://astro.build/config
export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
      wrap: true,
    },
    processor: unified({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
          },
        ],
      ],
    }),
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
        !page.includes('/404') &&
        !page.includes('/api/'),
      xslURL: '/sitemap.xsl',
      serialize(item: SitemapItem): SitemapItem | undefined {
        const url = item.url.replace(/\/$/, '');
        const isRoot = item.url === site || item.url === `${site}/` || url === site.replace(/\/$/, '');

        if (isRoot) {
          item.priority = 1.0;
          item.changefreq = ChangeFreqEnum.WEEKLY;
          item.lastmod = new Date().toISOString();
          return item;
        }

        if (url.endsWith('/blog')) {
          item.priority = 0.9;
          item.changefreq = ChangeFreqEnum.DAILY;
          item.lastmod = new Date().toISOString();
          return item;
        }

        if (url.includes('/blog/category/')) {
          item.priority = 0.8;
          item.changefreq = ChangeFreqEnum.WEEKLY;
          item.lastmod = new Date().toISOString();
          return item;
        }

        if (url.includes('/blog/')) {
          const slug = url.split('/blog/')[1]?.replace(/\/$/, '');
          item.priority = 0.8;
          item.changefreq = ChangeFreqEnum.MONTHLY;
          if (slug && blogDates[slug]) {
            item.lastmod = blogDates[slug];
          }
          return item;
        }

        if (url.endsWith('/work')) {
          item.priority = 0.8;
          item.changefreq = ChangeFreqEnum.MONTHLY;
          item.lastmod = new Date().toISOString();
          return item;
        }

        if (url.includes('/work/')) {
          const slug = url.split('/work/')[1]?.replace(/\/$/, '');
          item.priority = 0.7;
          item.changefreq = ChangeFreqEnum.MONTHLY;
          if (slug && projectDates[slug]) {
            item.lastmod = projectDates[slug];
          }
          return item;
        }

        if (url.endsWith('/about') || url.endsWith('/experience')) {
          item.priority = 0.6;
          item.changefreq = ChangeFreqEnum.MONTHLY;
          return item;
        }

        item.priority = 0.5;
        item.changefreq = ChangeFreqEnum.MONTHLY;
        return item;
      },
    }),
    {
      name: 'sitemap-alias',
      hooks: {
        'astro:server:setup': ({ server }) => {
          server.middlewares.use((req, res, next) => {
            const rawUrl = req.url?.split('?')[0];
            if (rawUrl === '/sitemap.xml' || rawUrl === '/sitemap-index.xml') {
              const indexPath = path.resolve('dist/sitemap-index.xml');
              if (fs.existsSync(indexPath)) {
                res.setHeader('Content-Type', 'application/xml; charset=utf-8');
                return res.end(fs.readFileSync(indexPath));
              }
              const xml = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="${site}/sitemap.xsl"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${site}/sitemap-0.xml</loc><lastmod>${new Date().toISOString()}</lastmod></sitemap></sitemapindex>`;
              res.setHeader('Content-Type', 'application/xml; charset=utf-8');
              return res.end(xml);
            }
            if (rawUrl === '/sitemap-0.xml') {
              const chunkPath = path.resolve('dist/sitemap-0.xml');
              if (fs.existsSync(chunkPath)) {
                res.setHeader('Content-Type', 'application/xml; charset=utf-8');
                return res.end(fs.readFileSync(chunkPath));
              }
            }
            next();
          });
        },
        'astro:build:done': async ({ dir }) => {
          const destDir = fileURLToPath(dir);
          const indexPath = path.join(destDir, 'sitemap-index.xml');
          const sitemapPath = path.join(destDir, 'sitemap.xml');
          if (fs.existsSync(indexPath)) {
            fs.copyFileSync(indexPath, sitemapPath);
          }
        },
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
    css: {
      postcss: {
        plugins: [],
      },
    },
  },
});
