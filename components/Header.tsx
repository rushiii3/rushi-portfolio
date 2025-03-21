"use client";
// import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
const DynamicNavbar = dynamic(() => import("./navbar"), {
  ssr: false,
});
const Header = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [prevScrollY, setPrevScrollY] = useState(0);
//   const handleScroll = useCallback(() => {
//     const currentScrollY = window.scrollY;

//     if (currentScrollY > prevScrollY && currentScrollY > 500) {
//       setTimeout(() => {
//         setIsVisible(false);
//       }, 200);
//     } else {
//       setIsVisible(true);
//     }

//     setPrevScrollY(currentScrollY);
//   }, [prevScrollY]);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [handleScroll, prevScrollY]);
  return (
    <motion.header className="h-20 flex flex-row justify-between fixed w-full z-10  items-center lg:px-40 px-10  md:bg-black/10 md:backdrop-blur">
      <div className="hidden md:block">
        <p>Asia/Mumbai</p>
      </div>
      <DynamicNavbar />
      <div className="hidden md:block">
        <Button>Lets talk</Button>
      </div>
    </motion.header>
  );
};

export default Header;
