"use client";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

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
}

const StaggeredList = <T extends RootObject>({
  items,
  renderItem,
}: StaggeredListProps<T>) => {
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
        {items.map((item, index) => (
          <motion.div
            key={item.slug}
            layout
            initial={variants.hidden}
            animate={variants.visible}
            exit={variants.hidden}
            transition={transition}
          >
            {renderItem(item, index)}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default StaggeredList;
