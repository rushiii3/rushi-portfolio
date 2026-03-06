"use client";
import { Button } from "@/components/ui/button";
import { TerminalIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Error components must be Client Components

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  return (
    <div className="relative w-full flex flex-col items-center justify-center text-center md:pt-32 pt-16">
      <div className="mb-8">
        <TerminalIcon className="text-primary text-6xl opacity-80" />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-primary tracking-tighter text-[120px] md:text-[180px] font-bold leading-none select-none opacity-90">
          500
        </h1>
        <div className="mt-4 space-y-4">
          <h2 className="text-slate-900 dark:text-slate-100 text-2xl md:text-3xl font-bold tracking-tight uppercase">
            Internal Server Error
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mx-auto leading-relaxed">
            Oops something went wrong. <br />
            Try to refresh this page or feel free to contact us if the problem
            presists. <br />
            {error.message}
          </p>
        </div>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
          <Button
            size={"lg"}
            className="w-full sm:w-auto min-w-[180px]"
            onClick={() => router.refresh()}
          >
            <span className="truncate text-lg">Try Again</span>
          </Button>
          <Button
            variant={"secondary"}
            size={"lg"}
            asChild
            className="w-full sm:w-auto min-w-[180px]"
          >
            <Link href="/">
              <span className="truncate text-lg">Go Back Home</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
