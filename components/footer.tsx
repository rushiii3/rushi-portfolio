"use client";
import { blogCategories, socialLinks } from "@/content/info";
import Link from "next/link";
import { Button } from "./ui/button";
import { navItems } from "./navbar";


export default function FooterSection() {
  return (
    <footer className="w-full text-black dark:text-white  overflow-hidden ">
      <div className="mx-auto px-4 py-32 md:py-16  sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-md">
            <p className="text-3xl font-bold tracking-tight mb-6">
              Focused on VAPT, web application security, and secure development.
            </p>
            <Link href={"https://cal.com/hrushi-shinde-goijwj"} target="_blank" rel="noopener noreferrer" className="text-lg font-medium border-b-2 border-zinc-900 pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-all">
              Let's talk →
            </Link> 
            
          </div>

          <div className="grid grid-cols-3 gap-12 sm:gap-24">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
                Pages
              </p>
              <nav className="flex flex-col gap-2">
                {
                  navItems.map((item) => (
                    <Link key={item.id} href={item.href} className="text-sm font-medium hover:underline">
                      {item.label}
                    </Link>
                  ))
                }
              </nav>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
                Connect
              </p>
              <nav className="flex flex-col gap-2">
                {
                  socialLinks.map((link) => (
                    <Link target="_blank" rel="noopener noreferrer"  key={link.name} href={link.url} className="text-sm font-medium hover:underline">
                      {link.name}
                    </Link>
                  ))
                }
              </nav>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
                Blog Categories
              </p>
              <nav className="flex flex-col gap-2">
                {
                  blogCategories.map((category) => (
                    <Link key={category.slug} href={category.slug === "all" ? `/blog/` : `/blog/category/${category.slug}`} className="text-sm font-medium hover:underline">
                      {category.name}
                    </Link>
                  ))
                }
              </nav>
            </div>
          </div>
        </div>

        <div className="relative w-full">
          <p className="text-[12vw] font-black tracking-tighter text-zinc-950 dark:text-white select-none pointer-events-none leading-none -mb-[2vw] opacity-7">
            Let's Connect
          </p>
          <div className="flex justify-between items-end border-t backdrop-blur border-zinc-200 pt-8 pb-6 relative z-10">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">
              © 2026 Hrushikesh Shinde{" "}
            </span>
            <div className="flex gap-8">
              <Button variant={"ghost"} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>

                Back to top ↑
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
