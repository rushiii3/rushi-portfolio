import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, Briefcase } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <div className="relative mb-6">
        <span className="text-8xl md:text-9xl font-black text-neutral-200 dark:text-neutral-800 select-none">
          404
        </span>
      </div>

      <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3">
        Page Not Found
      </h1>

      <p className="max-w-md text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-8">
        The link you followed may be broken, or the page may have been removed or renamed.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild variant="default" className="gap-2">
          <Link href="/">
            <Home className="size-4" />
            Home
          </Link>
        </Button>
        <Button asChild variant="outline" className="gap-2">
          <Link href="/blog">
            <BookOpen className="size-4" />
            Blog Articles
          </Link>
        </Button>
        <Button asChild variant="outline" className="gap-2">
          <Link href="/work">
            <Briefcase className="size-4" />
            Projects
          </Link>
        </Button>
      </div>
    </div>
  );
}
