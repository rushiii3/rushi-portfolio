import Projects from "@/components/sections/projects";
import {Metadata} from 'next'
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
  title: "Work & Projects | Hrushikesh Shinde",
  description:
    "Explore hands-on experience in Application Security, VAPT, penetration testing, OWASP vulnerabilities, and real-world security assessments.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL}/work`,
    languages: {
      "en-IN": "/work",
    },
  },
};

const Page = async (props: {
  searchParams?: Promise<{
    projectCategory?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const projectCategory = searchParams?.projectCategory || "All";

  return (
    <div className="w-full md:pt-14">
      <Projects projectCategory={projectCategory} />
    </div>
  );
};

export default Page;
