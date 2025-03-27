import AboutMe from "@/components/sections/about-me";
import Skills from "@/components/sections/skills";
import React from "react";

const Page = () => {
  return (
    <div className="w-full md:pt-14">
      <AboutMe />
      <Skills />
    </div>
  );
};

export default Page;
