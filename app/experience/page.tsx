import { Experience } from "@/components/sections/experience";
import { buildBreadcrumbSchema, escapeJsonLd } from "@/lib/schemaBuilder";
import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_URL?.replace(/\/$/, "") || "https://hrushikeshshinde.tech";

export const metadata: Metadata = {
  title: "Experience & Career",
  description:
    "Professional cybersecurity experience at qSEAp Infotech and Hacktify: web app VAPT, FinTech security assessments, OWASP remediation, and offensive testing.",
  alternates: {
    canonical: "/experience",
  },
  openGraph: {
    title: "Experience & Career | Hrushikesh Shinde",
    description:
      "Professional cybersecurity experience at qSEAp Infotech and Hacktify: web app VAPT, FinTech security assessments, OWASP remediation, and offensive testing.",
    url: "/experience",
    type: "profile",
  },
};

const Page = () => {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: `${siteUrl}/` },
    { name: "Experience", url: `${siteUrl}/experience` },
  ]);

  return (
    <div className="w-full md:pt-14">
      <h1 className="sr-only">Work Experience & Career — Hrushikesh Shinde</h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(breadcrumbSchema) }}
      />
      <Experience />
    </div>
  );
};

export default Page;
