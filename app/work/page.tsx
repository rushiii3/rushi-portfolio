import Projects from "@/components/sections/projects";
import { Metadata } from 'next';
import { Suspense } from 'react';

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

async function WorkProjects({
  searchParamsPromise,
}: {
  searchParamsPromise?: Promise<{ projectCategory?: string }>;
}) {
  const searchParams = await searchParamsPromise;
  const projectCategory = searchParams?.projectCategory || "All";
  return <Projects projectCategory={projectCategory} />;
}

const Page = (props: {
  searchParams?: Promise<{
    projectCategory?: string;
  }>;
}) => {
  return (
    <div className="w-full md:pt-14">
      <Suspense fallback={<div className="h-96 w-full animate-pulse rounded-2xl bg-neutral-800/40" />}>
        <WorkProjects searchParamsPromise={props.searchParams} />
      </Suspense>
    </div>
  );
};

export default Page;
