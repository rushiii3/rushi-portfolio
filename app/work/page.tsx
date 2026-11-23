import Projects from "@/components/sections/projects";
import { buildBreadcrumbSchema, escapeJsonLd } from "@/lib/schemaBuilder";
import { Metadata } from 'next';
import { Suspense } from 'react';

const siteUrl = process.env.NEXT_PUBLIC_URL?.replace(/\/$/, "") || "https://hrushikeshshinde.tech";

export const metadata: Metadata = {
  title: "Projects & Security Tools",
  description:
    "Explore cybersecurity tools, full-stack applications, and open-source projects built by Hrushikesh Shinde, including SecureBlog, MeshFlix, and custom security scripts.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Projects & Security Tools | Hrushikesh Shinde",
    description:
      "Explore cybersecurity tools, full-stack applications, and open-source projects built by Hrushikesh Shinde, including SecureBlog, MeshFlix, and custom security scripts.",
    url: "/work",
    type: "website",
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
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: `${siteUrl}/` },
    { name: "Projects", url: `${siteUrl}/work` },
  ]);

  return (
    <div className="w-full md:pt-14">
      <h1 className="sr-only">Security Projects & Software Tools — Hrushikesh Shinde</h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(breadcrumbSchema) }}
      />
      <Suspense fallback={<div className="h-96 w-full animate-pulse rounded-2xl bg-neutral-800/40" />}>
        <WorkProjects searchParamsPromise={props.searchParams} />
      </Suspense>
    </div>
  );
};

export default Page;
