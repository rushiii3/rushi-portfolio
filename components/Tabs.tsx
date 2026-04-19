import { AnimatePresence, motion } from "framer-motion";

const Tabs = ({
  items,
  category,
  handleClick,
  layoutId
}: {
  items: string[];
  category: string;
  handleClick: (category: string) => void;
  layoutId: string;
}) => {
  return (
    <div
      data-lenis-prevent
      className="flex flex-row items-center justify-start relative overflow-auto  no-visible-scrollbar max-w-4xl"
    >
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
                layoutId={layoutId}
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className="absolute inset-0 bg-black dark:bg-white rounded-full"
              />
            )}
          </AnimatePresence>
          <span
            className={`relative block text-sm font-bold text-nowrap ${
              category === tab ? "dark:text-black text-white" : "dark:text-white text-black"
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
