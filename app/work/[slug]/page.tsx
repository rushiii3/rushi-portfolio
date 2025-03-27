import MDXContent from "@/components/mdx-content";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import React from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
const rootDirectory = path.join(process.cwd(), "/content/projects");

const Page = () => {
  const filePath = path.join(rootDirectory, "oddnoteven-store.mdx");
  const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
  const { data, content } = matter(fileContent);

  return (
    <div className="md:pt-32 pt-16 w-full">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground hover:text-foreground border-[1px] border-transparent hover:border-white/10 p-2 rounded-2xl transition-all"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Back to projects</span>
      </Link>
      <h1 className="text-4xl md:text-5xl font-bold">{data.title}</h1>
      <p className="my-3 text-xs text-muted-foreground">August 3, 2023</p>
      <Image
        src={"/poster1.png"}
        alt={"project"}
        width={960}
        height={480}
        className="aspect-video rounded-2xl"
      />
      <div className="max-w-full mt-5 prose prose-invert prose-headings:mt-8 prose-headings:font-semibold prose-h1:text-4xl md:prose-h1:text-5xl  prose-h2:text-3xl md:prose-h2:text-4xl prose-h3:text-2xl md:prose-h3:text-3xl prose-h4:text-xl md:prose-h4:text-2xl prose-h5:text-lg md:prose-h5:text-xl prose-h6:text-md prose-img:rounded-2xl">
        {content && <MDXContent source={content} />}
      </div>
    </div>
  );
};

export default Page;
