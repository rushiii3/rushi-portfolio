"use server";
import React, { Suspense } from "react";
import { Motion } from "../motion";
import BlogList from "../BlogList";
import BlogCard from "../blog-card";

async function getArticles() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL!}/api/blogs?limit=6`,
    {
      next: { revalidate: 60 }, // ISR instead of no-store
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
}


const Blogs = async () => {
  const posts = await getArticles();  
    if (!posts?.blogs?.length) {
    return <p>No blogs found.</p>;
  }
  return (
    <section className="pt-12 lg:pt-16">
      <div className="w-full">
        <div className="text-left">
          <Motion
            type="h2"
            className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8"
          >
            Blogs
          </Motion>
          <Suspense fallback={<div>loadinggggg</div>}>
          <BlogList articles={posts.blogs} />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
