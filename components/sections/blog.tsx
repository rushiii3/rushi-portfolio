"use client";
import { motion } from 'framer-motion'
import React from 'react'
import BlogCard from '../blog-card';
const transition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] };

const variants = {
  hidden: {
    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    filter: "blur(10px)",
    opacity: 0,
  },
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    filter: "blur(0)",
    opacity: 1,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
};

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
  ];
const Blogs = () => {
  return (
    <section className="pt-12 lg:pt-16">
      <div className="w-full">
        <motion.div
          className="text-left"
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.04 }}
          viewport={{ once: true }}
        >
          <motion.h2
            transition={transition}
            variants={variants}
            className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8"
          >
            Blogs
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <BlogCard article={article} key={article.id} />
          ))}
        </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Blogs