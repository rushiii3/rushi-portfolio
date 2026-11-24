"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export interface ImageZoomTriggerProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function ImageZoomTrigger({
  src,
  alt,
  width = 1200,
  height = 675,
  priority = false,
}: ImageZoomTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl bg-neutral-100/50 text-left transition-opacity hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 dark:bg-neutral-900/50"
        aria-label={`Enlarge image: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 800px, 100vw"
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="h-auto w-full rounded-xl object-contain"
        />
      </button>

      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close image preview"
            className="absolute top-4 right-4 z-50 rounded-full p-2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          >
            <X className="size-6" />
          </button>
          <div
            className="relative flex max-h-[85vh] w-full items-center justify-center overflow-hidden rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              width={1600}
              height={900}
              sizes="95vw"
              loading="lazy"
              className="h-auto max-h-[85vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
