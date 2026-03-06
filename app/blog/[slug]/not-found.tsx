import { Button } from "@/components/ui/button";
import { TerminalIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center text-center md:pt-32 pt-16">
      <div className="mb-8">
        <TerminalIcon className="text-primary text-6xl opacity-80" />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-primary tracking-tighter text-[120px] md:text-[180px] font-bold leading-none select-none opacity-90">
          404
        </h1>
        <div className="mt-4 space-y-4">
          <h2 className="text-slate-900 dark:text-slate-100 text-2xl md:text-3xl font-bold tracking-tight uppercase">
            Page Not Found
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mx-auto leading-relaxed">
            Oops! The page you are looking for does not exist or has been moved.
            <br />
            Feel free to check out our other pages or head back to the homepage.
          </p>
        </div>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
          <Button
            size={"lg"}
            asChild
            className="w-full sm:w-auto min-w-[180px]"
          >
            <Link href="/">
              <span className="truncate text-lg">Go Back Home</span>
            </Link>
          </Button>
          <Button
            variant={"secondary"}
            size={"lg"}
            asChild
            className="w-full sm:w-auto min-w-[180px]"
          >
            <Link href="/blog">
              <span className="truncate text-lg">View All Blogs</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}