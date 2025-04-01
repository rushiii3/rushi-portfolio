"use client";
import { ArrowRight, Search, X } from "lucide-react";
import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Tabs from "@/components/Tabs";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/input";

const articles = [
  {
    id: 1,
    category: "Design",
    title: "UX review presentations",
    description:
      "How to build great slides and impress your colleagues and clients during your next design review.",
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

const Page = () => {
  const blogCategories = [
    "All",
    "Web Security",
    "Ethical Hacking",
    "Labs & Research",
    "General Cybersecurity",
  ];
  const [category, setcategory] = useState(blogCategories[0]);
  const [isVisible, setisVisible] = useState(false);
  console.log(isVisible);

  return (
    <div className="min-h-screen text-white w-full md:pt-14">
      {/* Hero Section */}
      <div className="pt-12 lg:pt-16 w-full mb-10">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
          Blogs
        </h1>
        {/* <p className="text-gray-400 max-w-2xl">
          The Untitled UI Journal features carefully selected good works from
          studios and designers from around the globe. Subscribe for new posts
          in your inbox every Thursday for free.
        </p> */}
      </div>

      {/* Featured Article */}
      {/* <div className="w-full mx-auto mb-16">
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1614064642639-e398cf05badb?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Featured"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
            <h2 className="text-2xl font-bold mb-2">
              Improve your design skills: Develop an for design
            </h2>
            <p className="text-gray-300 mb-4">
              Tools and trends change, but good design is timeless. Learn how to
              quickly develop an for design.
            </p>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                Design
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                Research
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                Presentation
              </span>
            </div>
          </div>
        </div>
      </div> */}

      {/* Article Grid */}
      <div className="">
        <div className="flex flex-col md:flex-row items-center gap-5 justify-between mb-5">
          <div className="w-full">
            {/* Tabs with Smooth Fade Animation */}
            <AnimatePresence mode="popLayout">
              {!isVisible && (
                <motion.div
                  key="tabs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Tabs
                    items={blogCategories}
                    category={category}
                    handleClick={(category) => setcategory(category)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Search Input with Smooth Slide-In */}
            <AnimatePresence mode="popLayout">
              {isVisible && (
                <motion.div
                  key="search-input"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <Input placeholder="Search blogs..." className="w-full" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="ml-auto">
            <Button
              className="rounded-full relative overflow-hidden"
              size="icon"
              onClick={() => setisVisible(!isVisible)}
            >
              <AnimatePresence mode="wait">
                {isVisible ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <X />
                  </motion.div>
                ) : (
                  <motion.div
                    key="search"
                    initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Search />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        <p>You searched for &#34;hello&#34; </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
          {articles.map((article) => (
            <div key={article.id} className="group cursor-pointer">
              <div className="relative aspect-video mb-4 rounded-2xl overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-white/10 backdrop-blur rounded-full text-xs">
                    {article.category}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                {article.title}
                <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {article.description}
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">
                  {article.author.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-12">
          <Pagination>
            <PaginationContent className=" w-full">
              <PaginationItem className="mr-auto">
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              {/* <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem> */}
              <PaginationItem className="ml-auto">
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Page;
