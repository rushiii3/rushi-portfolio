import MDXContent from "@/components/mdx-content";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogBySlug, getAllBlogs } from "@/lib/blogs";
import { cache } from "react";

export const revalidate = 2400;
const siteUrl = process.env.NEXT_PUBLIC_URL?.replace(/\/$/, "");

function toSchemaDate(dateInput: string): string {
  const isoDateOnlyPattern = /^\d{4}-\d{2}-\d{2}$/;

  if (isoDateOnlyPattern.test(dateInput)) {
    return `${dateInput}T00:00:00Z`;
  }

  const parsed = Date.parse(dateInput);
  if (Number.isNaN(parsed)) {
    return new Date().toISOString();
  }

  return new Date(parsed).toISOString();
}

function formatDisplayDate(dateInput: string): string {
  const isoDateOnlyPattern = /^(\d{4})-(\d{2})-(\d{2})$/;
  const match = dateInput.match(isoDateOnlyPattern);

  if (match) {
    const [, year, month, day] = match;
    const date = new Date(
      Date.UTC(Number(year), Number(month) - 1, Number(day)),
    );
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    });
  }

  const parsed = Date.parse(dateInput);
  if (Number.isNaN(parsed)) {
    return dateInput;
  }

  return new Date(parsed).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
}

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
    slug: blog.slug,
  }));
}

// ✅ Correct type
type Params = Promise<{ slug: string }>;

// ✅ 3. Metadata (no extra request thanks to cache)
export async function generateMetadata(props: { params: Params }) {
  const { slug } = await props.params;
  const data = await getBlog(slug);

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [
        {
          url: data.image,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [data.image],
    },
    alternates: siteUrl
      ? {
          canonical: `${siteUrl}/blog/${slug}`,
          languages: {
            "en-IN": `${siteUrl}/blog/${slug}`,
            "x-default": `${siteUrl}/blog/${slug}`,
          },
        }
      : undefined,
  };
}

// ✅ 4. Page
export default async function Page(props: { params: Params }) {
  const { slug } = await props.params;
  const data = await getBlog(slug);
  const faqItems = data.faqSchema ?? [];
  const canonicalUrl = siteUrl ? `${siteUrl}/blog/${slug}` : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description,
    datePublished: toSchemaDate(data.date),
    author: {
      "@type": "Person",
      name: "Hrushikesh Shinde",
    },
    image: data.image,
    ...(canonicalUrl
      ? {
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": canonicalUrl,
          },
        }
      : {}),
    keywords: data.keywords,
    publisher: {
      "@type": "Organization",
      name: "Hrushikesh Shinde",
    },
    isAccessibleForFree: true,
  };

  const faqJsonLd =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;
  return (
    <div className="md:pt-32 pt-16 w-full">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground hover:text-foreground border border-transparent hover:border-white/10 p-2 rounded-2xl transition-all"
      >
        <ArrowLeftIcon className="h-5 w-5" /> <span>Back to blogs</span>
      </Link>
      <article>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {faqJsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
            }}
          />
        ) : null}
        <h1 className="text-4xl md:text-5xl font-bold">{data.title}</h1>
        <p className="my-3 text-xs text-muted-foreground">
          {formatDisplayDate(data.date)}
        </p>
        <Image
          src={data.image}
          alt={data.title}
          width={1200}
          height={630}
          priority
          fetchPriority="high"
          quality={85}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
          className="w-full h-auto object-cover rounded-2xl"
          title={data.title}
        />
        <div className="max-w-full mt-5 prose prose-invert prose-strong:text-white prose-headings:mt-8 prose-headings:font-semibold prose-h1:text-4xl md:prose-h1:text-5xl prose-h2:text-3xl md:prose-h2:text-4xl prose-h3:text-2xl md:prose-h3:text-3xl prose-h4:text-xl md:prose-h4:text-2xl prose-h5:text-lg md:prose-h5:text-xl prose-h6:text-md prose-img:rounded-2xl">
          {data.content ? <MDXContent source={data.content} /> : null}
        </div>
      </article>
    </div>
  );
}
