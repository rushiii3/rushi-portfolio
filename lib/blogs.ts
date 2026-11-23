import fs from "fs/promises";
import path from "path";
import readingTime from "reading-time";
import { parseFrontmatter } from "./frontmatter";

const rootDirectory = path.join(process.cwd(), "/content/blogs");
const slugPattern = /^[a-z0-9-]+$/;

function sanitizeError(error: unknown): { name: string; message: string } {
  if (error instanceof Error) {
    return { name: error.name, message: error.message };
  }
  return { name: "UnknownError", message: "Unknown error" };
}

function isValidSlug(slug: string): boolean {
  return slugPattern.test(slug);
}

function resolveSafeBlogPath(slug: string): string | null {
  const resolved = path.resolve(rootDirectory, `${slug}.mdx`);
  const rootWithSeparator = `${path.resolve(rootDirectory)}${path.sep}`;
  return resolved.startsWith(rootWithSeparator) ? resolved : null;
}

interface BlogFAQItem {
  question: string;
  answer: string;
}

export interface BlogMetadata {
  slug: string;
  date: string;
  description: string;
  image: string;
  title: string;
  category: string;
  dateModified: string;
  keywords: string[];
  faqSchema?: BlogFAQItem[];
  content?: string;
  wordCount: number;
  readingMinutes: number;
  series?: string;
  seriesOrder?: number;
  isPillar?: boolean;
}


interface BlogNavigation {
  previous: Pick<BlogMetadata, "slug" | "title" | "date"> | null;
  next: Pick<BlogMetadata, "slug" | "title" | "date"> | null;
}

let blogMetadataCache: BlogMetadata[] | null = null;
const blogDetailCache = new Map<string, (BlogMetadata & BlogNavigation) | null>();

function parseFaqSchema(value: unknown): BlogFAQItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is BlogFAQItem =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as BlogFAQItem).question === "string" &&
        typeof (item as BlogFAQItem).answer === "string",
    )
    .map((item) => ({
      question: item.question.trim(),
      answer: item.answer.trim(),
    }))
    .filter((item) => item.question.length > 0 && item.answer.length > 0);
}

async function getBlogMetadata(filepath: string): Promise<BlogMetadata | null> {
  try {
    const slug = filepath.replace(/\.mdx$/, "");
    const filePath = path.join(rootDirectory, filepath);
    const fileContent = await fs.readFile(filePath, "utf8");
    const { data } = parseFrontmatter(fileContent);
    if (!data.title || !data.category) {
      return null;
    }

    return {
      slug,
      date: data.date ?? "",
      description: data.description ?? "",
      image: data.image ?? "",
      title: data.title ?? "",
      category: data.category ?? "",
      keywords: data.keywords ?? [],
      faqSchema: parseFaqSchema(data.faqSchema),
      dateModified: data.dateModified ?? "",
      wordCount: data.wordCount ?? 0,
      readingMinutes: data.readingMinutes ?? 0,
      series: data.series ?? undefined,
      seriesOrder: typeof data.seriesOrder === "number" ? data.seriesOrder : undefined,
      isPillar: Boolean(data.isPillar),
    };
  } catch (error) {
    console.error("Error fetching blog metadata", sanitizeError(error));
    return null;
  }
}

async function getAllBlogMetadata(): Promise<BlogMetadata[]> {
  if (process.env.NODE_ENV !== "development" && blogMetadataCache) {
    return blogMetadataCache;
  }
  console.log("Fetching all blog metadata from filesystem...");

  try {
    const files = await fs.readdir(rootDirectory);
    const mdxFiles = files.filter((f) => f.endsWith(".mdx"));
    const blogs = (await Promise.all(mdxFiles.map(getBlogMetadata))).filter(
      (blog): blog is BlogMetadata => blog !== null,
    );

    blogs.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    if (process.env.NODE_ENV !== "development") {
      blogMetadataCache = blogs;
    }

    return blogs;
  } catch (error) {
    console.error("Error loading blog metadata", sanitizeError(error));
    return [];
  }
}

export async function getAllBlogs(
  limit?: number,
  page: number = 1,
  category?: string,
  searchQuery?: string,
) {
  try {
    let blogs = await getAllBlogMetadata();

    if (category && category.toLowerCase() !== "all") {
      blogs = blogs.filter(
        (blog) => blog.category.toLowerCase() === category.toLowerCase(),
      );
    }

    if (searchQuery && searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      blogs = blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query) ||
          blog.description.toLowerCase().includes(query),
      );
    }

    const total = blogs.length;
    const paginatedBlogs = limit
      ? blogs.slice((page - 1) * limit, page * limit)
      : blogs;

    return { blogs: paginatedBlogs, total };
  } catch (error) {
    console.error("Error fetching blogs", sanitizeError(error));
    return { blogs: [], total: 0 };
  }
}

