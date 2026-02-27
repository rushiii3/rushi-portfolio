import { JSX } from "react";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function MDXContent(
  props: JSX.IntrinsicAttributes & MDXRemoteProps,
) {
  const options = {
    ...(props.options ?? {}),
    mdxOptions: {
      ...(props.options?.mdxOptions ?? {}),
      remarkPlugins: [
        ...((props.options?.mdxOptions?.remarkPlugins as []) ?? []),
        remarkGfm,
      ],
    },
  };

  const components = {
    ...(props.components ?? {}),
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
  };

  return <MDXRemote {...props} options={options} components={components} />;
}
