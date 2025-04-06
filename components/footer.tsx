import { socialLinks } from "@/content/info";
import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className="py-32 md:py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          {
            socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="text-muted-foreground hover:text-primary block"
              >
                <link.icon className="size-6" />
              </Link>
            ))
          }
        </div>
        <span className="text-muted-foreground block text-center text-sm">
          Made By Hrushikesh Shinde
        </span>
      </div>
    </footer>
  );
}
