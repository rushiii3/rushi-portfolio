import AboutMe from "@/components/sections/about-me";
import Blogs from "@/components/sections/blog";
import { Experience } from "@/components/sections/experience";
import { Hero1 } from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";

export default async function Home() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col justify-center items-start">
      <Hero1 />
      <AboutMe />
      <Skills />
      <Experience />
      <Projects limit={6} />
      <Blogs />
    </div>
  );
}
