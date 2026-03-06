// `BlogList.tsx` (Client Component)
"use client"; // Mark this as a Client Component
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
      renderItem={(article) => <BlogCard article={article} />}
    />
  );
};

export default BlogList;
