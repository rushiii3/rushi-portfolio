import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { memo, useCallback } from "react";

interface TabsProps {
  items: string[];
  category: string;
  handleClick: (category: string) => void;
  layoutId: string;
}

// ✅ Memoized tab button — only re-renders when its own active state changes
const TabButton = memo(function TabButton({
  tab,
  isActive,
  onClick,
  layoutId,
}: {
  tab: string;
  isActive: boolean;
  onClick: () => void;
  layoutId: string;
}) {
  return (
    <button
      onClick={onClick}
      className="relative text-nowrap px-4 py-2 rounded-full"
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1} 
    >
      <AnimatePresence>
        {isActive && (
          <m.div
            layoutId={layoutId}
            // ✅ initial={false} — prevents indicator animating in on first render
            initial={false}
            transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
            className="absolute inset-0 bg-black dark:bg-white rounded-full"
          />
        )}
      </AnimatePresence>
      <span
        className={`relative block text-sm font-bold text-nowrap transition-colors duration-200 ${
          isActive ? "dark:text-black text-white" : "dark:text-white text-black"
        }`}
      >
        {tab}
      </span>
    </button>
  );
});

const Tabs = ({ items, category, handleClick, layoutId }: TabsProps) => {
  // ✅ Stable click handler per tab — avoids inline arrow fn recreation per render
  const makeHandler = useCallback(
    (tab: string) => () => handleClick(tab),
    [handleClick],
  );

  return (
    // ✅ LazyMotion scoped here — only loads domAnimation (~18KB) not full Framer
    <LazyMotion features={domAnimation} strict>
      <div
        role="tablist"
        data-lenis-prevent
        className="flex flex-row items-center justify-start relative overflow-auto no-visible-scrollbar max-w-4xl"
      >
        {items.map((tab) => (
          <TabButton
            key={tab}
            tab={tab}
            isActive={category === tab}
            onClick={makeHandler(tab)}
            layoutId={layoutId}
          />
        ))}
      </div>
    </LazyMotion>
  );
};

export default memo(Tabs);
