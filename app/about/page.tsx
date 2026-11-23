import AboutMe from "@/components/sections/about-me";
import Skills from "@/components/sections/skills";
import { buildBreadcrumbSchema, buildPersonSchema, escapeJsonLd } from "@/lib/schemaBuilder";
import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_URL?.replace(/\/$/, "") || "https://hrushikeshshinde.tech";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn about Hrushikesh Shinde: Application Security Consultant with expertise in penetration testing, threat modeling, security methodology, and DevSecOps.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Hrushikesh Shinde | Application Security Consultant",
    description:
      "Learn about Hrushikesh Shinde: Application Security Consultant with expertise in penetration testing, threat modeling, security methodology, and DevSecOps.",
    url: "/about",
    type: "profile",
  },
};

const Page = () => {
  const personSchema = buildPersonSchema(siteUrl);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: `${siteUrl}/` },
    { name: "About", url: `${siteUrl}/about` },
  ]);

  return (
    <div className="w-full md:pt-14">
      <h1 className="sr-only">About Hrushikesh Shinde</h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(breadcrumbSchema) }}
      />
      <AboutMe />
      <Skills />
    </div>
  );
};

export default Page;
