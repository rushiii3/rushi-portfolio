import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const rootDirectory = path.join(process.cwd(), "/content/projects");

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
}

export async function getProjectMetadata(
  filepath: string,
): Promise<ProjectMetadata | null> {
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

export async function getAllProjects(
  limit?: number,
  category?: string,
): Promise<ProjectMetadata[]> {
  try {
    const files = await fs.readdir(rootDirectory);

    let projects = (await Promise.all(files.map(getProjectMetadata))).filter(
      (project): project is ProjectMetadata => project !== null,
    );

    // Sort by date (latest first)
    projects.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    if (category) {
      projects = projects.filter(
        (project) => project.category.toLowerCase() === category,
      );
    }

    return limit ? projects.slice(0, limit) : projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectMetadata | null> {
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
      content,
    };
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error);
    return null;
  }
}
