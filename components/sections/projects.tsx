"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Projectcard from "../project-card";

const transition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] };
const variants = {
  hidden: {
    filter: "blur(10px)",
    opacity: 0,
  },
  visible: {
    filter: "blur(0)",
    opacity: 1,
    transition,
  },
};

const Projects = ({ limit }: { limit?: number }) => {
  const [category, setCategory] = useState("All");
  const items = ["All", "Freelance", "Open-Source", "Personal Projects"];
  const [displayData, setDisplayData] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null); // Reset error before fetching
      try {
        const res = await fetch(
          `http://localhost:3000/api/projects?category=${category}&limit=${limit}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setDisplayData(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchData();
  }, [category]);

  return (
    <section className="py-12 lg:py-16 w-full">
      <motion.div
        className="text-left"
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.04 }}
        viewport={{ once: true }}
      >
        <motion.h2
          initial={false}
          transition={transition}
          variants={variants}
          className="my-6 text-2xl tracking-tight font-extrabold text-white sm:text-3xl md:text-4xl"
        >
          Work & Projects
        </motion.h2>

        <div className="flex flex-row items-center justify-start relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full">
          {items.map((tab) => (
            <button
              key={tab}
              onClick={() => setCategory(tab)}
              className="relative text-nowrap px-4 py-2 rounded-full"
            >
              <AnimatePresence>
                {category === tab && (
                  <motion.div
                    layoutId="clickedbutton"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    className="absolute inset-0 bg-background dark:bg-foreground rounded-full"
                  />
                )}
              </AnimatePresence>
              <span
                className={`relative block text-sm font-bold text-nowrap ${
                  category === tab
                    ? "dark:text-background"
                    : "dark:text-foreground"
                } `}
              >
                {tab}
              </span>
            </button>
          ))}
        </div>

        {/* Show Error Message if API Fails */}
        {error && (
          <p className="w-full text-base font-normal leading-7 text-center text-red-500">
            Error: {error}
          </p>
        )}

        {/* Project Grid */}
        <motion.div
          transition={transition}
          variants={variants}
          className="grid grid-cols-1 gap-3 py-6 lg:py-10 sm:grid-cols-2"
        >
          <AnimatePresence>
            {displayData.map((project, i) => (
              <motion.div
                key={i}
                layout
                initial={variants.hidden}
                animate={variants.visible}
                exit={variants.hidden}
              >
                <Projectcard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Projects Message */}
        {displayData.length === 0 && !error && (
          <p className="w-full text-base font-normal leading-7 text-center text-neutral-200">
            No Projects with this category
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default Projects;
