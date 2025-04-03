import React from "react";
import BlogList from "./BlogList";
import Paginated from "./Paginated";
import { notFound } from "next/navigation";
async function getBlogs(search = "", category = "All", page = 1) {
  try {
    const res = await fetch(
      `${process.env
        .NEXT_PUBLIC_URL!}/api/blogs?search=${search}&category=${category}&page=${page}`,

    );

    if (!res.ok) {
      console.error(`Error fetching post: ${res.status}`);
      return notFound();
    }

    const post = await res.json();
    return post;
  } catch (error) {
    console.error("Fetch failed in getPost:", error);
    return notFound();
  }
}
const PaginatedBlogList = async ({
  search,
  category,
  page,
}: {
  search: string;
  category: string;
  page: number;
}) => {
  const data = await getBlogs(search, category, page);
  return (
    <>
      <BlogList articles={data.blogs} />{" "}
      <Paginated totalPages={data.totalPages} currentPage={page} />
    </>
  );
};

export default PaginatedBlogList;
