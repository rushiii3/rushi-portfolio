import { NextRequest } from "next/server";
import { getAllProjects } from "@/lib/projects";

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const searchParams = new URL(request.url).searchParams;
    const category = searchParams.get("category")?.toLowerCase() || "";
    const limit = searchParams.get("limit");

    const projects = await getAllProjects(
      limit ? Number(limit) : undefined,
      category && category !== "all" ? category : undefined,
    );

    return new Response(JSON.stringify(projects), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch projects" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
