import AboutMe from "@/components/sections/about-me";
import Skills from "@/components/sections/skills";
import React from "react";

const Page = () => {
  return (
    <div className="w-full  pt-15 md:pt-28">
      <AboutMe />
      <Skills />
    </div>
  );
};

export default Page;
