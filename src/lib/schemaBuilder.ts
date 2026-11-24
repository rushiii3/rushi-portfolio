import type {
  WithContext,
  BlogPosting,
  FAQPage,
  Question,
  CollectionPage,
  ListItem,
  Person,
  ImageObject,
  BreadcrumbList,
  SoftwareApplication,
  WebSite,
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

function buildImage(
  url: string,
  options?: {
    id?: string;
    caption?: string;
    authorUrl?: string;
    articleId?: string;
    width?: string;
    height?: string;
  },
): ImageObject {
  return {
    "@type": "ImageObject",
    ...(options?.id ? { "@id": options.id } : {}),
    url,
    contentUrl: url,
    width: options?.width || "1200",
    height: options?.height || "675",
    ...(options?.caption ? { caption: options.caption, description: options.caption } : {}),
    ...(options?.authorUrl ? { creator: buildAuthor(options.authorUrl) } : {}),
    ...(options?.articleId ? { isPartOf: { "@id": options.articleId } } : {}),
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
  contentImages,
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
  contentImages?: string[];
  keywords: string[];
  wordCount: number;
  logoUrl: string;
  authorUrl: string;
  category: string;
  readingMinutes: number;
}): WithContext<BlogPosting> {
  const articleId = `${canonicalUrl}#article`;
  const heroImageObj = buildImage(imageUrl, {
    id: `${canonicalUrl}#primaryimage`,
    authorUrl,
    articleId,
    width: "1200",
    height: "630",
  });

  const contentImageObjs = (contentImages || []).map((imgUrl, idx) =>
    buildImage(imgUrl, {
      id: `${canonicalUrl}#image-${idx + 1}`,
      authorUrl,
      articleId,
      width: "1200",
      height: "675",
    }),
  );

  const allImages = [heroImageObj, ...contentImageObjs];

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",

    "@id": articleId,
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

    image: allImages,

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
  siteUrl = "https://hrushikeshshinde.tech",
}: {
  blogUrl?: string;
  blogName?: string;
  description?: string;
  authorUrl?: string;
  siteUrl?: string;
  posts: {
    title: string;
    slug: string;
    description: string;
    date: string;
    image: string;
  }[];
}) {
  const cleanBlogUrl = (blogUrl || `${siteUrl}/blog`).replace(/\/$/, "");

  return {
    "@type": "CollectionPage",
    "@id": cleanBlogUrl,
    url: cleanBlogUrl,
    name: blogName || "Blog",
    description: description || "",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map(
        (post, index): ListItem => {
          const postUrl = `${siteUrl}/blog/${post.slug}`;
          return {
            "@type": "ListItem",
            position: index + 1,
            url: postUrl,
            item: {
              "@type": "BlogPosting",
              "@id": `${postUrl}#article`,
              headline: post.title,
              description: post.description,
              datePublished: toSchemaDate(post.date),
              author: buildAuthor(authorUrl || `${siteUrl}/about`),
              image: buildImage(post.image),
            },
          };
        },
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
  blogUrl,
}: {
  categoryName: string;
  categoryUrl: string;
  description: string;
  authorUrl: string;
  blogUrl?: string;
  posts: {
    title: string;
    slug: string;
    description: string;
    date: string;
    image: string;
  }[];
}): WithContext<CollectionPage> {
  const cleanCategoryUrl = categoryUrl.replace(/\/$/, "");
  const postBaseUrl = (
    blogUrl || cleanCategoryUrl.replace(/\/category\/[^/]+$/, "")
  ).replace(/\/$/, "");

  const schema: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",

    "@id": cleanCategoryUrl,
    url: cleanCategoryUrl,
    name: `${categoryName} Articles`,
    description,
  };

  if (posts.length > 0) {
    schema.mainEntity = {
      "@type": "ItemList",

      itemListElement: posts.map(
        (post, index): ListItem => {
          const postUrl = `${postBaseUrl}/${post.slug}`;
          return {
            "@type": "ListItem",
            position: index + 1,

            url: postUrl,

            item: {
              "@type": "BlogPosting",
              "@id": `${postUrl}#article`,
              headline: post.title,
              description: post.description,
              datePublished: toSchemaDate(post.date),
              author: buildAuthor(authorUrl),
              image: buildImage(post.image),
            },
          };
        },
      ),
    };
  }

  return schema;
}

/* ------------------------------------------------ */
/* JSON-LD String Escaper */
/* ------------------------------------------------ */

export function escapeJsonLd(schema: unknown): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

/* ------------------------------------------------ */
/* Person Schema */
/* ------------------------------------------------ */

export function buildPersonSchema(siteUrl: string): WithContext<Person> {
  const cleanUrl = siteUrl.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${cleanUrl}/#person`,
    name: "Hrushikesh Shinde",
    givenName: "Hrushikesh",
    familyName: "Shinde",
    url: `${cleanUrl}/about`,
    image: `${cleanUrl}/profile.webp`,
    jobTitle: "Associate Information Security Consultant",
    worksFor: {
      "@type": "Organization",
      name: "qSEAp Infotech Pvt. Ltd",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressCountry: "IN",
    },
    sameAs: [
      "https://github.com/rushiii3",
      "https://www.linkedin.com/in/hrushikesh-shinde-developer/",
      "https://profile.hackthebox.com/profile/019ccd33-4310-73b7-8223-264faac08c09",
    ],
    knowsAbout: [
      "Application Security",
      "Vulnerability Assessment & Penetration Testing (VAPT)",
      "OWASP Top 10",
      "Burp Suite",
      "Web Application Security",
      "Ethical Hacking",
      "Network Security",
    ],
  };
}

/* ------------------------------------------------ */
/* WebSite Schema */
/* ------------------------------------------------ */

export function buildWebSiteSchema(siteUrl: string): WithContext<WebSite> {
  const cleanUrl = siteUrl.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${cleanUrl}/#website`,
    url: cleanUrl,
    name: "Hrushikesh Shinde",
    description:
      "Personal portfolio and cybersecurity blog of Hrushikesh Shinde, Application Security Consultant & VAPT Specialist.",
    publisher: {
      "@id": `${cleanUrl}/#person`,
    },
    inLanguage: "en-US",
  };
}

/* ------------------------------------------------ */
/* Breadcrumb Schema */
/* ------------------------------------------------ */

export function buildBreadcrumbSchema(
  items: { name: string; url?: string }[],
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

/* ------------------------------------------------ */
/* Project Schema (SoftwareApplication) */
/* ------------------------------------------------ */

export function buildProjectSchema({
  title,
  description,
  date,
  image,
  stack,
  github,
  link,
  canonicalUrl,
  authorUrl,
}: {
  title: string;
  description: string;
  slug: string;
  date: string;
  image: string;
  stack?: string[];
  github?: string;
  link?: string;
  canonicalUrl: string;
  authorUrl: string;
}): WithContext<SoftwareApplication> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${canonicalUrl}#software`,
    url: canonicalUrl,
    name: title,
    description,
    applicationCategory: "SecurityApplication",
    operatingSystem: "Web, Cross-Platform",
    ...(image ? { image: buildImage(image) } : {}),
    datePublished: toSchemaDate(date),
    author: buildAuthor(authorUrl),
    ...(stack && stack.length > 0 ? { keywords: stack.join(", ") } : {}),
    ...(github ? { codeRepository: github } : {}),
    ...(link ? { installUrl: link } : {}),
  };
}
