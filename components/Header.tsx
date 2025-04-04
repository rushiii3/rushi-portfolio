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
    <header className="h-20 flex flex-row justify-between fixed w-full z-10  items-center xl:px-40  px-10  md:bg-black/10 md:backdrop-blur">
      <div className="hidden md:block">
        <p>Asia/Mumbai</p>
      </div>
      <DynamicNavbar />
      <div className="hidden md:block">
        <Button asChild>
          <Link href={"https://cal.com/hrushi-shinde-goijwj"} target="_blank">
            Lets Talk
            👋
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
