import { getAllBlogs } from "@/lib/blogs";

export const dynamic = "force-static";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://hrushikeshshinde.tech";
  const { blogs } = await getAllBlogs(100);

  const rssItems = blogs
    .map((blog) => {
      const postUrl = `${baseUrl}/blog/${blog.slug}`;
      const pubDate = new Date(blog.date).toUTCString();
      return `    <item>
      <title><![CDATA[${blog.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${blog.description}]]></description>
      <category><![CDATA[${blog.category}]]></category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Hrushikesh Shinde — Cybersecurity Blog</title>
    <link>${baseUrl}/blog</link>
    <description>In-depth technical articles on web security, penetration testing, vulnerability research, and application security by Hrushikesh Shinde.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
