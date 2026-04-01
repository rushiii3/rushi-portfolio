import { Experience } from "@/components/sections/experience";
import { Metadata } from "next";
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
  title: "Experience | Hrushikesh Shinde",
  description:
    "Explore hands-on experience in Application Security, VAPT, penetration testing, OWASP vulnerabilities, and real-world security assessments.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL}/experience`,
    languages: {
      "en-IN": "/experience",
    },
  },
};
const Page = () => {
  return (
    <div className="w-full md:pt-14">
      <Experience />
    </div>
  );
};

export default Page;
