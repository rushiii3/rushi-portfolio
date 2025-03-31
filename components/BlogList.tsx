// `BlogList.tsx` (Client Component)
"use client"; // Mark this as a Client Component

import React from "react";
import BlogCard from "./blog-card";
import StaggeredList from "./Stagger";

interface RootObject {
  slug: string;
  date: string;
  description: string;
  image: string;
  title: string;
  category: string;
}
const BlogList = ({ articles }: { articles: RootObject[] }) => {
  return (
    <StaggeredList
      items={articles}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10"
      renderItem={(article) => <BlogCard article={article} />}
    />
  );
};

export default BlogList;
