"use client";
import React, { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Tabs from "./Tabs";

const ProjectTabsWrapper = ({
  items,
  currentCategory,
}: {
  items: string[];
  currentCategory: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category === "All") {
      params.delete("projectCategory");
    } else {
      params.set("projectCategory", category);
    }

    startTransition(() => {
      router.replace(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className={isPending ? "opacity-70 transition-opacity" : ""}>
      <Tabs
        items={items}
        category={currentCategory}
        handleClick={handleCategoryChange}
        layoutId="projectCategory"
      />
    </div>
  );
};

export default ProjectTabsWrapper;
