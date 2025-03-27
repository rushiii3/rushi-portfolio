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
import { BsGithub } from "react-icons/bs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Projectcard = ({ project }: any) => {
  return (
    <Card className="w-full h-auto group border bg-transparent backdrop-blur border-white/10 rounded-2xl p-4 gap-4 h-full">
      <div className="relative rounded-2xl overflow-hidden">
        <Link href={`/work/${project.slug}`}>
          <Image
            src={"/poster1.png"}
            alt={"project"}
            width={960}
            height={480}
            className="aspect-video"
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
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <div className="flex flex-row gap-2">
        {project.stack.map((tag: string, index: number) => (
          <Badge key={index}>{tag}</Badge>
        ))}
      </div>
      <div className="mt-auto flex flex-row gap-2 justify-between items-center w-full p-0">
        <p className="text-sm font-medium">December 5, 2024 </p>
        <div className="flex flex-row gap-2">
          {
            project.github && <Button className="rounded-full" size={"icon"} asChild>
            <Link
              href={project.github}
              target="_blank"
              referrerPolicy="no-referrer"
            >
              <BsGithub className="text-8xl" />
            </Link>
          </Button>
          }
          
          <Button
            className="rounded-full hover:rotate-45 transition-all"
            size={"icon"}
          >
            <Link
              href={project.link}
              target="_blank"
              referrerPolicy="no-referrer"
            >
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Projectcard;
