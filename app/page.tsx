import AboutMe from "@/components/sections/about-me";
import Blogs from "@/components/sections/blog";
import { Experience } from "@/components/sections/experience";
import { Hero1 } from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import { buildPersonSchema, buildWebSiteSchema, escapeJsonLd } from "@/lib/schemaBuilder";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const siteUrl = process.env.NEXT_PUBLIC_URL?.replace(/\/$/, "") || "https://hrushikeshshinde.tech";

const Skills = dynamic(() => import("@/components/sections/skills"), {
  loading: () => <SkillsSectionFallback />,
});

function ProjectsSectionFallback() {
  return (
    <section className="py-12 lg:py-16 w-full text-white" aria-busy="true">
      <div className="text-left w-full">
        <div className="h-12 md:h-16 w-72 rounded bg-neutral-800/70 animate-pulse" />
        <div className="mt-8 h-10 w-full max-w-md rounded bg-neutral-800/60 animate-pulse" />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-52 rounded bg-neutral-800/50 animate-pulse" />
          <div className="h-52 rounded bg-neutral-800/50 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

function BlogsSectionFallback() {
  return (
    <section className="pt-12 lg:pt-16 w-full" aria-busy="true">
      <div className="w-full text-left">
        <div className="h-12 md:h-16 w-48 rounded bg-neutral-800/70 animate-pulse" />
        <div className="mt-8 space-y-4">
          <div className="h-24 rounded bg-neutral-800/50 animate-pulse" />
          <div className="h-24 rounded bg-neutral-800/50 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

function SkillsSectionFallback() {
  return (
    <section className="py-12 lg:py-16 w-full" aria-busy="true">
      <div className="w-full">
        <div className="h-12 md:h-16 w-80 rounded bg-neutral-800/70 animate-pulse" />
        <div className="mt-8 h-80 rounded-2xl bg-neutral-800/50 animate-pulse" />
      </div>
    </section>
  );
}

async function ProjectsSection({
  searchParamsPromise,
}: {
  searchParamsPromise?: Promise<{ projectCategory?: string }>;
}) {
  const searchParams = await searchParamsPromise;
  const projectCategory = searchParams?.projectCategory || "All";
  return <Projects limit={6} projectCategory={projectCategory} />;
}

export default function Home(props: {
  searchParams?: Promise<{
    projectCategory?: string;
  }>;
}) {
  const personSchema = buildPersonSchema(siteUrl);
  const websiteSchema = buildWebSiteSchema(siteUrl);

  return (
    <div className="min-h-sdvh w-full flex flex-col justify-center items-start">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(websiteSchema) }}
      />
      <Hero1 />
      <AboutMe />
      <Skills />
      <Experience />
      <Suspense fallback={<ProjectsSectionFallback />}>
        <ProjectsSection searchParamsPromise={props.searchParams} />
      </Suspense>
      <Suspense fallback={<BlogsSectionFallback />}>
        <Blogs />
      </Suspense>
    </div>
  );
}
