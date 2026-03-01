import { JSX } from "react";
import Link from "next/link";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import MDXImage from "./mdx-image";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "./mdx-faq-item";


function isExternal(href: string) {
  return /^(https?:)?\/\//.test(href);
}

const Anchor = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { href = "", children, ...rest } = props;
  const isInternal = !isExternal(href);

  if (isInternal) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
};

export default function MDXContent(
  props: JSX.IntrinsicAttributes & MDXRemoteProps,
) {
  const options = {
    ...(props.options ?? {}),
    mdxOptions: {
      ...(props.options?.mdxOptions ?? {}),

      remarkPlugins: [
        ...((props.options?.mdxOptions?.remarkPlugins as any) ?? []),
        remarkGfm,
      ] as any,

      rehypePlugins: [
        ...(props.options?.mdxOptions?.rehypePlugins ?? []),
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "wrap",
            properties: {
              className: "linked-heading",
            },
          },
        ],
      ] as any,
    },
  };

  const components = {
    ...(props.components ?? {}),
    a: Anchor,
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    img: (props: any) => <MDXImage {...props} />,
  };

  return <MDXRemote {...props} components={components} />;
}
