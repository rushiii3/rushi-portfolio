"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookTextIcon,
  Briefcase,
  CircleUser,
  HomeIcon,
  SquareActivityIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
const tabs = [
  { id: 1, label: "Home", icon: HomeIcon, href: "/" },
  { id: 2, label: "About", icon: CircleUser, href: "/about" },
  { id: 3, label: "Experience", icon: Briefcase, href: "/experience" },
  { id: 4, label: "Work", icon: SquareActivityIcon, href: "/work" },
  { id: 5, label: "Blog", icon: BookTextIcon, href: "/blog" },
];
const transition = { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const };

export default function Navbar() {
  const path = usePathname();

  const [activeTab, setActiveTab] = useState(1);

  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth > 768 : true,
  );
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize, { passive: true });

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
        className="z-40 flex justify-center items-center place-self-center content-center space-x-1 rounded-xl p-2 border fixed left-1/2 -translate-x-1/2 bottom-3 md:relative md:left-0 md:translate-x-0 md:bottom-0 bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-md"
        initial={{ y: isDesktop ? -100 : 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...transition, duration: isDesktop ? 0.55 : 0.4 }}
      >
        {tabs.map((tab) => (
          <React.Fragment key={tab.id}>
            <Link
              href={tab.href}
              className={`${
                activeTab === tab.id ? "text-white dark:text-black" : "dark:hover:text-white/60 hover:text-black/60"
              } relative rounded-xl cursor-pointer px-3 py-2 min-h-11 text-sm font-medium dark:text-white outline-sky-400 transition focus-visible:outline-2 flex flex-row items-center gap-2`}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
              id={tab.label}
              aria-label={tab.label}
            >
              {activeTab === tab.id ? (
                <motion.span
                  className="absolute inset-0 z-10 dark:bg-white mix-blend-difference rounded-xl bg-black"
                  style={{ borderRadius: 10 }}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                />
              ) : null}

              {tab.id === 1 ? (
                <HomeIcon size={18} />
              ) : (
                <>
                  {tab.icon && React.createElement(tab.icon, { size: 18 })}
                  <span className="hidden lg:block">{tab.label}</span>
                </>
              )}
            </Link>
            {tab.id === 1 && <div className="bg-white px-[0.2px] py-1.5 " />}
          </React.Fragment>
        ))}
        <AnimatedThemeToggler className="flex flex-row gap-2 items-center text-sm px-3 py-2" />
      </motion.div>
    </AnimatePresence>
  );
}
