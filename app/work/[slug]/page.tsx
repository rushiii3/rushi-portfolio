import MDXContent from "@/components/mdx-content";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import BsGithub from "@/components/icons/react-icons/icons/BsGithub";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { cache } from "react";
export const dynamic = "force-static";
const siteUrl = process.env.NEXT_PUBLIC_URL?.replace(/\/$/, "") || "";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const projects = await getAllProjects(100);
  return projects.map((project) => ({
    slug: project.slug
  }));
}

const getProject = cache(async (slug: string) => {
  const data = await getProjectBySlug(slug);
  if (!data) return notFound();
  return data;
});


export async function generateMetadata(props: Params) {
  const { slug } = await props.params;
  const data = await getProject(slug);

  if (!data) return {};

  const canonical = siteUrl ? `${siteUrl}/work/${slug}` : undefined;

  return {
    metadataBase: new URL(siteUrl),

    title: {
      default: data.title,
      template: `%s | Hrushikesh Shinde`
    },

    description: data.description,

    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    },

    alternates: {
      canonical
    },

    openGraph: {
      type: "website",
      url: canonical,
      title: data.title,
      description: data.description,
      siteName: "Hrushikesh Shinde",
      publishedTime: data.date,
      modifiedTime: data.date || data.date,
      authors: ["Hrushikesh Shinde"],
      images: [
      {
        url: data.image,
        width: 1200,
        height: 630,
        alt: data.title
      }]

    },

    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [data.image],
      creator: "@yourhandle" // optional but recommended
    },
  };
}


const Page = async (props: Params) => {
  const { slug } = await props.params;
  const data = await getProjectBySlug(slug);
  if (!data) {
    notFound();
  }

  return (
    <div className="md:pt-32 pt-16 w-full">
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