// `BlogList.tsx` (Client Component)
"use client"; // Mark this as a Client Component

import React from "react";
import StaggeredList from "./Stagger";
import Projectcard from "./project-card";

interface RootObject {
  slug: string;
  date: string;
  description: string;
  image: string;
  title: string;
  category: string;
}
const ProjectList = ({ projects }: { projects: RootObject[] }) => {
  return (
    <StaggeredList
      items={projects}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10"
      renderItem={(project) => <Projectcard project={project} />}
    />
  );
};

export default ProjectList;
