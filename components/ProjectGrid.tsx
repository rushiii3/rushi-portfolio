"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Projectcard from "./project-card";

const transition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const };
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

interface Project {
  slug: string;
  date: string;
  description: string;
  image: string;
  title: string;
  type: string;
  category: string;
  stack: string[];
  link?: string;
  github?: string;
}

const ProjectGrid = ({ projects }: { projects: Project[] }) => {
  return (
    <motion.div
      transition={transition}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10"
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project) => (
          <motion.div
            key={project.slug}
            layout
            initial={variants.hidden}
            animate={variants.visible}
            exit={variants.hidden}
            transition={transition}
          >
            <Projectcard project={project} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectGrid;
