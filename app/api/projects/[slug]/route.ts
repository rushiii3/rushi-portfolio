import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { NextRequest } from "next/server";

const rootDirectory = path.join(process.cwd(), "/content/projects");

interface BlogMetadata {
  slug: string;
  date: string;
  description: string;
  image: string;
  title: string;
  category: string;
  content?: string; // Add content field for single blog
  stack: string[];
  link: string;
  github: string;
  type: string;
}

// Fetch Single Blog by Slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const slug = (await params).slug;
    // throw new Error("Blog not found");
    if (!slug) {
      return new Response(JSON.stringify({ error: "Slug is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const blog = await getBlogBySlug(slug);

    if (!blog) {
      return new Response(JSON.stringify({ error: "Blog not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(blog), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch blog" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Function to Get Blog by Slug
async function getBlogBySlug(slug: string): Promise<BlogMetadata | null> {
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
      stack: data.stack ?? [],
      link: data.link ?? "",
      github: data.github ?? "",
      description: data.description ?? "",
      image: data.image ?? "",
      title: data.title ?? "",
      type: data.type ?? "",
      category: data.category ?? "",
      content, // Include MDX content
    };
  } catch (error) {
    console.error("Error fetching blog content:", error);
    return null;
  }
}
