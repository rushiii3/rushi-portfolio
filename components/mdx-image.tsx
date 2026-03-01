// components/mdx/mdx-image.client.tsx
"use client";

import dynamic from "next/dynamic";

const ImageZoom = dynamic(() => import("./mdx-image-zoom"), {
  ssr: false,
});

export default ImageZoom;