"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookTextIcon,
  Briefcase,
  CircleUser,
  HomeIcon,
  SquareActivityIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
// import { useRouter } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import React, { useEffect } from "react";
import { useState } from "react";
const tabs = [
  { id: 1, label: "Home", icon: HomeIcon, href: "/" },
  { id: 2, label: "About", icon: CircleUser, href: "/about" },
  { id: 3, label: "Experience", icon: Briefcase, href: "/experience" },
  { id: 4, label: "Work", icon: SquareActivityIcon, href: "/work" },
  { id: 5, label: "Blog", icon: BookTextIcon, href: "/blog" },
];
const transition = { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] };

export default function Navbar() {
  const path = usePathname();
  console.log(path);

  const [activeTab, setActiveTab] = useState(1);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const router = useRouter();
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Sync activeTab with route path
  useEffect(() => {
    const matchedTab = tabs
      .filter((tab) => path.startsWith(tab.href)) // Get all possible matches
      .sort((a, b) => b.href.length - a.href.length)[0]; // Pick the longest match
    const currentTab = matchedTab?.id || 1; // Default to Home (id: 1)
    setActiveTab(currentTab);
  }, [path]); // Runs when `path` changes

  return (
    <AnimatePresence>
      <motion.div
        className="flex justify-center items-center place-self-center content-center space-x-1 rounded-xl p-2 border-2 fixed bottom-10 md:relative md:bottom-0 left-1/2 transform -translate-x-1/2 md:left-0 md:translate-0 bg-[#0a0a0a]/10 backdrop-blur"
        initial={{ y: isDesktop ? -100 : 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={transition}
      >
        {tabs.map((tab) => (
          <React.Fragment key={tab.id}>
            <button
              onClick={() => router.push(`${tab.href}`)}
              className={`${
                activeTab === tab.id ? "text-white" : "hover:text-white/60"
              } relative rounded-xl cursor-pointer px-3 py-1.5 text-sm font-medium dark:text-white outline-sky-400 transition focus-visible:outline-2 flex flex-row items-center gap-2 `}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
              id={tab.label}
              aria-label={tab.label}
            >
              {activeTab === tab.id && (
                <motion.span
                  // layoutId={tab.label}
                  // layout
                  // layoutId="button"
                  className="absolute inset-0 z-10 dark:bg-white mix-blend-difference rounded-xl bg-black"
                  style={{ borderRadius: 10 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {tab.id === 1 ? (
                <HomeIcon size={18} />
              ) : (
                <>
                  {tab.icon && React.createElement(tab.icon, { size: 18 })}
                  <span className="hidden lg:block">{tab.label}</span>
                </>
              )}
            </button>
            {tab.id === 1 && <div className="bg-white px-[0.2px] py-1.5 " />}
          </React.Fragment>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
