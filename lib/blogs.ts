import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

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

interface BlogMetadata {
  slug: string;
  date: string;
  description: string;
  image: string;
  title: string;
  category: string;
  keywords: string[];
  faqSchema?: BlogFAQItem[];
  content?: string;
}

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

async function getBlogMetadata(
  filepath: string,
): Promise<BlogMetadata | null> {
  try {
    const slug = filepath.replace(/\.mdx$/, "");
    const filePath = path.join(rootDirectory, filepath);
    const fileContent = await fs.readFile(filePath, "utf8");
    const { data } = matter(fileContent);

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
    };
  } catch (error) {
    console.error("Error fetching blog metadata", sanitizeError(error));
    return null;
  }
}

export async function getAllBlogs(
  limit?: number,
  page: number = 1,
  category?: string,
  searchQuery?: string,
) {
  try {
    const files = await fs.readdir(rootDirectory);

    let blogs = (await Promise.all(files.map(getBlogMetadata))).filter(
      (blog): blog is BlogMetadata => blog !== null,
    );

    // Sort by date (latest first)
    blogs.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

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

export async function getBlogBySlug(
  slug: string,
): Promise<BlogMetadata | null> {
  try {
    if (!isValidSlug(slug)) {
      return null;
    }

    const filePath = resolveSafeBlogPath(slug);
    if (!filePath) {
      return null;
    }

    const fileContent = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContent);

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
      content,
    };
  } catch (error) {
    console.error(`Error fetching blog ${slug}`, sanitizeError(error));
    return null;
  }
}
