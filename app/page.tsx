import AboutMe from "@/components/sections/about-me";
import { TimelineDemo } from "@/components/sections/experience";
import { Hero1 } from "@/components/sections/hero";
import Skills from "@/components/sections/skills";

export default function Home() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col justify-center items-start">
      <Hero1 />
      <AboutMe />
      <Skills />
      <TimelineDemo />
    </div>
  );
}
