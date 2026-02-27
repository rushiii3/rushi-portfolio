import { NextRequest } from "next/server";
import { getProjectBySlug } from "@/lib/projects";

const slugPattern = /^[a-z0-9-]+$/;

function sanitizeError(error: unknown): { name: string; message: string } {
  if (error instanceof Error) {
    return { name: error.name, message: error.message };
  }
  return { name: "UnknownError", message: "Unknown error" };
}

// Fetch Single Blog by Slug
export async function GET(
  _request: NextRequest,
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

    if (!slugPattern.test(slug)) {
      return new Response(JSON.stringify({ error: "Invalid slug format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const project = await getProjectBySlug(slug);

    if (!project) {
      return new Response(JSON.stringify({ error: "Project not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(project), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching project", sanitizeError(error));
    return new Response(JSON.stringify({ error: "Failed to fetch project" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
