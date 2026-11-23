import { MetadataRoute } from "next";
import { getAllBlogs } from "@/lib/blogs";
import { getAllProjects } from "@/lib/projects";
import { blogCategories } from "@/content/info";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://hrushikeshshinde.tech";

  const [{ blogs }, projects] = await Promise.all([
    getAllBlogs(),
    getAllProjects(),
  ]);

  const latestBlogDate = blogs.length > 0
    ? new Date(blogs[0].dateModified || blogs[0].date)
    : new Date("2025-01-01");

  const latestProjectDate = projects.length > 0 && projects[0].date
    ? new Date(projects[0].date)
    : new Date("2025-01-01");

  const siteLastModified = latestBlogDate > latestProjectDate ? latestBlogDate : latestProjectDate;

  const projectUrls: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: project.date ? new Date(project.date) : new Date("2025-01-01"),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogUrls: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.dateModified
      ? new Date(blog.dateModified)
      : new Date(blog.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const categoryUrls: MetadataRoute.Sitemap = blogCategories
    .filter((cat) => cat.slug !== "all")
    .map((cat) => {
      const categoryPosts = blogs.filter(
        (b) => b.category?.toLowerCase() === cat.name.toLowerCase()
      );
      if (categoryPosts.length === 0) return null;

      const catDate = new Date(categoryPosts[0].dateModified || categoryPosts[0].date);

      return {
        url: `${baseUrl}/blog/category/${cat.slug}`,
        lastModified: catDate,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  return [
    {
      url: baseUrl,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2025-06-01"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: new Date("2025-06-01"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: latestProjectDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestBlogDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...categoryUrls,
    ...projectUrls,
    ...blogUrls,
  ];
}
