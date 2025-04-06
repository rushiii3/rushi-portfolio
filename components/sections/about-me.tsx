"use client";
import React from "react";
import { Motion } from "../motion";
import { personalInfo } from "@/content/info";

const AboutMe = () => {
  return (
    <section className="py-12 lg:py-16">
      <div className="w-full">
        <div className="text-left">
          <Motion
            type="h1"
            className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8"
          >
            About me
          </Motion>

          <Motion
            type="p"
            className="w-full text-base font-normal leading-7 text-justify text-neutral-200"
          >
            {personalInfo.description}
          </Motion>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
