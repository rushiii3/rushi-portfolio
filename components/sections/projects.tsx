import React from "react";
import { getAllProjects } from "@/lib/projects";
import ProjectGrid from "../ProjectGrid";
import ProjectTabsWrapper from "../ProjectTabsWrapper";
import SectionTitle from "../SectionTitle";

const Projects = async ({
  limit,
  projectCategory = "All",
}: {
  limit?: number;
  projectCategory?: string;
}) => {
  const items = ["All", "Freelance", "Open-Source", "Personal Projects"];

  // Direct data fetching on the server
  const displayData = await getAllProjects(
    limit,
    projectCategory !== "All" ? projectCategory.toLowerCase() : undefined,
  );

  return (
    <section className="py-12 lg:py-16 w-full text-white">
      <div className="text-left w-full">
        <SectionTitle
          title="Work & Projects"
          className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8"
        />

        <ProjectTabsWrapper items={items} currentCategory={projectCategory} />

        {displayData.length > 0 ? (
          <ProjectGrid projects={displayData} />
        ) : (
          <p className="w-full text-base font-normal leading-7 text-center text-neutral-200 mt-10">
            No projects found in this category.
          </p>
        )}
      </div>
    </section>
  );
};

export default Projects;
