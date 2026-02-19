import { MetadataRoute } from "next";
import { getAllBlogs } from "@/lib/blogs";
import { getAllProjects } from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = `${process.env.NEXT_PUBLIC_URL}`;

  // async-parallel: fetch blogs and projects in parallel
  const [{ blogs }, projects] = await Promise.all([
    getAllBlogs(),
    getAllProjects(),
  ]);

  const projectUrls =
    projects.map((work) => ({
      url: `${baseUrl}/work/${work.slug}`,
      lastModified: new Date(),
    })) ?? [];
  const blogUrls =
    blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(),
    })) ?? [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    ...projectUrls,
    ...blogUrls,
  ];
}
