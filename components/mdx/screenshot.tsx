import React from "react";
import { ImageZoomTrigger } from "./image-zoom-trigger";

export interface ScreenshotProps {
  src?: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  credit?: string;
  [key: string]: any;
}

export function Screenshot({
  src,
  alt,
  caption,
  width = 1200,
  height = 675,
  priority = false,
  credit,
  ...rest
}: ScreenshotProps) {
  if (!src) {
    return null;
  }

  const effectiveAlt = (alt || "").trim() || "Technical walkthrough screenshot";

  if (!alt || alt.trim().length === 0) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[Image SEO Warning] Screenshot missing alt text: ${src}`);
    }
  }

  return (
    <figure className="my-8 flex flex-col items-center not-prose">
      <div className="w-full overflow-hidden rounded-xl border border-neutral-200/80 bg-neutral-100/50 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/50">
        <ImageZoomTrigger
          src={src}
          alt={effectiveAlt}
          width={Number(width) || 1200}
          height={Number(height) || 675}
          priority={Boolean(priority)}
        />
      </div>
      {caption ? (
        <figcaption className="mt-2.5 text-center text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
          {caption}
          {credit ? <span className="ml-1 opacity-75">({credit})</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

export default Screenshot;
