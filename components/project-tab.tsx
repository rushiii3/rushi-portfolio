"use client";
import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Tabs from "./Tabs";

const ProjectTab = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const items = ["All", "Freelance", "Open-Source", "Personal Projects"];

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("category", term);
    } else {
      params.delete("category");
    }
    push(`?${params.toString()}`, { scroll: false });
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("category", "All");
    push(`?${params.toString()}`, { scroll: false });
  }, []);

  return (
    <Tabs
      category={searchParams.get("category")?.toString()}
      items={items}
      handleClick={handleSearch}
    />
  );
};

export default ProjectTab;
