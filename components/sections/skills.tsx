/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion } from "framer-motion";
import React from "react";
import {
  SiGithub,
  SiFigma,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiJest,
  SiShopify,
  SiFramer,
} from "react-icons/si";
import { FaCode, FaTools } from "react-icons/fa";
import { Badge } from "../ui/badge";
import { Tabs } from "../ui/tabs";
// import { Button } from "../ui/button";
// import { Download, Phone } from "lucide-react";
// import Image from "next/image";
const transition = { duration: 1.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 };
const variants = {
  hidden: {
    filter: "blur(10px)",
    opacity: 0,
  },
  visible: {
    filter: "blur(0)",
    opacity: 1,
    transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};
const skillsData = {
  frontend: {
    languages: ["HTML", "CSS", "JavaScript", "TypeScript", "Dart"],
    frameworks: [
      { name: "React.js", icon: <SiReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "Shopify", icon: <SiShopify /> },
      { name: "Framer", icon: <SiFramer /> },
    ],
    state_management: ["Zustand", { name: "Redux", icon: <SiRedux /> }],
    data_fetching: ["TanStack Query", "Axios"],
    styling: [
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      "Styled Components",
      "CSS Modules",
      "SASS",
      "Bootstrap",
    ],
    ui_libraries: ["Material UI", "Mantine UI", "Chakra UI", "Shadcn UI"],
    animations: ["Framer Motion", "Motion"],
    cross_platform: ["React Native", "Flutter"],
  },
  backend: {
    languages: ["Node.js", "Bun"],
    frameworks: ["Express.js", "Socket.io", "Mongoose", "Prisma", "Drizzle"],
    databases: [
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      "SQLite",
      "Redis",
    ],
    cms: ["Firebase", "Supabase", "Appwrite", "Sanity.io", "Payload CMS"],
    authentication: ["JWT", "OAuth/OIDC"],
    hosting: ["Vercel", "Netlify"],
    scalability: ["WebSockets", "WebRTC", "Cloudinary"],
  },
  security: {
    fundamentals: ["OWASP Top 10", "Secure Coding", "Encryption", "CSP"],
    testing: [
      "Penetration Testing",
      "Security Audits",
      "Vulnerability Assessment",
      "Threat Modeling",
    ],
    tools: ["Burp Suite", "OWASP ZAP", "Metasploit", "SAST/DAST"],
  },
  devops: {
    ci_cd: [{ name: "Docker", icon: <SiDocker /> }, "GitHub Actions"],
    testing: [
      { name: "Jest", icon: <SiJest /> },
      "React Testing Library",
      "Postman",
    ],
    debugging: ["React DevTools", "Chrome DevTools"],
  },
  tools: [
    { name: "VS Code", icon: <FaCode /> },
    { name: "Git", icon: <FaCode /> },
    { name: "GitHub", icon: <SiGithub /> },
    { name: "ESLint", icon: <FaTools /> },
    { name: "Figma", icon: <SiFigma /> },
  ],
};


const Skills = () => {
  const SkillCategory = ({ title, skills }: { title: string; skills: any[] }) => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold capitalize mb-2">{title.replace("_", " ")}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((item, index) => (
          <Badge key={index} className="flex items-center gap-1 border-[0.5px] border-white px-3 py-1 dark:text-foreground dark:bg-background rounded-lg">
            {item.icon && <span>{item.icon}</span>}
            {item.name || item}
          </Badge>
        ))}
      </div>
    </div>
  );
  
  const SkillContent = ({ title, data }: { title: string; data: any }) => (
    <div className="w-full  relative h-full overflow-hidden rounded-2xl p-10 text-xl md:text-4xl font-bold text-white  border-[0.5px] border-white">
      <h2 className="text-2xl font-bold mb-4">{title} Skills</h2>
      <div className="flex flex-col gap-2">
        {Object.entries(data).map(([category, items]) => (
          <SkillCategory key={category} title={category} skills={items as any[]} />
        ))}
      </div>
    </div>
  );
  
  const tabs = [
    { title: "Frontend", value: "frontend", content: <SkillContent title="Frontend" data={skillsData.frontend} /> },
    { title: "Backend", value: "backend", content: <SkillContent title="Backend" data={skillsData.backend} /> },
    { title: "Security", value: "security", content: <SkillContent title="Security" data={skillsData.security} /> },
    { title: "Tools", value: "tools", content: <SkillContent title="Tools" data={{ tools: skillsData.tools }} /> },
  ];
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
          className="mb-6 text-2xl tracking-tight font-extrabold text-white sm:text-3xl md:text-4xl"
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
