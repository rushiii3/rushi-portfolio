import BlogShimmer from "@/components/BlogShimmer";
import PaginatedBlogList from "@/components/PaginatedBlogList";
import { blogCategories } from "@/content/info";
import { getAllBlogs } from "@/lib/blogs";
import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

// ✅ Resolve params once, share between generateMetadata and Page
function resolveCategory(slug: string) {
  if (slug === "all") redirect("/blog");
  const category = blogCategories.find((c) => c.slug === slug);
  if (!category) redirect("/blog");
  return category;
}

export async function generateStaticParams() {
  return blogCategories
    .filter((category) => category.slug !== "all")
    .map((category) => ({ slug: category.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ search?: string; page?: string }>;
}): Promise<Metadata> {
  const [{ slug }, searchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ]);

  const category = resolveCategory(slug);
  const { search, page } = searchParams;
  const canonicalUrl = `/blog/category/${slug}`;
  const pageTitle = page && page !== "1" ? `${category.name} – Page ${page}` : category.name;
  const description = category.intro;

  // ✅ Don't index search results or empty categories
  const { total } = await getAllBlogs(1, 1, category.name);
  if (search || total === 0) {
    return {
      title: pageTitle,
      description,
      alternates: { canonical: canonicalUrl },
      robots: { index: false, follow: true },
    };
  }

  return {
    title: pageTitle,
    description,
    alternates: { canonical: canonicalUrl },
    // ✅ Fixed: category was an object, not a string — keywords were "[object Object] blog"
    keywords: [
      `${category.name} blog`,
      `${category.name} articles`,
      `${category.name} tutorials`,
      "cybersecurity blog",
      "application security",
      "penetration testing",
    ],
    openGraph: {
      title: pageTitle,
      description,
      url: canonicalUrl,
      type: "website",
      images: ["/og.webp"],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: ["/og.webp"],
    },
  };
}

const Page = async (props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ search?: string; page?: string }>;
}) => {
  const [{ slug }, searchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ]);

  const category = resolveCategory(slug);
  const search = searchParams?.search ?? "";
  const currentPage = Number(searchParams?.page) || 1;  
  return (
    <>
      {search && <p>You searched for &#34;{search}&#34;</p>}
      <Suspense key={`${slug}-${currentPage}`} fallback={<BlogShimmer />}>
        <PaginatedBlogList
          category={category.name}
          page={currentPage}
          search={search}
          slug={slug}
        />
      </Suspense>
    </>
  );
};

export default Page;