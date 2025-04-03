"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "./ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { MoveLeft, MoveRight } from "lucide-react";

const Paginated = ({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  function updateParams(params: URLSearchParams) {
    push(`?${params.toString()}`, { scroll: false });
  }
  function handlePageChange(page: number) {
    const params = new URLSearchParams(searchParams);
  
    if (page === 1) {
      params.delete("page"); // Remove 'page' when it's 1
    } else if (page >= 1 && page <= totalPages) {
      params.set("page", page.toString());
    }
  
    updateParams(params);
  }
  
  return (
    <div className="flex justify-between items-center mt-12">
      <Pagination>
        <PaginationContent className=" w-full">
          <PaginationItem className="mr-auto">
            <Button
              type="button"
              variant={"ghost"}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="cursor-pointer"
            >
              <MoveLeft /> Previous
            </Button>
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (value) => (
              <PaginationItem key={value} onClick={() => handlePageChange(value)}>
                <PaginationLink href="#" isActive={currentPage === value}>
                  {value}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem className="ml-auto">
            <Button
              type="button"
              variant={"ghost"}
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="cursor-pointer"
            >
               Next <MoveRight />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Paginated;
