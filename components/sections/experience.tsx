import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { workExperienceData } from "@/content/info";

export function Experience() {
  return (
    <section className="py-12 lg:py-16 w-full">
      <Timeline data={workExperienceData} />
    </section>
  );
}
