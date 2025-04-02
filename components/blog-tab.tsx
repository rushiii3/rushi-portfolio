"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Tabs from "./Tabs";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const BlogTab = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const blogCategories = [
    "All",
    "Web Security",
    "Ethical Hacking",
    "Labs & Research",
    "General Cybersecurity",
  ];
  const [isVisible, setisVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  function handleSearch(term: string) {
    setSearchTerm(term); // Update local state
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    push(`?${params.toString()}`, { scroll: false });
  }

  function handleCategory(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      if (term === "All") {
        params.delete("category");
      } else {
        params.set("category", term);
      }
    } else {
      params.delete("category");
    }
    push(`?${params.toString()}`, { scroll: false });
  }

  return (
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
                category={searchParams.get("category")?.toString() || "All"}
                handleClick={handleCategory}
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
              <div className="relative w-full max-w-full">
                <Input
                  placeholder="Filter..."
                  className="max-w-full"
                  value={searchTerm} // Controlled input
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  onClick={() => handleSearch("")} // Clear input
                >
                  <XIcon className="h-4 w-4" />
                  <span className="sr-only">Clear</span>
                </Button>
              </div>
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
  );
};

export default BlogTab;
