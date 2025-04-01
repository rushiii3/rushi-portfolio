import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { NextRequest } from "next/server";

const rootDirectory = path.join(process.cwd(), "/content/projects");

interface ProjectMetadata {
  slug: string;
  date: string;
  stack: string[];
  link: string;
  github: string;
  description: string;
  image: string;
  title: string;
  type: string;
  category: string;
}

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const searchParams = new URL(request.url).searchParams;
    const category = searchParams.get("category")?.toLowerCase() || "";
    const limit = searchParams.get("limit");

    // Simulating delay (e.g., 2 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    const projects = await getProjects(
      limit ? Number(limit) : undefined,
      category && category !== "all" ? category : undefined
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


async function getProjects(limit?: number, category?: string): Promise<ProjectMetadata[]> {
  try {
    const files = await fs.readdir(rootDirectory);

    let projects = (await Promise.all(files.map(getProjectMetadata))).filter(
      (project): project is ProjectMetadata => project !== null
    );

    // Sort by date (latest first)
    projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (category) {
      projects = projects.filter((project) => project.category.toLowerCase() === category);
    }

    return limit ? projects.slice(0, limit) : projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

async function getProjectMetadata(filepath: string): Promise<ProjectMetadata | null> {
  try {
    const slug = filepath.replace(/\.mdx$/, "");
    const filePath = path.join(rootDirectory, filepath);
    const fileContent = await fs.readFile(filePath, "utf8");
    const { data } = matter(fileContent);

    if (!data.title || !data.category) {
      return null; // Ensures all necessary metadata exists
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
    };
  } catch (error) {
    console.error("Error fetching project metadata:", error);
    return null;
  }
}
