"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import HeroSection from "@/components/HeroSection";
import { blogCategories } from "@/content/info";
import BlogTab from "@/components/blog-tab";
import { Suspense } from "react";

export default function BlogWrapper() {
  const segments = useSelectedLayoutSegments();

  const isCategory = segments[0] === "category";
  const slug = isCategory ? segments[1] : "all";

  const category = blogCategories.find((category) => category.slug === slug);
  const title =
    category && category.slug !== "all" ? ` ${category.name}` : "Blogs";
  const description =
    category && category.slug !== "all"
      ? category.intro
      : "In-depth technical articles on web security, penetration testing, vulnerability research, application security, security tools, and real-world exploit writeups.";

  return (
    <>
      <HeroSection title={title} description={description} />
      <Suspense>
      <BlogTab tab={category?.name || ""} />
      </Suspense>
    </>
  );
}
