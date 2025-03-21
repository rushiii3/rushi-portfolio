"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: string | React.ReactNode | any;
};

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

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center justify-start relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            className={cn("relative px-4 py-2 rounded-full", tabClassName)}
          >
            <AnimatePresence>
              {active.value === tab.value && (
                <motion.div
                  layoutId="clickedbutton"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  className={cn(
                    "absolute inset-0 bg-background dark:bg-foreground rounded-full ",
                    activeTabClassName
                  )}
                />
              )}
            </AnimatePresence>
            <span className={`relative block text-sm font-bold ${active.value === tab.value ? "dark:text-background" : "dark:text-foreground"} `}>
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        className={cn("mt-10", contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  const isActive = (tab: Tab) => {
    return tab.value === tabs[0].value;
  };
  return (
    <div className="relative w-full h-full">
      {tabs.map((tab) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          initial={variants.hidden}
          animate={variants.visible}
          className={cn(
            `w-full h-full ${isActive(tab) ? "block" : "hidden"}`,
            className
          )}
          transition={transition}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
