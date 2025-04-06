import React from "react";
import BlogTab from "@/components/blog-tab";
import PaginatedBlogList from "@/components/PaginatedBlogList";
import Image from "next/image";
import Link from "next/link";

const Page = async (props: {
  searchParams?: Promise<{
    search?: string;
    category?: string;
    page?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const category = searchParams?.category || "All";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="min-h-screen text-white w-full md:pt-14">
      {/* Hero Section */}
      <div className="pt-12 lg:pt-16 w-full ">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
          Blogs
        </h1>
        {/* <p className="text-gray-400 max-w-2xl">
          The Untitled UI Journal features carefully selected good works from
          studios and designers from around the globe. Subscribe for new posts
          in your inbox every Thursday for free.
        </p> */}
      </div>

      {/* Featured Article */}
      <div className="w-full mx-auto mb-16">
        <div className="relative rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1662638600476-d563fffbb072?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Featured"
            height={780}
            width={1170}
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
            <Link href={`blog/owasp-top-10`}>
            <h2 className="text-2xl font-bold mb-2">
              OWASP Top 10: Essential Web Security Risks Every Developer Should
              Know
            </h2>
            </Link>
            <p className="text-gray-300 mb-4">
              A comprehensive guide to understanding and mitigating the top
              security risks in web applications, as outlined by OWASP.
            </p>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                Web Security
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Grid */}
      <div className="">
        <BlogTab />
        {search && <p>You searched for &#34;{search}&#34; </p>}
        <PaginatedBlogList
          category={category}
          page={currentPage}
          search={search}
        />
      </div>
    </div>
  );
};

export default Page;
