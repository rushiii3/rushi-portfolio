"use client";
import { Reveal } from "../motion";
import { personalInfo } from "@/content/info";
import SectionTitle from "../SectionTitle";

const AboutMe = () => {
  return (
    <section className="py-12 lg:py-16">
      <div className="w-full">
        <div className="text-left">
          <SectionTitle title="About me" className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8" />
          <Reveal.P
            className="w-full text-base font-normal leading-7 text-justify dark:text-neutral-200 text-neutral-800"
          >
            {personalInfo.description}
          </Reveal.P>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
