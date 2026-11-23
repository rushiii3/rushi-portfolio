import { ListTree, ChevronDown } from "lucide-react";

export interface TocItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export function extractToc(content?: string): TocItem[] {
  if (!content) return [];

  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  const slugCounts = new Map<string, number>();

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const rawTitle = match[2]
      .trim()
      .replace(/\*\*|__|`/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

    let id = rawTitle
      .toLowerCase()
      .replace(/<[^>]+>/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const count = slugCounts.get(id) || 0;
    slugCounts.set(id, count + 1);
    const finalId = count > 0 ? `${id}-${count}` : id;

    items.push({ id: finalId, title: rawTitle, level });
  }

  return items;
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (!items || items.length < 3) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="my-6"
    >
      <details
        className="group p-4 md:p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40"
      >
        <summary className="flex items-center justify-between font-semibold text-sm text-neutral-900 dark:text-neutral-100 cursor-pointer list-none select-none">
          <div className="flex items-center gap-2">
            <ListTree className="size-4 text-neutral-500" />
            <span>Table of Contents</span>
            <span className="text-xs font-normal text-neutral-400">
              ({items.length} sections)
            </span>
          </div>
          <ChevronDown className="size-4 text-neutral-400 transition-transform group-open:rotate-180" />
        </summary>

        <ol className="mt-3.5 space-y-1 pt-3 border-t border-neutral-200/80 dark:border-neutral-800 text-xs md:text-sm">
          {items.map((item) => (
            <li
              key={item.id}
              className={
                item.level === 3
                  ? "pl-4 text-neutral-500 dark:text-neutral-400"
                  : "text-neutral-700 dark:text-neutral-300 font-medium"
              }
            >
              <a
                href={`#${item.id}`}
                className="hover:text-neutral-900 dark:hover:text-white transition-colors hover:underline block py-0.5 line-clamp-1"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}

export default TableOfContents;
