"use client";

import dynamic from "next/dynamic";

const AccordionItem = dynamic(
  () => import("@/components/ui/accordion").then(m => m.AccordionItem),
  { ssr: true }
);

const AccordionTrigger = dynamic(
  () => import("@/components/ui/accordion").then(m => m.AccordionTrigger),
  { ssr: true }
);

const AccordionContent = dynamic(
  () => import("@/components/ui/accordion").then(m => m.AccordionContent),
  { ssr: true }
);

const Accordion = dynamic(
  () => import("@/components/ui/accordion").then(mod => mod.Accordion),
  { ssr: true }
);

export {AccordionItem, AccordionTrigger, AccordionContent, Accordion};