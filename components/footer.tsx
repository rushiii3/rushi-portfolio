import Link from "next/link";
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsTwitterX } from "react-icons/bs";

export default function FooterSection() {
  return (
    <footer className="py-32 md:py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X/Twitter"
            className="text-muted-foreground hover:text-primary block"
          >
            <BsTwitterX className="size-6" />
          </Link>
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-primary block"
          >
            <BsLinkedin className="size-6" />
          </Link>
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-muted-foreground hover:text-primary block"
          >
            <BsFacebook className="size-6" />
          </Link>
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Threads"
            className="text-muted-foreground hover:text-primary block"
          >
            <BsGithub className="size-6" />
          </Link>
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-muted-foreground hover:text-primary block"
          >
            <BsInstagram className="size-6" />
          </Link>

        </div>
        <span className="text-muted-foreground block text-center text-sm">
          Made By Hrushikesh Shinde
        </span>
      </div>
    </footer>
  );
}
