"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function MDXImageZoom(props: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="w-full cursor-zoom-in focus:outline-none"
          aria-label="Open image in full view"
        >
          <Image
            {...props}
            alt={props.alt ?? "Blog Image"}
            sizes="(min-width: 1024px) 1024px, 100vw"
            loading={"lazy"}
            width={1200}
            height={630}
            placeholder="empty"
            title={props.alt || "Blog Image"}
            className="mt-0 mb-0"
          />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-7xl p-0">
        <DialogHeader className="hidden">
          <DialogTitle>{props.alt}</DialogTitle>
        </DialogHeader>
        <div className="relative w-full aspect-video">
          <Image
            placeholder="empty"
            {...props}
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            loading="lazy"
            className="object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
