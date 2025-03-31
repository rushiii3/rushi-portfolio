"use client";
import { motion } from "framer-motion";
import React from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Delay between children animations
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface RootObject {
  slug: string;
  date: string;
  description: string;
  image: string;
  title: string;
  category: string;
}


interface StaggeredListProps<T extends RootObject> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

const StaggeredList = <T extends RootObject>({ items, renderItem, className }: StaggeredListProps<T>) => {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <motion.div key={index} variants={itemVariants}>
          {renderItem(item, index)}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggeredList;
