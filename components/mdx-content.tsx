// import dynamic from "next/dynamic";
import { JSX } from "react";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
export default function MDXContent(
  props: JSX.IntrinsicAttributes & MDXRemoteProps
) {
  return <MDXRemote {...props} />;
}
