import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { NextRequest } from "next/server";

const rootDirectory = path.join(process.cwd(), "/content/blogs");

interface BlogMetadata {
  slug: string;
  date: string;
  description: string;
  image: string;
  title: string;
  category: string;
}

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const searchParams = new URL(request.url).searchParams;
    const category = searchParams.get("category")?.toLowerCase() || "";
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const { blogs, total } = await getBlogs(
      limit,
      page,
      category && category !== "all" ? category : undefined
    );

    return new Response(
      JSON.stringify({
        blogs,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch blogs" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function getBlogs(limit: number, page: number, category?: string) {
  try {
    const files = await fs.readdir(rootDirectory);

    let blogs = (await Promise.all(files.map(getBlogMetadata))).filter(
      (blog): blog is BlogMetadata => blog !== null
    );

    // Sort by date (latest first)
    blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (category) {
      blogs = blogs.filter((blog) => blog.category.toLowerCase() === category);
    }

    const total = blogs.length;
    const paginatedBlogs = blogs.slice((page - 1) * limit, page * limit);

    return { blogs: paginatedBlogs, total };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { blogs: [], total: 0 };
  }
}

async function getBlogMetadata(filepath: string): Promise<BlogMetadata | null> {
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
    };
  } catch (error) {
    console.error("Error fetching blog metadata:", error);
    return null;
  }
}
