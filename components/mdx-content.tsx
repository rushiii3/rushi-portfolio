import React, { JSX } from "react";
import Link from "next/link";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@/transformer/copy-button";
import { Screenshot } from "./mdx/screenshot";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./mdx-faq-item";

function rehypeUnwrapImages() {
  return (tree: any) => {
    function unwrap(node: any) {
      if (!node || !Array.isArray(node.children)) return;

      const newChildren: any[] = [];
      for (const child of node.children) {
        if (child.type === "element" && child.tagName === "p" && Array.isArray(child.children)) {
          const meaningful = child.children.filter((c: any) => {
            if (c.type === "text" && (!c.value || c.value.trim() === "")) return false;
            return true;
          });

          const allImages =
            meaningful.length > 0 &&
            meaningful.every((c: any) => c.type === "element" && c.tagName === "img");

          if (allImages) {
            newChildren.push(...meaningful);
            continue;
          }
        }

        unwrap(child);
        newChildren.push(child);
      }
      node.children = newChildren;
    }

    unwrap(tree);
  };
}

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
        rehypeUnwrapImages,
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
        [
          rehypePrettyCode,
          {
            keepBackground: true,
            theme: "github-dark-default",
            defaultLang: "plaintext",
            tokensMap: {
              fn: "entity.name.function",
            },
            grid: true,
            filterMetaString: (meta: string) =>
              meta.replace(/filename="[^"]*"/, ""),
            transformers: [
              transformerCopyButton({
                jsx: true,
                visibility: "hover",
                feedbackDuration: 2_500,
              }),
            ],
          },
        ],
      ] as any,
    },
  };

  const Paragraph = (props: React.HTMLAttributes<HTMLParagraphElement>) => {
    const childrenArray = React.Children.toArray(props.children);
    const hasBlockChild = childrenArray.some((child) => {
      if (React.isValidElement(child)) {
        const type = child.type;
        return (
          type === "figure" ||
          type === Screenshot ||
          (typeof type === "function" && (type.name === "Screenshot" || type.name === "figure"))
        );
      }
      return false;
    });

    if (hasBlockChild) {
      return <div className="my-4">{props.children}</div>;
    }

    return <p {...props} />;
  };

  const components = {
    ...(props.components ?? {}),
    a: Anchor,
    p: Paragraph,
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    img: (props: any) => <Screenshot {...props} />,
    Screenshot,
    // code: (props: any) => <pre {...props} className="not-prose" />,
  };

  return <MDXRemote options={options} {...props} components={components} />;
}
