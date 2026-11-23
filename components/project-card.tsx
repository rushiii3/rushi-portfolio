import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import BsGithub from "@/components/icons/react-icons/icons/BsGithub";
import type { ProjectMetadata } from "@/lib/projects";

const Projectcard = ({ project }: { project: ProjectMetadata }) => {
  return (
    <Card className="w-full group border bg-transparent backdrop-blur border-white/10 rounded-2xl p-4 gap-4 h-full">
      <div className="relative rounded-2xl aspect-video overflow-hidden">
        <Link href={`/work/${project.slug}`}>
          <Image
            src={project.image}
            alt={`project image for ${project.title}`}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
            className="object-cover"
          />
        </Link>
      </div>
      <div className="flex flex-row gap-2 justify-between items-center w-full p-0">
        <Badge className="uppercase">{project.type}</Badge>
      </div>
      <CardHeader className="p-0">
        <CardTitle className="hover:underline transition-all">
          <Link href={`/work/${project.slug}`}> {project.title}</Link>
        </CardTitle>
        <CardDescription className="line-clamp-3 text-justify">
          {project.description}
        </CardDescription>
      </CardHeader>
      <div className="flex flex-row flex-wrap gap-2">
        {project.stack.map((tag: string, index: number) => (
          <Badge key={index}>{tag}</Badge>
        ))}
      </div>
      <div className="mt-auto flex flex-row gap-2 justify-between items-center w-full p-0">
        <p className="text-sm font-medium">{project.date}</p>
        <div className="flex flex-row flex-wrap gap-2">
          {project.github ? (
            <Button className="rounded-full" size={"icon"} asChild>
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                aria-label={`View ${project.title} source code on GitHub`}
              >
                <BsGithub className="text-8xl" />
              </Link>
            </Button>
          ) : null}

          {project.link ? (
            <Button
              className="rounded-full hover:rotate-45 transition-all"
              size={"icon"}
              asChild
            >
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                aria-label={`Visit ${project.title} live site`}
              >
                <ArrowUpRight />
              </Link>
            </Button>
          ) : null}
        </div>
      </div>
    </Card>
  );
};

export default Projectcard;
