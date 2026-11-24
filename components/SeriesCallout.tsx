import Link from "next/link";
import { getSeriesBlogs } from "@/lib/blogs";
import { Layers, ChevronDown } from "lucide-react";

export async function SeriesCallout({
  seriesName,
  currentSlug,
  currentOrder,
}: {
  seriesName: string;
  currentSlug: string;
  currentOrder?: number;
}) {
  const seriesPosts = await getSeriesBlogs(seriesName);
  if (!seriesPosts || seriesPosts.length <= 1) return null;

  return (
    <div className="my-6 p-4 md:p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 text-neutral-900 dark:text-neutral-200">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
        <Layers className="size-4 shrink-0" />
        <span>
          Series: {seriesName}{" "}
          {currentOrder ? `• Part ${currentOrder} of ${seriesPosts.length}` : ""}
        </span>
      </div>
      <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 mb-3">
        This article is part of a structured guide to foundational cybersecurity principles and network architecture.
      </p>

      <details className="group">
        <summary className="flex items-center justify-between text-xs font-medium hover:underline cursor-pointer list-none py-1">
          <span>View all {seriesPosts.length} chapters in this series</span>
          <ChevronDown className="size-3.5 transition-transform group-open:rotate-180" />
        </summary>
        <ol className="mt-3 space-y-2 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-xs">
          {seriesPosts.map((post, idx) => {
            const isCurrent = post.slug === currentSlug;
            return (
              <li key={post.slug} className="flex items-start gap-2">
                <span className="font-mono text-neutral-600 dark:text-neutral-400 shrink-0">
                  {idx + 1}.
                </span>
                {isCurrent ? (
                  <span
                    className="font-semibold text-neutral-900 dark:text-white"
                    aria-current="page"
                  >
                    {post.title}{" "}
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 ml-1.5">
                      Current
                    </span>
                  </span>
                ) : (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors line-clamp-1"
                  >
                    {post.title}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </details>
    </div>
  );
}

export default SeriesCallout;
