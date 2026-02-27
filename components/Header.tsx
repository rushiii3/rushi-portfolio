"use client";
// import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import dynamic from "next/dynamic";
import Link from "next/link";
const DynamicNavbar = dynamic(() => import("./navbar"), {
  ssr: false,
});
const Header = () => {
  return (
    // <header className="h-20 flex flex-row justify-between fixed w-full z-20 items-center xl:px-40 px-4 sm:px-6 md:px-10 bg-black/25 backdrop-blur supports-[backdrop-filter]:bg-black/20">
    <header className="h-20 flex flex-row justify-between fixed w-full z-10  items-center xl:px-40  px-10  md:bg-black/10 md:backdrop-blur">
      <div className="hidden md:block">
        <p>Asia/Mumbai</p>
      </div>
      <DynamicNavbar />
      <div className="hidden md:block">
        <Button asChild className="min-h-11">
          <Link
            href={"https://cal.com/hrushi-shinde-goijwj"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Lets Talk 👋
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
