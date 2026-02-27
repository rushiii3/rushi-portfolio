import { NextRequest } from "next/server";
import { getAllProjects } from "@/lib/projects";

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

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
    const limit = parseBoundedInt(
      searchParams.get("limit"),
      DEFAULT_LIMIT,
      1,
      MAX_LIMIT,
    );

    if (limit === null) {
      return new Response(
        JSON.stringify({
          error: `Invalid limit. limit must be 1-${MAX_LIMIT}.`,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const projects = await getAllProjects(
      limit,
      category && category !== "all" ? category : undefined,
    );

    return new Response(JSON.stringify(projects), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching projects", sanitizeError(error));
    return new Response(JSON.stringify({ error: "Failed to fetch projects" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
