import { NextRequest } from "next/server";
import { getAllBlogs } from "@/lib/blogs";

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const searchParams = new URL(request.url).searchParams;
    const category = searchParams.get("category")?.toLowerCase() || "";
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const { blogs, total } = await getAllBlogs(
      limit,
      page,
      category && category !== "all" ? category : undefined,
      searchQuery,
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
      },
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch blogs" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
