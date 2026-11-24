import MDXContent from "@/components/mdx-content";
import Link from "next/link";
import MdOutlineEditCalendar from "@/components/icons/react-icons/icons/MdOutlineEditCalendar";
import MdOutlineCalendarToday from "@/components/icons/react-icons/icons/MdOutlineCalendarToday";
import MdOutlineSchedule from "@/components/icons/react-icons/icons/MdOutlineSchedule";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogBySlug, getAllBlogs, getRelatedBlogs } from "@/lib/blogs";
import { blogCategories } from "@/content/info";
import { cache } from "react";
import RegisterCopyButton from "./_component/RegisterCopyButton";
import {
  buildBlogSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  escapeJsonLd,
} from "@/lib/schemaBuilder";
import { BlogPostNavigation } from "./_component/BlogPostNavigation";
import nextDynamic from "next/dynamic";
import { formatDisplayDate } from "@/lib/helper";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";
import { SeriesCallout } from "@/components/SeriesCallout";
import { TableOfContents, extractToc } from "@/components/TableOfContents";

const ShareArticle = nextDynamic(() => import("./_component/ShareArticle"));

export const dynamic = "force-static";
const siteUrl = process.env.NEXT_PUBLIC_URL?.replace(/\/$/, "") || "https://hrushikeshshinde.tech";

// Cached data fetch (dedupes across metadata + page within a single request)
const getBlog = cache(async (slug: string) => {
  const data = await getBlogBySlug(slug);
  if (!data) return notFound();
  return data;
});

// Static params (pre-renders all blogs at build time)
export async function generateStaticParams() {
  const { blogs } = await getAllBlogs(100);
  return blogs.map((blog) => ({
    slug: blog.slug
  }));
}

// ✅ Correct type
type Params = Promise<{slug: string;}>;

// ✅ 3. Metadata (no extra request thanks to cache)
export async function generateMetadata({ params }: {params: Params;}) {
  const { slug } = await params;
  const data = await getBlog(slug);

  if (!data) return {};

  const canonical = `/blog/${slug}`;

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,

    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    },

    alternates: {
      canonical
    },

    openGraph: {
      type: "article",
      url: canonical,
      title: data.title,
      description: data.description,
      siteName: "Hrushikesh Shinde",
      publishedTime: data.date,
      modifiedTime: data.dateModified || data.date,
      authors: ["Hrushikesh Shinde"],
      images: [
      {
        url: data.image,
        width: 1200,
        height: 630,
        alt: data.title
      }]

    },

    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [data.image],
    },

    category: data.category
  };
}

// ✅ 4. Page
export default async function Page(props: {params: Params;}) {
  const { slug } = await props.params;
  const data = await getBlog(slug);
  const { blogs } = await getAllBlogs(undefined, 1, data?.category);
  const faqItems = data.faqSchema ?? [];
  const canonicalUrl = `${siteUrl}/blog/${slug}`;
  const logoUrl = `${siteUrl}/icon1.png`;
  const authorUrl = `${siteUrl}/about`;

  if (!data) return notFound();
  const articleJsonLd = buildBlogSchema({
    title: data.title,
    description: data.description,
    publishedAt: data.date,
    modifiedAt: data.dateModified || data.date,
    canonicalUrl: canonicalUrl,
    imageUrl: data.image,
    contentImages: data.contentImages || [],
    keywords: data.keywords,
    wordCount: data.wordCount,
    logoUrl: logoUrl,
    authorUrl: authorUrl,
    category: data.category,
    readingMinutes: data.readingMinutes
  });

  const categorySlug =
    blogCategories.find((c) => c.name.toLowerCase() === data.category.toLowerCase())?.slug || "all";

  const faqJsonLd = buildFAQSchema(faqItems);
  const breadcrumbJsonLd = buildBreadcrumbSchema([
    { name: "Home", url: `${siteUrl}/` },
    { name: "Blog", url: `${siteUrl}/blog` },
    { name: data.category, url: `${siteUrl}/blog/category/${categorySlug}` },
    { name: data.title, url: canonicalUrl },
  ]);

  const relatedArticles = await getRelatedBlogs(slug, 3);
  const tocItems = extractToc(data.content);

  return (
    <div className="md:pt-32 pt-16 w-full dark:text-white text-black">
      <article>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: escapeJsonLd(articleJsonLd),
          }}
        />
        
        {faqJsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: escapeJsonLd(faqJsonLd),
            }}
          />
        ) : null}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: escapeJsonLd(breadcrumbJsonLd),
          }}
        />
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: data.category, href: `/blog/category/${categorySlug}` },
            { label: data.title },
          ]}
        />
        <Link href={`/blog/category/${categorySlug}`} className="inline-block mb-3">
          <Badge className="uppercase hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer">
            {data.category}
          </Badge>
        </Link>
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-black  leading-tight tracking-tight">
          {data.title}
        </h1>
        <p className="text-lg  text-slate-700 dark:text-slate-400 max-w-3xl leading-relaxed">
          {data.description}
        </p>

        <div className="flex items-center border-y dark:border-white/10 border-black/10 py-6 justify-center my-5">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs md:text-sm font-medium  dark:text-slate-400 text-slate-600">
            <div className="flex items-center gap-2">
              <MdOutlineCalendarToday className="text-base size-5" />
              <span>
                Published on:{" "}
                <span className="dark:text-slate-300 text-slate-600">
                  {formatDisplayDate(data.date)}
                </span>
              </span>
            </div>
            <span className="hidden md:block w-1 h-1 rounded-full dark:bg-white/20 bg-black/20"></span>
            <div className="flex items-center gap-2">
              <MdOutlineEditCalendar className="text-base size-5" />
              <span>
                Last Modified:{" "}
                <span className="dark:text-slate-300 text-slate-600">
                  {formatDisplayDate(data.dateModified || data.date)}
                </span>
              </span>
            </div>
            <span className="hidden md:block w-1 h-1 rounded-full dark:bg-white/20 bg-black/20"></span>
            <div className="flex items-center gap-2">
              <MdOutlineSchedule className="text-base size-5" />
              <span>
                Reading Time:{" "}
                <span className="dark:text-slate-300 text-slate-600">
                  {data.readingMinutes} min read
                </span>
              </span>
            </div>
          </div>
        </div>
        <Image
          src={data.image}
          alt={data.title}
          width={1200}
          height={630}
          priority
          fetchPriority="high"
          quality={75}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
          className="w-full h-auto object-cover rounded-2xl"
          title={data.title} />
        
        {data.series && (
          <SeriesCallout
            seriesName={data.series}
            currentSlug={data.slug}
            currentOrder={data.seriesOrder}
          />
        )}

        <TableOfContents items={tocItems} />

        <div className="max-w-full mt-5 prose dark:prose-invert prose-strong:text-black dark:prose-strong:text-white  prose-headings:mt-8 prose-headings:font-semibold prose-h1:text-4xl md:prose-h1:text-5xl prose-h2:text-3xl md:prose-h2:text-4xl prose-h3:text-2xl md:prose-h3:text-3xl prose-h4:text-xl md:prose-h4:text-2xl prose-h5:text-lg md:prose-h5:text-xl prose-h6:text-md prose-img:rounded-2xl">
          {data.content ? <MDXContent source={data.content} /> : null}
        </div>
      </article>
      <ShareArticle
        url={canonicalUrl}
        title={data.title}
        hashtags={data.keywords} />
      
      <RelatedArticles articles={relatedArticles} />
      <BlogPostNavigation previous={data.previous} next={data.next} />
      <RegisterCopyButton />
    </div>);

}
