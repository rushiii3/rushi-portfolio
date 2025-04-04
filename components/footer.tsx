import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";

export default function FooterSection() {
  return (
    <footer className="py-32 md:py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mail"
            className="text-muted-foreground hover:text-primary block"
          >
            <IoMdMail className="size-6" />
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
            aria-label="Github"
            className="text-muted-foreground hover:text-primary block"
          >
            <BsGithub className="size-6" />
          </Link>

        </div>
        <span className="text-muted-foreground block text-center text-sm">
          Made By Hrushikesh Shinde
        </span>
      </div>
    </footer>
  );
}
