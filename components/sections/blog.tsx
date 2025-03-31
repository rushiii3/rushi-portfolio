"use server";
import React from "react";
import { Motion } from "../motion";
import BlogList from "../BlogList";

async function getArticles() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL!}/api/blogs?limit=6`, {
      cache: "no-store", // Ensures fresh data on each request
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }

    return response.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.error("Error fetching articles:", error);
    return []; // Return an empty array to prevent rendering errors
  }
}


const Blogs = async () => {
  const posts = await getArticles();  
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

          <BlogList articles={posts.blogs} />
        </div>
      </div>
    </section>
  );
};

export default Blogs;
