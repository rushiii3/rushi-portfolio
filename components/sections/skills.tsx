"use client";
import { motion } from "framer-motion";
import React from "react";
import { Tabs } from "../ui/tabs";
import { skillsData } from "@/content/info";
const transition = { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.5 };
const variants = {
  hidden: {
    filter: "blur(10px)",
    opacity: 0,
  },
  visible: {
    filter: "blur(0)",
    opacity: 1,
    transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

type SkillItem = string | { name: string; icon?: React.ComponentType };

type SkillCategoryData = {
  title: string;
  items: SkillItem[];
};

type SkillGroupData = Record<string, SkillCategoryData>;

const SkillCategory = ({
  title,
  skills,
}: {
  title: string;
  skills: SkillCategoryData;
}) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold capitalize mb-2">{title}</h3>

      <div className="flex flex-wrap gap-2">
        {skills.items.map((item, index) => {
          const Icon = typeof item === "string" ? null : item.icon;
          const label = typeof item === "string" ? item : item.name;

          return (
            <h4
              key={`${label}-${index}`}
              className="flex items-center text-xs gap-1 border-[0.5px] border-white px-3 py-1 dark:text-foreground dark:bg-background rounded-lg"
            >
              {Icon ? (
                <span>
                  <Icon />
                </span>
              ) : null}
              {label}
            </h4>
          );
        })}
      </div>
    </div>
  );
};

const SkillContent = ({ title, data }: { title: string; data: SkillGroupData }) => (
  <div className="w-full  relative h-full overflow-hidden rounded-2xl p-10 text-xl md:text-4xl font-bold text-white  border-[0.5px] border-white">
    <h2 className="text-2xl font-bold mb-4">{title} Skills</h2>
    <div className="flex flex-col gap-2">
      {Object.entries(data).map(([category, items]) => (
        <SkillCategory key={category} title={category} skills={items} />
      ))}
    </div>
  </div>
);

const tabs = [
  {
    title: "Security",
    value: "security",
    content: <SkillContent title="Security" data={skillsData.security} />,
  },
  {
    title: "Infrastructure",
    value: "infrastructure",
    content: (
      <SkillContent title="Infrastructure" data={skillsData.infrastructure} />
    ),
  },
  {
    title: "Programming",
    value: "programming",
    content: (
      <SkillContent
        title="Programming"
        data={skillsData.technical_background}
      />
    ),
  },
  {
    title: "Soft Skills",
    value: "soft_skills",
    content: <SkillContent title="Soft Skills" data={skillsData.soft_skills} />,
  },
];

const Skills = () => {
  return (
    <section className="py-12 lg:py-16 w-full">
      <motion.div
        className="w-full"
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.04 }}
        viewport={{ once: true }}
      >
        <motion.h2
          transition={transition}
          variants={variants}
          className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8"
        >
          Skills & Expertise
        </motion.h2>
        <motion.div
          transition={transition}
          variants={variants}
          className="relative [perspective:1000px] flex flex-col max-w-full mx-auto w-full  items-start justify-start"
        >
          {/* h-[50rem] x  */}
          <Tabs tabs={tabs} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
