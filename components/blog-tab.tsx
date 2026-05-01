"use client";
import { useState, useTransition, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Tabs from "./Tabs";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { blogCategories } from "@/content/info";

const TRANSITION = { duration: 0.3 } as const;
const CATEGORY_NAMES = blogCategories.map((c) => c.name);

const BlogTab = ({ tab }: { tab: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState(
    () => searchParams.get("search") ?? "",
  );

  // ✅ Ref-based debounce — never runs on mount, only on user interaction
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);

      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
          params.set("search", value);
        } else {
          params.delete("search");
        }
        startTransition(() => {
          router.replace(`?${params.toString()}`, { scroll: false });
        });
      }, 500);
    },
    [searchParams, router],
  );

  const clearSearch = useCallback(() => handleSearch(""), [handleSearch]);

  const handleCategory = useCallback(
    (term: string) => {
      const category = blogCategories.find((c) => c.name === term);
      if (!category) return;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      setSearchTerm("");
      if (category.slug === "all") {
        router.push("/blog");
      } else {
        router.push(`/blog/category/${category.slug}`);
      }
    },
    [router],
  );

  const toggleSearch = useCallback(() => {
    setIsVisible((v) => {
      if (v) handleSearch("");
      return !v;
    });
  }, [handleSearch]);

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="flex flex-col md:flex-row items-center gap-5 justify-between mb-5">
        <div className="w-full">
          <AnimatePresence mode="popLayout" initial={false}>
            {!isVisible ? (
              <m.div
                key="tabs"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={TRANSITION}
              >
                <Tabs
                  items={CATEGORY_NAMES}
                  category={tab}
                  handleClick={handleCategory}
                  layoutId="blogCategory"
                />
              </m.div>
            ) : (
              <m.div
                key="search"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={TRANSITION}
                className="w-full"
              >
                <div className="relative max-w-4xl">
                  <Input
                    autoFocus
                    placeholder="Filter..."
                    className={`w-full transition-opacity ${
                      isPending ? "opacity-50" : "opacity-100"
                    }`}
                    value={searchTerm}
                    // ✅ Drives debounce directly — no useEffect involvement
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  {searchTerm && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                      onClick={clearSearch}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Clear</span>
                    </Button>
                  )}
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>

        <div className="ml-auto">
          <Button
            className="rounded-full relative overflow-hidden"
            size="icon"
            aria-label={isVisible ? "Close search" : "Open search"}
            onClick={toggleSearch}
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={isVisible ? "close" : "search"}
                initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                transition={TRANSITION}
                className="absolute inset-0 flex items-center justify-center"
              >
                {isVisible ? <X /> : <Search />}
              </m.div>
            </AnimatePresence>
          </Button>
        </div>
      </div>
    </LazyMotion>
  );
};

export default BlogTab;