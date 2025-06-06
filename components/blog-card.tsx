"use client";
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
// import Image from "next/image";
import { Badge } from "./ui/badge";
import Image from "next/image";
interface RootObject {
  slug: string;
  date: string;
  description: string;
  image: string;
  title: string;
  category: string;
}

type BlogCardProps = {
  article: RootObject;
};
const BlogCard = ({ article }: BlogCardProps) => {
  return (
    <Link href={`/blog/${article.slug}`}>
      <Card className="group cursor-pointer pt-0 rounded-2xl bg-transparent gap-5 h-full">
        <div className="relative aspect-video rounded-2xl overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            width={960}
            height={480}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        <div className="flex flex-row gap-2 justify-between items-center w-full px-6">
          <Badge className="uppercase">{article.category}</Badge>
        </div>
        <CardHeader>
          <CardTitle className="hover:underline transition-all">
            {article.title}
          </CardTitle>
          <CardDescription>{article.description}</CardDescription>
        </CardHeader>
        <div className="mt-auto flex flex-row gap-2 justify-between items-center w-full px-6">
          <p className="text-sm font-medium">{article.date}</p>
        </div>
      </Card>
    </Link>
  );
};

export default BlogCard;
