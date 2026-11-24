import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { BlogMetadata } from "@/lib/blogs";

export function RelatedArticles({ articles }: { articles: BlogMetadata[] }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section aria-labelledby="related-articles-title" className="mt-14 pt-10 border-t border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center justify-between mb-6">
        <h2 id="related-articles-title" className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Related Articles
        </h2>
        <Link
          href="/blog"
          className="text-xs md:text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          View all &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group flex flex-col justify-between p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all"
          >
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                  {article.category}
                </Badge>
                {article.readingMinutes > 0 && (
                  <span className="text-[11px] text-neutral-600 dark:text-neutral-400">
                    {article.readingMinutes} min read
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-sm md:text-base leading-snug group-hover:text-neutral-900 dark:group-hover:text-white transition-colors line-clamp-2 mb-2 text-neutral-800 dark:text-neutral-200">
                {article.title}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                {article.description}
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-end text-xs font-medium text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
              Read article &rarr;
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RelatedArticles;
