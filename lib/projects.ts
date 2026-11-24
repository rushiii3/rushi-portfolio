import fs from "fs/promises";
import path from "path";
import { parseFrontmatter } from "./frontmatter";

const rootDirectory = path.join(process.cwd(), "/content/projects");
const slugPattern = /^[a-z0-9-]+$/;

function sanitizeError(error: unknown): { name: string; message: string } {
  if (error instanceof Error) {
    return { name: error.name, message: error.message };
  }
  return { name: "UnknownError", message: "Unknown error" };
}

function isValidSlug(slug: string): boolean {
  return slugPattern.test(slug);
}

function resolveSafeProjectPath(slug: string): string | null {
  const resolved = path.resolve(rootDirectory, `${slug}.mdx`);
  const rootWithSeparator = `${path.resolve(rootDirectory)}${path.sep}`;
  return resolved.startsWith(rootWithSeparator) ? resolved : null;
}

export interface ProjectMetadata {
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
  content?: string;
  contentImages: string[];
}

let projectMetadataCache: ProjectMetadata[] | null = null;
const projectDetailCache = new Map<string, ProjectMetadata | null>();

export function extractContentImages(content?: string): string[] {
  if (!content) return [];
  const matches = [...content.matchAll(/!\[.*?\]\((https?:\/\/[^\s\)]+)/g)];
  return [...new Set(matches.map((m) => m[1]))];
}

 async function getProjectMetadata(
  filepath: string,
): Promise<ProjectMetadata | null> {
  try {
    const slug = filepath.replace(/\.mdx$/, "");
    const filePath = path.join(rootDirectory, filepath);
    const fileContent = await fs.readFile(filePath, "utf8");
    const { data, content } = parseFrontmatter(fileContent);

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
      contentImages: extractContentImages(content),
    };
  } catch (error) {
    console.error("Error fetching project metadata", sanitizeError(error));
    return null;
  }
}

export async function getAllProjects(
  limit?: number,
  category?: string,
): Promise<ProjectMetadata[]> {
  try {
    let projects: ProjectMetadata[];
    if (process.env.NODE_ENV !== "development" && projectMetadataCache) {
      projects = projectMetadataCache;
    } else {
      const files = await fs.readdir(rootDirectory);
      const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

      projects = (await Promise.all(mdxFiles.map(getProjectMetadata))).filter(
        (project): project is ProjectMetadata => project !== null,
      );

      projects.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

      if (process.env.NODE_ENV !== "development") {
        projectMetadataCache = projects;
      }
    }

    if (category) {
      projects = projects.filter(
        (project) => project.category.toLowerCase() === category,
      );
    }

    return limit ? projects.slice(0, limit) : projects;
  } catch (error) {
    console.error("Error fetching projects", sanitizeError(error));
    return [];
  }
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectMetadata | null> {
  if (process.env.NODE_ENV !== "development" && projectDetailCache.has(slug)) {
    return projectDetailCache.get(slug)!;
  }

  try {
    if (!isValidSlug(slug)) {
      return null;
    }

    const filePath = resolveSafeProjectPath(slug);
    if (!filePath) {
      return null;
    }

    const fileContent = await fs.readFile(filePath, "utf8");
    const { data, content } = parseFrontmatter(fileContent);

    if (!data.title || !data.category) {
      return null;
    }

    const result = {
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
      content,
      contentImages: extractContentImages(content),
    };

    if (process.env.NODE_ENV !== "development") {
      projectDetailCache.set(slug, result);
    }

    return result;
  } catch (error) {
    console.error(`Error fetching project ${slug}`, sanitizeError(error));
    return null;
  }
}
