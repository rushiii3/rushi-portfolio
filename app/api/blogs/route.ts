import { NextRequest } from "next/server";
import { getAllBlogs } from "@/lib/blogs";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;
const MAX_PAGE = 10000;
const MAX_SEARCH_LENGTH = 200;

function sanitizeError(error: unknown): { name: string; message: string } {
  if (error instanceof Error) {
    return { name: error.name, message: error.message };
  }
  return { name: "UnknownError", message: "Unknown error" };
}

function parseBoundedInt(
  value: string | null,
  fallback: number,
  min: number,
  max: number,
): number | null {
  if (value === null) return fallback;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < min || parsed > max) return null;
  return parsed;
}

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const searchParams = new URL(request.url).searchParams;
    const category = searchParams.get("category")?.toLowerCase() || "";
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";
    const page = parseBoundedInt(
      searchParams.get("page"),
      DEFAULT_PAGE,
      1,
      MAX_PAGE,
    );
    const limit = parseBoundedInt(
      searchParams.get("limit"),
      DEFAULT_LIMIT,
      1,
      MAX_LIMIT,
    );

    if (page === null || limit === null) {
      return new Response(
        JSON.stringify({
          error: `Invalid pagination. page must be 1-${MAX_PAGE}, limit must be 1-${MAX_LIMIT}.`,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    if (searchQuery.length > MAX_SEARCH_LENGTH) {
      return new Response(
        JSON.stringify({
          error: `Search query too long. Maximum ${MAX_SEARCH_LENGTH} characters.`,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

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
    console.error("Error fetching blogs", sanitizeError(error));
    return new Response(JSON.stringify({ error: "Failed to fetch blogs" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
