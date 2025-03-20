"use client";
import { motion } from "framer-motion";
import {
  BookTextIcon,
  Briefcase,
  CircleUser,
  Contact2Icon,
  HomeIcon,
  SquareActivityIcon,
} from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
const tabs = [
  { id: 1, label: "Home", icon: HomeIcon },
  { id: 2, label: "About", icon: CircleUser },
  { id: 4, label: "Projects", icon: SquareActivityIcon },
  { id: 5, label: "Experience", icon: Briefcase },
  { id: 6, label: "Blog", icon: BookTextIcon },
  { id: 7, label: "Contact", icon: Contact2Icon },
];
const transition = { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] };

export default function Navbar() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      className="flex justify-center items-center place-self-center content-center space-x-1 rounded-xl p-2 border-2 fixed bottom-10 md:relative md:bottom-0 left-1/2 transform -translate-x-1/2 md:left-0 md:translate-0 bg-[#0a0a0a]/10 backdrop-blur"
      initial={{ y: isDesktop ? -100 : 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={transition}
    >
      {tabs.map((tab) => (
        <React.Fragment key={tab.id}>
          <button
            onClick={() => setActiveTab(tab.id)}
            className={`${
              activeTab === tab.id ? "text-white" : "hover:text-white/60"
            } relative rounded-xl px-3 py-1.5 text-sm font-medium dark:text-white outline-sky-400 transition focus-visible:outline-2 flex flex-row items-center gap-2 `}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="bubble"
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
  );
}
