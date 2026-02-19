import { NextRequest } from "next/server";
import { getBlogBySlug } from "@/lib/blogs";

// Fetch Single Blog by Slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const slug = (await params).slug;
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
