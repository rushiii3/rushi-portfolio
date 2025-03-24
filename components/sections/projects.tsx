"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
// import Projectcard from "../project-card";
const transition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] };
const variants = {
  hidden: {
    filter: "blur(10px)",
    opacity: 0,
  },
  visible: {
    filter: "blur(0)",
    opacity: 1,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
};
const Projects = () => {
  const [category, setCategory] = useState("All");
  const items = ["All", "Freelance", "Open-Source", "Personal Projects"];

  // const handleCategoryClick = (categoryD) => {
  //   if (categoryD === category) return;
  //   setCategory(categoryD);

  //   if (categoryD === "all") {
  //     setDisplayData(data.items);
  //     return;
  //   }

  //   const filteredData = data.items.filter(
  //     (item) => item.category === categoryD
  //   );
  //   setDisplayData(filteredData);
  // };
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
          transition={transition}
          variants={variants}
          className="my-6 text-2xl tracking-tight font-extrabold text-white sm:text-3xl md:text-4xl"
        >
          Work & Projects
        </motion.h2>

        <div
          className={cn(
            "flex flex-row items-center justify-start relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full"
          )}
        >
          {items.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setCategory(tab);
                // handleCategoryClick(tab);
              }}
              className={cn("relative text-nowrap px-4 py-2 rounded-full")}
            >
              <AnimatePresence>
                {category === tab && (
                  <motion.div
                    layoutId="clickedbutton"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    className={cn(
                      "absolute inset-0 bg-background dark:bg-foreground rounded-full "
                    )}
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
        <div className="grid grid-cols-2 gap-2 mt-10">
          <AnimatePresence>
            {/* {displayData.map(({ img, category }, i) => (
              <motion.div
                key={i}
                layout
                initial={variants.hidden}
                animate={variants.visible}
                exit={variants.hidden}
              >
                <img src={img} className="h-80" />
              </motion.div>
            ))} */}
          </AnimatePresence>
        </div>
        <motion.div
          transition={transition}
          variants={variants}
          className="grid grid-cols-1 gap-3 py-6 lg:py-10 sm:grid-cols-2"
        >

        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;
