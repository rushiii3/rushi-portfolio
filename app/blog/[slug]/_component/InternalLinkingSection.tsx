import Link from "next/link";
import { ArrowRight, FolderOpen, ShieldCheck } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { blogCategories } from "@/content/info";

type RelatedPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

interface InternalLinkingSectionProps {
  category: string;
  relatedPosts: RelatedPost[];
}

const primarySiteLinks = [
  {
    href: "/about",
    title: "About Hrushikesh",
    description:
      "Learn about Hrushikesh's application security background, focus areas, and technical strengths.",
  },
  {
    href: "/experience",
    title: "Security Experience",
    description:
      "Review hands-on VAPT, OWASP testing, and reporting experience across real security assessments.",
  },
  {
    href: "/work",
    title: "Projects & Work",
    description:
      "Explore security-focused projects, technical builds, and portfolio work that support the blog content.",
  },
];

export function InternalLinkingSection({
  category,
  relatedPosts,
}: InternalLinkingSectionProps) {
  const categoryMeta = blogCategories.find(
    (item) => item.name.toLowerCase() === category.toLowerCase(),
  );

  return (
    <section className="my-12 space-y-6 border-t border-black/10 pt-12 dark:border-white/10">
      <div className="space-y-2">
        <Badge className="uppercase">Keep Exploring</Badge>
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          Continue through this topic cluster
        </h2>
        <p className="max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
          Strong internal linking helps readers move from fundamentals to deeper
          security content while also connecting blog traffic to your profile and
          portfolio pages.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_1.4fr]">
        {categoryMeta ? (
          <Link href={`/blog/category/${categoryMeta.slug}`} className="group">
            <Card className="h-full border-primary/20 bg-primary/5 transition hover:border-primary/50">
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FolderOpen className="size-4" />
                  Category Hub
                </div>
                <CardTitle className="group-hover:text-primary transition">
                  {categoryMeta.name}
                </CardTitle>
                <CardDescription className="text-sm leading-6">
                  {categoryMeta.intro}
                </CardDescription>
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  Browse all {categoryMeta.name.toLowerCase()} articles
                  <ArrowRight className="size-4" />
                </div>
              </CardHeader>
            </Card>
          </Link>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          {relatedPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <Card className="h-full bg-transparent transition hover:border-primary/50">
                <CardHeader className="space-y-3">
                  <CardTitle className="text-lg leading-snug group-hover:text-primary transition">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 text-sm leading-6">
                    {post.description}
                  </CardDescription>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-primary">
                      Read next
                      <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {primarySiteLinks.map((link) => (
          <Link key={link.href} href={link.href} className="group">
            <Card className="h-full bg-transparent transition hover:border-primary/50">
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="size-4" />
                  High-Value Page
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition">
                  {link.title}
                </CardTitle>
                <CardDescription className="text-sm leading-6">
                  {link.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
