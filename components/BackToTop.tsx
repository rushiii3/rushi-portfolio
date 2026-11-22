"use client";

import { Button } from "./ui/button";

export default function BackToTop() {
  return (
    <Button
      variant="ghost"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      Back to top ↑
    </Button>
  );
}
