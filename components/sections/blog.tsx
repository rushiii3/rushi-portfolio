"use client";
import React from "react";
import BlogCard from "../blog-card";
import { Motion } from "../motion";
import StaggeredList from "../Stagger";

const articles = [
  {
    id: 1,
    category: "Design",
    title: "UX review presentations",
    description:
      "How to build great slides and impress your colleagues and clients during your next design review. How to build great slides and impress your colleagues and clients during your next design review.",
    author: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      date: "4 Jan 2024",
    },
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800",
  },
  {
    id: 2,
    category: "Product",
    title: "Migrating to Linear 101",
    description:
      "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
    author: {
      name: "Phoenix Baker",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      date: "3 Jan 2024",
    },
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800",
  },
  {
    id: 3,
    category: "Software Engineering",
    title: "Building your API stack",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    author: {
      name: "Lana Steiner",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      date: "3 Jan 2024",
    },
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800",
  },
  {
    id: 4,
    category: "Software Engineering",
    title: "Building your API stack",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    author: {
      name: "Lana Steiner",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      date: "3 Jan 2024",
    },
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800",
  },
  {
    id: 5,
    category: "Software Engineering",
    title: "Building your API stack",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    author: {
      name: "Lana Steiner",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      date: "3 Jan 2024",
    },
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800",
  },
  {
    id: 6,
    category: "Software Engineering",
    title: "Building your API stack",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    author: {
      name: "Lana Steiner",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      date: "3 Jan 2024",
    },
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800",
  },
];
const Blogs = () => {
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

          <StaggeredList
            items={articles}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10"
            renderItem={(article) => <BlogCard article={article} />}
          />
        </div>
      </div>
    </section>
  );
};

export default Blogs;