function stripNonReadableContent(content: string): string {
  return content
    // remove frontmatter
    .replace(/^---[\s\S]*?---/, "")

    // remove fenced code blocks
    .replace(/```[\s\S]*?```/g, "")

    // remove inline code
    .replace(/`[^`]*`/g, "")

    // remove tables
    .replace(/^\|.*\|$/gm, "")
    .replace(/^\|[-:\s|]+\|$/gm, "")

    // remove MDX/HTML blocks (including content)
    .replace(/<[^\/>]+>[\s\S]*?<\/[^>]+>/g, "")

    // remove self-closing tags
    .replace(/<[^>]+\/>/g, "")

    // remove images
    .replace(/\!\[.*?\]\(.*?\)/g, "")

    // remove headings
    .replace(/^#+\s.*$/gm, "")

    // collapse whitespace
    .replace(/\s+/g, " ")
    .trim();
}

function resolveBlogNavigation(
  blogs: BlogMetadata[],
  slug: string,
): BlogNavigation {
  const index = blogs.findIndex((blog) => blog.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  const previous = blogs[index + 1] ?? null;
  const next = blogs[index - 1] ?? null;
  return {
    previous: previous ? {
      title: previous.title,
      slug: previous.slug,
      date: previous.date,
    } : null,
    next: next ? {
      title: next.title,
      slug: next.slug,
      date: next.date,
    } : null,
  };
}

export async function getBlogBySlug(
  slug: string,
): Promise<(BlogMetadata & BlogNavigation) | null> {
  if (process.env.NODE_ENV !== "development" && blogDetailCache.has(slug)) {
    return blogDetailCache.get(slug)!;
  }

  try {
    if (!isValidSlug(slug)) {
      return null;
    }

    const filePath = resolveSafeBlogPath(slug);
    if (!filePath) {
      return null;
    }

    const fileContent = await fs.readFile(filePath, "utf8");
    const { data, content } = parseFrontmatter(fileContent);

    if (!data.title || !data.category) {
      return null;
    }
    const cleaned = stripNonReadableContent(content);
    const stats = readingTime(cleaned);

    const wordCount = stats.words;
    const readingMinutes = Math.ceil(stats.minutes);

    const blogs = await getAllBlogMetadata();
    const navigation = resolveBlogNavigation(blogs, slug);
    const result = {
      slug,
      date: data.date ?? "",
      dateModified: data.dateModified ?? "",
      description: data.description ?? "",
      image: data.image ?? "",
      title: data.title ?? "",
      category: data.category ?? "",
      keywords: data.keywords ?? [],
      faqSchema: parseFaqSchema(data.faqSchema),
      content,
      wordCount,
      readingMinutes,
      series: data.series ?? undefined,
      seriesOrder: typeof data.seriesOrder === "number" ? data.seriesOrder : undefined,
      isPillar: Boolean(data.isPillar),
      previous: navigation.previous,
      next: navigation.next,
    };

    if (process.env.NODE_ENV !== "development") {
      blogDetailCache.set(slug, result);
    }

    return result;
  } catch (error) {
    console.error(`Error fetching blog ${slug}`, sanitizeError(error));
    return null;
  }
}

export async function getRelatedBlogs(
  currentSlug: string,
  limit: number = 3,
): Promise<BlogMetadata[]> {
  const allBlogs = await getAllBlogMetadata();
  const current = allBlogs.find((b) => b.slug === currentSlug);
  if (!current) return [];

  const currentKeywords = new Set(
    (current.keywords || []).map((k) => k.toLowerCase().trim()),
  );

  const scored = allBlogs
    .filter((b) => b.slug !== currentSlug)
    .map((candidate) => {
      let score = 0;
      if (candidate.category.toLowerCase() === current.category.toLowerCase()) {
        score += 5;
      }
      for (const kw of candidate.keywords || []) {
        if (currentKeywords.has(kw.toLowerCase().trim())) {
          score += 2;
        }
      }
      return { candidate, score };
    });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (
      new Date(b.candidate.date).getTime() - new Date(a.candidate.date).getTime()
    );
  });

  const topScored = scored.slice(0, limit).map((s) => s.candidate);

  if (topScored.length < limit) {
    const existingSlugs = new Set([currentSlug, ...topScored.map((b) => b.slug)]);
    const fallback = allBlogs.filter((b) => !existingSlugs.has(b.slug));
    topScored.push(...fallback.slice(0, limit - topScored.length));
  }

  return topScored;
}

export async function getSeriesBlogs(
  seriesName: string,
): Promise<BlogMetadata[]> {
  const allBlogs = await getAllBlogMetadata();
  return allBlogs
    .filter(
      (b) => b.series && b.series.toLowerCase() === seriesName.toLowerCase(),
    )
    .sort((a, b) => (a.seriesOrder ?? 99) - (b.seriesOrder ?? 99));
}

