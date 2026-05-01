"use client";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import React, { memo } from "react";

const TRANSITION = { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const };

// ✅ Separate variants for container (stagger) vs item (reveal)
const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // ✅ This is what actually makes it "staggered"
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const ITEM_VARIANTS = {
  hidden: { filter: "blur(8px)", opacity: 0, y: 16 },
  visible: {
    filter: "blur(0px)",
    opacity: 1,
    y: 0,
    transition: TRANSITION,
  },
  exit: {
    filter: "blur(8px)",
    opacity: 0,
    y: -8,
    transition: { ...TRANSITION, duration: 0.3 },
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
  className?: string;
}

// ✅ Memoized item wrapper — only re-renders if slug changes
const StaggeredItem = memo(function StaggeredItem({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <m.div
      layout
      variants={ITEM_VARIANTS}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </m.div>
  );
});

const StaggeredList = <T extends RootObject>({
  items,
  renderItem,
  className = "grid grid-cols-1 md:grid-cols-2 gap-8 mt-10",
}: StaggeredListProps<T>) => {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        variants={CONTAINER_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className={className}
      >
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <StaggeredItem key={item.slug}>
              {renderItem(item, index)}
            </StaggeredItem>
          ))}
        </AnimatePresence>
      </m.div>
    </LazyMotion>
  );
};

export default StaggeredList;