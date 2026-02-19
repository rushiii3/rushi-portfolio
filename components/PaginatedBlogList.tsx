import BlogList from "./BlogList";
import Paginated from "./Paginated";
import { getAllBlogs } from "@/lib/blogs";

const BLOGS_PER_PAGE = 10;

const PaginatedBlogList = async ({
  search,
  category,
  page,
}: {
  search: string;
  category: string;
  page: number;
}) => {
  const { blogs, total } = await getAllBlogs(
    BLOGS_PER_PAGE,
    page,
    category && category.toLowerCase() !== "all" ? category : undefined,
    search,
  );
  const totalPages = Math.ceil(total / BLOGS_PER_PAGE);

  return (
    <>
      <BlogList articles={blogs} />{" "}
      <Paginated totalPages={totalPages} currentPage={page} />
    </>
  );
};

export default PaginatedBlogList;
