"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { memo, useMemo } from "react";

interface Article {
  slug: string;
  date: string;
  description: string;
  image: string;
  title: string;
  category: string;
}

// ✅ Formatter created once at module scope — not recreated per render
const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const BlogCard = memo(function BlogCard({
  article,
  priority = false,
}: {
  article: Article;
  priority?: boolean;
}) {
  // ✅ useMemo — only recomputes when article.date changes
  const formattedDate = useMemo(
    () => (article.date ? DATE_FORMATTER.format(new Date(article.date)) : ""),
    [article.date],
  );

  console.log("priority", priority);
  return (
    <Link href={`/blog/${article.slug}`} aria-label={article.title}>
      <Card className="group cursor-pointer pt-0 rounded-2xl bg-transparent gap-5 h-full">
        <div className="relative aspect-video rounded-2xl overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            quality={85}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 512px"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        <div className="flex flex-row gap-2 justify-between items-center w-full px-6">
          {/* ✅ aria-label gives screen readers context for the badge */}
          <Badge
            className="uppercase"
            aria-label={`Category: ${article.category}`}
          >
            {article.category}
          </Badge>
        </div>

        <CardHeader>
          <CardTitle className="hover:underline transition-all">
            {article.title}
          </CardTitle>
          <CardDescription>{article.description}</CardDescription>
        </CardHeader>

        <div className="mt-auto flex flex-row gap-2 justify-between items-center w-full px-6 pb-6">
          {formattedDate && (
            // ✅ <time> is the semantic element for dates
            <time dateTime={article.date} className="text-sm font-medium">
              {formattedDate}
            </time>
          )}
        </div>
      </Card>
    </Link>
  );
});

export default BlogCard;
