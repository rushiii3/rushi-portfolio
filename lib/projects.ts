import fs from "fs";
import path from "path";
import matter from "gray-matter";

const rootDirectory = path.join(process.cwd(), "/content/projects");
export async function getProjects(limit?: number, category?: string) {
    const files = fs.readdirSync(rootDirectory);
  
    
    let projects = files
      .map((file) => getProjectMetadata(file))
      .sort((a, b) => {
        if (new Date(a.date ?? "") < new Date(b.date ?? "")) {
          return 1;
        } else {
          return -1;
        }
      });
  
    if (category) {
      projects = projects.filter((project) => project.category === category);
    }
  
    if (limit) {
      return projects.slice(0, limit);
    }
  
    return projects;
  }
  
export async function getProjectBySlug(slug: string) {
  try {
    const filePath = path.join(rootDirectory, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
    const { data, content } = matter(fileContent);
    return {
      metadata: {
        ...data,
        slug,
        date: data.date ?? "",
        stack: data.stack ?? [],
        link: data.link ?? "",
        github: data.github ?? "",
        description: data.description ?? "",
        image: data.image ?? "",
        title: data.title ?? "",
        type: data.type ?? "",
      },
      content,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function getProjectMetadata(filepath: string) {
  const slug = filepath.replace(/\.mdx$/, "");
  const filePath = path.join(rootDirectory, filepath);
  const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
  const { data } = matter(fileContent);
  return {
    ...data,
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
}
