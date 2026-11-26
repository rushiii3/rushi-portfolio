import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blogs'>;
export type ProjectPost = CollectionEntry<'projects'>;

/**
 * Get all published blogs sorted by publication date descending.
 */
export async function getAllBlogs(): Promise<BlogPost[]> {
  const blogs = await getCollection('blogs', ({ data }) => !data.draft);
  return blogs.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
}

/**
 * Get a single blog by its slug (filename without .mdx extension).
 */
export async function getBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  const blogs = await getAllBlogs();
  return blogs.find((blog) => blog.id === slug || blog.id === `${slug}.mdx`);
}

/**
 * Get all published projects sorted by publication date descending.
 */
export async function getAllProjects(): Promise<ProjectPost[]> {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  return projects.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
}

/**
 * Get a single project by its slug.
 */
export async function getProjectBySlug(slug: string): Promise<ProjectPost | undefined> {
  const projects = await getAllProjects();
  return projects.find((proj) => proj.id === slug || proj.id === `${slug}.mdx`);
}

/**
 * Calculate related blogs based on category match and shared keywords.
 */
export async function getRelatedBlogs(
  currentSlug: string,
  category: string,
  keywords: string[] = [],
  limit = 3
): Promise<BlogPost[]> {
  const allBlogs = await getAllBlogs();
  const normalizedKeywords = (keywords || []).map((k) => k.toLowerCase().trim());

  const scored = allBlogs
    .filter((b) => b.id !== currentSlug && b.id !== `${currentSlug}.mdx`)
    .map((blog) => {
      let score = 0;
      if (blog.data.category.toLowerCase() === category.toLowerCase()) {
        score += 3;
      }
      const postKeywords = (blog.data.keywords || []).map((k) => k.toLowerCase().trim());
      const commonKeywords = postKeywords.filter((k) => normalizedKeywords.includes(k));
      score += commonKeywords.length;

      return { blog, score };
    });

  return scored
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.blog.data.date).getTime() - new Date(a.blog.data.date).getTime();
    })
    .slice(0, limit)
    .map((s) => s.blog);
}

/**
 * Get all blogs in a named series sorted by seriesOrder.
 */
export async function getSeriesBlogs(seriesName?: string): Promise<BlogPost[]> {
  if (!seriesName) return [];
  const allBlogs = await getAllBlogs();
  return allBlogs
    .filter((b) => b.data.series && b.data.series.toLowerCase() === seriesName.toLowerCase())
    .sort((a, b) => (a.data.seriesOrder ?? 0) - (b.data.seriesOrder ?? 0));
}

/**
 * Lightweight reading time calculator (~200 words per minute).
 */
export function calculateReadingMinutes(rawContent?: string): number {
  if (!rawContent) return 1;
  const words = rawContent.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

/**
 * Extract image URLs from markdown content for ImageObject schema.
 */
export function extractContentImages(content?: string): string[] {
  if (!content) return [];
  const matches = [...content.matchAll(/!\[.*?\]\((https?:\/\/[^\s\)]+)/g)];
  return [...new Set(matches.map((m) => m[1]))];
}

/**
 * Resolve previous and next blog posts for sequential reading.
 */
export function resolveBlogNavigation(
  blogs: BlogPost[],
  slug: string
): {
  previous: { slug: string; title: string; date: string } | null;
  next: { slug: string; title: string; date: string } | null;
} {
  const index = blogs.findIndex((b) => b.id === slug || b.id === `${slug}.mdx`);
  if (index === -1) return { previous: null, next: null };

  const previous = blogs[index + 1] ?? null;
  const next = blogs[index - 1] ?? null;

  return {
    previous: previous
      ? {
          slug: previous.id.replace(/\.mdx$/, ''),
          title: previous.data.title,
          date: previous.data.date,
        }
      : null,
    next: next
      ? {
          slug: next.id.replace(/\.mdx$/, ''),
          title: next.data.title,
          date: next.data.date,
        }
      : null,
  };
}

