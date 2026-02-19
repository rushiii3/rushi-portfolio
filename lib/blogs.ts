import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const rootDirectory = path.join(process.cwd(), "/content/blogs");

export interface BlogMetadata {
  slug: string;
  date: string;
  description: string;
  image: string;
  title: string;
  category: string;
  keywords: [];
  content?: string;
}

export async function getBlogMetadata(
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
    };
  } catch (error) {
    console.error("Error fetching blog metadata:", error);
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
    console.error("Error fetching blogs:", error);
    return { blogs: [], total: 0 };
  }
}

export async function getBlogBySlug(
  slug: string,
): Promise<BlogMetadata | null> {
  try {
    const filePath = path.join(rootDirectory, `${slug}.mdx`);
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
      content,
    };
  } catch (error) {
    console.error(`Error fetching blog ${slug}:`, error);
    return null;
  }
}
