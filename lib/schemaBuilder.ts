import type {
  WithContext,
  BlogPosting,
  FAQPage,
  Question,
  CollectionPage,
  ListItem,
  WebPage,
  Person,
  ImageObject,
} from "schema-dts";

/* ------------------------------------------------ */
/* Helpers */
/* ------------------------------------------------ */

function toSchemaDate(dateInput: string): string {
  const isoDateOnlyPattern = /^\d{4}-\d{2}-\d{2}$/;

  if (isoDateOnlyPattern.test(dateInput)) {
    return `${dateInput}T00:00:00Z`;
  }

  const parsed = Date.parse(dateInput);
  if (Number.isNaN(parsed)) return new Date().toISOString();

  return new Date(parsed).toISOString();
}

function minutesToISO(minutes: number): string {
  if (!minutes || minutes <= 0) return "PT1M";
  return `PT${Math.ceil(minutes)}M`;
}

function buildAuthor(authorUrl: string): Person {
  return {
    "@type": "Person",
    "@id": authorUrl,
    name: "Hrushikesh Shinde",
    url: authorUrl,
    sameAs: [
      "https://github.com/rushiii3",
      "https://www.linkedin.com/in/hrushikesh-shinde-developer/",
    ],
  };
}

function buildImage(url: string): ImageObject {
  return {
    "@type": "ImageObject",
    url,
    width: "1200",
    height: "630",
  };
}

/* ------------------------------------------------ */
/* Blog Post Schema */
/* ------------------------------------------------ */

export function buildBlogSchema({
  title,
  description,
  publishedAt,
  modifiedAt,
  canonicalUrl,
  imageUrl,
  keywords,
  wordCount,
  logoUrl,
  authorUrl,
  category,
  readingMinutes,
}: {
  title: string;
  description: string;
  publishedAt: string;
  modifiedAt?: string;
  canonicalUrl: string;
  imageUrl: string;
  keywords: string[];
  wordCount: number;
  logoUrl: string;
  authorUrl: string;
  category: string;
  readingMinutes: number;
}): WithContext<BlogPosting> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",

    "@id": `${canonicalUrl}#article`,
    url: canonicalUrl,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },

    headline: title.substring(0, 110),
    description,

    datePublished: toSchemaDate(publishedAt),
    ...(modifiedAt && { dateModified: toSchemaDate(modifiedAt) }),

    author: buildAuthor(authorUrl),

    publisher: {
      "@type": "Organization",
      name: "Hrushikesh Shinde",
      logo: buildImage(logoUrl),
    },

    image: buildImage(imageUrl),

    articleSection: category,
    keywords,
    wordCount,
    timeRequired: minutesToISO(readingMinutes),
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };
}

/* ------------------------------------------------ */
/* FAQ Schema */
/* ------------------------------------------------ */

export function buildFAQSchema(
  faqItems: { question: string; answer: string }[],
): WithContext<FAQPage> | null {
  if (!faqItems.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",

    mainEntity: faqItems.map(
      (item): Question => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      }),
    ),
  };
}

/* ------------------------------------------------ */
/* Blog Listing Schema */
/* ------------------------------------------------ */

export function buildBlogListSchema({
  blogUrl,
  blogName,
  description,
  posts,
  authorUrl,
}: {
  blogUrl: string;
  blogName: string;
  description: string;
  authorUrl: string;
  posts: {
    title: string;
    slug: string;
    description: string;
    date: string;
    image: string;
  }[];
}): WithContext<WebPage> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",

    "@id": blogUrl,
    url: blogUrl,
    name: blogName,
    description,

    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map(
        (post, index): ListItem => ({
          "@type": "ListItem",
          position: index + 1,

          url: `${blogUrl}/${post.slug}`,

          item: {
            "@type": "BlogPosting",
            "@id": `${blogUrl}/${post.slug}#article`,
            headline: post.title,
            description: post.description,
            datePublished: toSchemaDate(post.date),
            author: buildAuthor(authorUrl),
            image: buildImage(post.image),
          },
        }),
      ),
    },
  };
}

/* ------------------------------------------------ */
/* Category Schema */
/* ------------------------------------------------ */

export function buildCategorySchema({
  categoryName,
  categoryUrl,
  description,
  posts,
  authorUrl,
}: {
  categoryName: string;
  categoryUrl: string;
  description: string;
  authorUrl: string;
  posts: {
    title: string;
    slug: string;
    description: string;
    date: string;
    image: string;
  }[];
}): WithContext<CollectionPage> {
  const schema: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",

    "@id": categoryUrl,
    url: categoryUrl,
    name: `${categoryName} Articles`,
    description,
  };

  if (posts.length > 0) {
    schema.mainEntity = {
      "@type": "ItemList",

      itemListElement: posts.map(
        (post, index): ListItem => ({
          "@type": "ListItem",
          position: index + 1,

          url: `${categoryUrl}/${post.slug}`,

          item: {
            "@type": "BlogPosting",
            "@id": `${categoryUrl}/${post.slug}#article`,
            headline: post.title,
            description: post.description,
            datePublished: toSchemaDate(post.date),
            author: buildAuthor(authorUrl),
            image: buildImage(post.image),
          },
        }),
      ),
    };
  }

  return schema;
}
