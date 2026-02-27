import React from "react";
import BlogList from "../BlogList";
import { getAllBlogs } from "@/lib/blogs";
import SectionTitle from "../SectionTitle";

const Blogs = async () => {
  const { blogs } = await getAllBlogs(6);
  if (!blogs?.length) {
    return <p>No blogs found.</p>;
  }
  return (
    <section className="pt-12 lg:pt-16">
      <div className="w-full">
        <div className="text-left">
          <SectionTitle
            title="Blogs"
            className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8"
          />
          <BlogList articles={blogs} />
        </div>
      </div>
    </section>
  );
};

export default Blogs;
