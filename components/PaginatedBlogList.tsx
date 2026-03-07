import { cache } from "react";
import BlogList from "./BlogList";
import Paginated from "./Paginated";
import { getAllBlogs } from "@/lib/blogs";
import { FolderArchiveIcon, SearchSlash } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import IoMdApps from "@/components/icons/react-icons/icons/IoMdApps";

import { buildBlogListSchema, buildCategorySchema } from "@/lib/schemaBuilder";

const BLOGS_PER_PAGE = 10;

// Cached data fetch (dedupes across metadata + page within a single request)
const getBlogs = cache(
  async (page: number, category: string, search: string) => {
    const data = await getAllBlogs(
      BLOGS_PER_PAGE,
      page,
      category && category.toLowerCase() !== "all" ? category : undefined,
      search
    );
    return data;
  }
);

const PaginatedBlogList = async ({
  search,
  category,
  page,
  slug





}: {search: string;category: string;page: number;slug?: string;}) => {
  const data = await getBlogs(page, category, search);
  if (data.blogs.length === 0 && !search) {
    return (
      <section className="flex flex-col items-center justify-center rounded-2xl border border-primary/10 bg-primary/10 py-12 text-center ">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
          <FolderArchiveIcon
            size={40}
            className="text-primary/40 dark:text-primary/60" />
          
        </div>
        <div className="max-w-md px-4">
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            No articles found in {category}
          </h2>
          <p className="mb-8 text-slate-600 dark:text-slate-400">
            We haven't published any articles in this category yet. Check back
            soon for deep dives into breach mitigation, recovery strategies, and
            forensic analysis.
          </p>
          <Button asChild>
            <Link href="/blog" className="flex items-center gap-2">
              <IoMdApps className="text-lg" />
              View All Posts
            </Link>
          </Button>
        </div>
      </section>);

  }
  if (data.blogs.length === 0 && search)
  return (
    <div className="flex flex-col items-center text-center py-12 border border-primary/10 rounded-2xl shadow-sm mt-10">
        <div className="bg-primary/5 dark:bg-primary/10 rounded-full p-8 mb-6">
          <SearchSlash
          size={40}
          className="text-primary/40 dark:text-primary/60" />
        
        </div>
        <h1 className="text-3xl font-bold text-slate-100 mb-3">
          No results found
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-lg mb-8 text-lg">
          We couldn't find any articles matching "<strong>{search}</strong>".
          Check your spelling.
        </p>
      </div>);


  const totalPages = Math.ceil(data.total / BLOGS_PER_PAGE);
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  const blogListSchema = buildBlogListSchema({
    blogUrl: `${baseUrl}/blog`,
    blogName: "Hrushikesh Shinde",
    description: "Hrushikesh Shinde",
    posts: data.blogs,
    authorUrl: `${baseUrl}/about`
  });


  const blogListByCategorySchema = buildCategorySchema({
    categoryUrl: `${baseUrl}/blog/category/${slug}`,
    categoryName: category,
    description: "Hrushikesh Shinde",
    posts: data.blogs,
    authorUrl: `${baseUrl}/about`
  });

  const schema = category === "all" ? blogListSchema : blogListByCategorySchema;
  const jsonLd = schema ? JSON.stringify(schema).replace(
    /</g,
    "\\u003c"
  ) : null;

  return (
    <>
      {jsonLd &&
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }} />

      }
      <BlogList articles={data?.blogs} />{" "}
      <Paginated totalPages={totalPages} currentPage={page} />
    </>);

};

export default PaginatedBlogList;