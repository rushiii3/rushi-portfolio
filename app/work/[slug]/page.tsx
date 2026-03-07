import MDXContent from "@/components/mdx-content";
import React from "react";
import Link from "next/link";
import { ArrowLeftIcon, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import BsGithub from "@/components/icons/react-icons/icons/BsGithub";

import { getProjectBySlug } from "@/lib/projects";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};
const Page = async (props: Params) => {
  const { slug } = await props.params;
  const data = await getProjectBySlug(slug);
  if (!data) {
    notFound();
  }

  return (
    <div className="md:pt-32 pt-16 w-full">
      <Link
        href="/work"
        className="mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground hover:text-foreground border border-transparent hover:border-white/10 p-2 rounded-2xl transition-all">
        
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Back to projects</span>
      </Link>
      <h1 className="text-4xl md:text-5xl font-bold">{data.title}</h1>
      <p className="my-3 text-xs text-muted-foreground">{data.date}</p>
      <div className="flex flex-row flex-wrap gap-2 my-3 justify-start w-full">
        {data.github &&
        <Button className="rounded-full" asChild>
            <Link
            href={data.github}
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            className="flex flex-row gap-2 items-center">
            
              Github
              <BsGithub className="text-8xl" />
            </Link>
          </Button>
        }
        {data.link &&
        <Button className="rounded-full transition-all">
            <Link
            className="flex flex-row gap-2 items-center"
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer">
            
              View
              <ArrowUpRight />
            </Link>
          </Button>
        }
      </div>
      <div className="aspect-video relative rounded-2xl overflow-hidden">
        <Image
          alt={data.title}
          src={data.image}
          priority={true}
          fill={true}
          // objectFit="cover"
        />
      </div>
      <div className="max-w-full mt-5 prose prose-invert prose-headings:mt-8 prose-headings:font-semibold prose-h1:text-4xl md:prose-h1:text-5xl  prose-h2:text-3xl md:prose-h2:text-4xl prose-h3:text-2xl md:prose-h3:text-3xl prose-h4:text-xl md:prose-h4:text-2xl prose-h5:text-lg md:prose-h5:text-xl prose-h6:text-md prose-img:rounded-2xl">
        {data.content && <MDXContent source={data.content} />}
      </div>
    </div>);

};

export default Page;