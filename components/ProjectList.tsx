// `BlogList.tsx` (Client Component)
"use client"; // Mark this as a Client Component
import StaggeredList from "./Stagger";
import Projectcard from "./project-card";
import type { ProjectMetadata } from "@/lib/projects";

const ProjectList = ({ projects }: { projects: ProjectMetadata[] }) => {
  return (
    <StaggeredList
      items={projects}
      // className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10"
      renderItem={(project) => <Projectcard project={project} />}
    />
  );
};

export default ProjectList;
