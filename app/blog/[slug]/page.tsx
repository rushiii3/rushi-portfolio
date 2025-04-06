import MDXContent from "@/components/mdx-content";
import React from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getBlog(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL!}/api/blogs/${slug}`
    );

    if (!res.ok) {
      console.error(`Error fetching post: ${res.status}`);
      return notFound();
    }

    const post = await res.json();
    return post;
  } catch (error) {
    console.error("Fetch failed in getPost:", error);
    return notFound();
  }
}
type Params = {
  params: Promise<{
    slug: string;
  }>;
};
const Page = async (props: Params) => {
  const {slug} = await props.params;
  const data = await getBlog(slug);
  return (
    <div className="md:pt-32 pt-16 w-full">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground hover:text-foreground border-[1px] border-transparent hover:border-white/10 p-2 rounded-2xl transition-all"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Back to blogs</span>
      </Link>
      <h1 className="text-4xl md:text-5xl font-bold">{data.title}</h1>
      <p className="my-3 text-xs text-muted-foreground">August 3, 2023</p>
      <div className="aspect-video relative rounded-2xl overflow-hidden">
        <Image
          alt={data.title}
          src={data.image}
          priority={true}
          fill={true}
        />
      </div>

      <div className="max-w-full mt-5 prose prose-invert prose-headings:mt-8 prose-headings:font-semibold prose-h1:text-4xl md:prose-h1:text-5xl  prose-h2:text-3xl md:prose-h2:text-4xl prose-h3:text-2xl md:prose-h3:text-3xl prose-h4:text-xl md:prose-h4:text-2xl prose-h5:text-lg md:prose-h5:text-xl prose-h6:text-md prose-img:rounded-2xl">
        {data.content && <MDXContent source={data.content} />}
      </div>
    </div>
  );
};

export default Page;


