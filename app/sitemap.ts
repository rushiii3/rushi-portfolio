/* eslint-disable @typescript-eslint/no-explicit-any */
import { MetadataRoute } from "next";

async function getBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL!}/api/blogs`);

    if (!res.ok) {
      console.error(`Error fetching post: ${res.status}`);
      return [];
    }

    const post = await res.json();
    return post;
  } catch (error) {
    console.error("Fetch failed in getPost:", error);
    return [];
  }
}

async function getWork() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL!}/api/projects`);
  
      if (!res.ok) {
        console.error(`Error fetching work: ${res.status}`);
        return [];
      }
  
      const work = await res.json();
      return work;
    } catch (error) {
      console.error("Fetch failed in getwork:", error);
      return [];
    }
  }
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = `${process.env.NEXT_PUBLIC_URL}`;
  const works = await getWork();
  const blogs = await getBlogs();

  const projectUrls =
  works.map((work: { slug: any }) => ({
      url: `${baseUrl}/work/${work.slug}`,
      lastModified: new Date(),
    })) ?? [];
  const blogUrls =
    blogs.blogs.map((blog: { slug: any }) => ({
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
