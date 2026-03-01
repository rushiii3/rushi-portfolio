"use client";

import dynamic from "next/dynamic";

const AccordionItem = dynamic(
  () => import("@/components/ui/accordion").then(m => m.AccordionItem),
  { ssr: false }
);

const AccordionTrigger = dynamic(
  () => import("@/components/ui/accordion").then(m => m.AccordionTrigger),
  { ssr: false }
);

const AccordionContent = dynamic(
  () => import("@/components/ui/accordion").then(m => m.AccordionContent),
  { ssr: false }
);

const Accordion = dynamic(
  () => import("@/components/ui/accordion").then(mod => mod.Accordion),
  { ssr: false }
);

export {AccordionItem, AccordionTrigger, AccordionContent, Accordion};