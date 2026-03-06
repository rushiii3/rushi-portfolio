import BlogShimmer from "@/components/BlogShimmer";
import PaginatedBlogList from "@/components/PaginatedBlogList";
import { blogCategories } from "@/content/info";
import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ search: string; page: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const page = searchParams?.page ?? "1";
  if (slug === "all") {
    redirect("/blog");
  }
  const category = blogCategories.find((category) => category.slug === slug);
  if (!category) {
    redirect("/blog");
  }

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

  const canonicalUrl = `${baseUrl}/blog/category/${slug}${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  const pageTitle =
    category && category.slug !== "all"
      ? `${category.name} | Hrushikesh Shinde`
      : "Blog | Hrushikesh Shinde";

  const description =
    category && category.slug !== "all"
      ? category.intro
      : "In-depth technical articles on web security, penetration testing, vulnerability research, application security, security tools, and real-world exploit writeups.";

  return {
    title: pageTitle,
    description: description,
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: [
      `${category} blog`,
      `${category} articles`,
      `${category} tutorials`,
      "cybersecurity blog",
      "application security",
      "penetration testing",
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
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ search: string; page: string }>;
}) => {
  const { slug } = await props.params;
  if (slug === "all") {
    redirect("/blog");
  }
  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;
  const category = blogCategories.find((category) => category.slug === slug);
  if (!category) {
    redirect("/blog");
  }
  return (
    <>
      {search ? <p>You searched for &#34;{search}&#34; </p> : null}
      <Suspense fallback={<BlogShimmer />}>
        <PaginatedBlogList
          category={category?.name || "all"}
          page={currentPage}
          search={search}
          slug={slug}
        />
      </Suspense>
    </>
  );
};

export default Page;
