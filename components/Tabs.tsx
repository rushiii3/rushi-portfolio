import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const Tabs = ({
  items,
  category,
  handleClick,
}: {
  items: string[];
  category: string;
  handleClick: (category: string) => void;
}) => {
  return (
    <div className="flex flex-row items-center justify-start relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full">
      {items.map((tab) => (
        <button
          key={tab}
          onClick={() => {
            handleClick(tab);
          }}
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
              category === tab ? "dark:text-background" : "dark:text-foreground"
            } `}
          >
            {tab}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Tabs;
