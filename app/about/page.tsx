import AboutMe from "@/components/sections/about-me";
import Skills from "@/components/sections/skills";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),

  title: "Hrushikesh Shinde | Application Security & VAPT Specialist",
  description:
    "Associate Information Security Consultant specializing in Application Security, VAPT, OWASP Top 10, and web app security testing in Mumbai, India.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL}/about`,
    languages: {
      "en-IN": "/about",
    },
  },
};

const Page = () => {
  return (
    <div className="w-full md:pt-14">
      <AboutMe />
      <Skills />
    </div>
  );
};

export default Page;
