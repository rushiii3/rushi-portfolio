"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { FaXTwitter, FaLinkedin, FaReddit, FaWhatsapp } from "react-icons/fa6";

import { Link2Icon, Share2Icon, Check } from "lucide-react";

type ShareArticleProps = {
  url: string;
  title: string;
  hashtags?: string[];
};

export default function ShareArticle({
  url,
  title,
  hashtags = [],
}: ShareArticleProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const hashtagString = hashtags.join(",");

  const shareLinks = [
    {
      name: "Twitter",
      icon: FaXTwitter,
      href: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${hashtagString}`,
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "Reddit",
      icon: FaReddit,
      href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <section className="my-12 border-t border-slate-200 dark:border-primary/20 pt-10">
      <div className="flex flex-col items-center gap-6 text-center">
        <p className="text-lg font-semibold">Share this article</p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <NativeShareButton url={url} title={title} />

          {/* Social platforms */}
          {shareLinks.map((platform) => {
            const Icon = platform.icon;

            return (
              <Button key={platform.name} variant="outline" size="icon" asChild>
                <Link
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Share on ${platform.name}`}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              </Button>
            );
          })}

          {/* Copy link */}
          <Button
            size="lg"
            variant="default"
            onClick={copyLink}
            aria-live="polite"

          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Link2Icon className="mr-2 h-4 w-4" />
                Copy Link
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}

const NativeShareButton = ({ url, title }: { url: string; title: string }) => {
  const fallback = `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

  async function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (navigator.share) {
      e.preventDefault();

      try {
        await navigator.share({
          title,
          url,
        });
      } catch {}
    }
  }
  return (
    <Button variant="secondary" size="lg" asChild>
      <a
        href={fallback}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Share article"
      >
        <Share2Icon className="mr-2 h-4 w-4" />
        Share
      </a>
    </Button>
  );
};
