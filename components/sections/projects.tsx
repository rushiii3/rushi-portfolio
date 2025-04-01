"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Projectcard from "../project-card";
import Tabs from "../Tabs";

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
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setError(null); // Reset error before fetching
      setloading(true);
      try {
        const res = await fetch(
          `/api/projects?category=${category}&limit=${limit}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setDisplayData(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setloading(false);
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
          className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8"
        >
          Work & Projects
        </motion.h2>

        <Tabs
          category={category}
          items={items}
          handleClick={(tab) => setCategory(tab)}
        />

        {/* Show Error Message if API Fails */}
        {error && (
          <p className="w-full text-base font-normal leading-7 text-center text-red-500">
            Error: {error}
          </p>
        )}

        {loading && (
          <p className="w-full text-base font-normal leading-7 text-center text-neutral-200">
            Loading...
          </p>
        )}

        {/* Project Grid */}
        <motion.div
          transition={transition}
          variants={variants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10"
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
        {displayData.length === 0 && !error && !loading && (
          <p className="w-full text-base font-normal leading-7 text-center text-neutral-200">
            No Projects with this category
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default Projects;
