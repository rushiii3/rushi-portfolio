import BlogShimmer from "@/components/BlogShimmer";
import PaginatedBlogList from "@/components/PaginatedBlogList";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(props: {
  searchParams?: Promise<{
    search?: string;
    category?: string;
    page?: string;
  }>;
}): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const page =  searchParams?.page ?? "1";
  const search = searchParams?.search;

  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  const params = new URLSearchParams();

  if (page && page !== "1") params.set("page", page);

  // Optional: usually search pages should NOT be indexed
  if (search) {
    return {
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const canonicalUrl = `${baseUrl}/blog${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  const pageTitle =
    page !== "1"
      ? `Blog – Page ${page} | Hrushikesh Shinde`
      : "Blog | Hrushikesh Shinde";

  const description =
    "In-depth technical articles on web security, penetration testing, vulnerability research, application security, security tools, and real-world exploit writeups.";

  return {
    title: pageTitle,
    description: description,
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: [
      "cybersecurity blog",
      "web security",
      "penetration testing",
      "application security",
      "vulnerability research",
      "OWASP",
      "VAPT",
      "secure coding",
    ],
    openGraph: {
      title: pageTitle,
      description: description,
      url: canonicalUrl,
      type: "website",
      images: ["/og.webp"],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: description,
      images: ["/og.webp"],
    },
  };
}

const Page = async (props: {
  searchParams?: Promise<{
    search?: string;
    category?: string;
    page?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      {search ? <p>You searched for &#34;{search}&#34; </p> : null}
      <Suspense fallback={<BlogShimmer />}>
        <PaginatedBlogList category="all" page={currentPage} search={search} />
      </Suspense>
    </>
  );
};

export default Page;
