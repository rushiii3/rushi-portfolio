import React from "react";
import { Skeleton } from "./ui/skeleton";
import { Card } from "./ui/card";

const BlogShimmer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-10 w-full gap-5">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="pt-0 rounded-2xl bg-transparent h-full">
          <Skeleton className="w-full  aspect-video" />
          <div className="flex flex-row gap-2 justify-between items-center w-full px-6">
            <Skeleton className="w-24 h-6" />
          </div>
          <div className="flex flex-col gap-2 justify-between items-start w-full px-6">
            <div className="flex flex-col gap-2 justify-between items-start w-full">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-5/6 h-4" />
            </div>
            <div className="flex flex-col gap-2 justify-between items-start w-full mt-2">
              <Skeleton className="w-full h-2" />
              <Skeleton className="w-full h-2" />
              <Skeleton className="w-4/5 h-2" />
            </div>
          </div>

          <div className="mt-auto flex flex-row gap-2 justify-between items-center w-full px-6">
            <Skeleton className="w-28 h-4" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default BlogShimmer;
