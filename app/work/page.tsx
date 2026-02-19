import Projects from "@/components/sections/projects";
import React from "react";

const Page = async (props: {
  searchParams?: Promise<{
    projectCategory?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const projectCategory = searchParams?.projectCategory || "All";

  return (
    <div className="w-full md:pt-14">
      <Projects projectCategory={projectCategory} />
    </div>
  );
};

export default Page;
