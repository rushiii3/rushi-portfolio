"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDisplayDate } from "@/lib/helper";

interface BlogNavItem {
  slug: string;
  title: string;
  date: string;
}

interface BlogNavigationProps {
  previous: BlogNavItem | null;
  next: BlogNavItem | null;
}

export function BlogPostNavigation({
  previous,
  next,
}: BlogNavigationProps) {
  if (!previous && !next) return null;

  return (
    <div className="space-y-6 my-12 border-t pt-12 border-slate-200 dark:border-primary/20">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Previous */}
        {previous ? (
          <Link href={`/blog/${previous.slug}`} className="group">
            <Card className="h-full transition hover:border-primary/50 bg-primary/5">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ChevronLeft className="h-4 w-4" />
                  Previous Post
                </div>

                <CardTitle className="group-hover:text-primary transition">
                  {previous.title}
                </CardTitle>

                <div className="pt-2 text-xs text-muted-foreground">
                  {formatDisplayDate(previous.date)}
                </div>
              </CardHeader>
            </Card>
          </Link>
        ) : (
          <div />
        )}

        {/* Next */}
        {next ? (
          <Link href={`/blog/${next.slug}`} className="group">
            <Card className="h-full transition hover:border-primary/50 bg-primary/5">
              <CardHeader>
                <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
                  Next Post
                  <ChevronRight className="h-4 w-4" />
                </div>

                <CardTitle className="text-right group-hover:text-primary transition">
                  {next.title}
                </CardTitle>
                <div className="pt-2 text-xs text-right text-muted-foreground">
                  {formatDisplayDate(next.date)}
                </div>
              </CardHeader>
            </Card>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}