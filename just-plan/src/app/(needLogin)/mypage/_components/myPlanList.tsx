"use client";

import PlanCard from "@/components/PlanCard/PlanCard";
import { useGetMyPage } from "@/hooks/useGetMyPage";
import { MbtiCardContent } from "@/mocks";
import { IPlan, IPlan2 } from "@/types/plan.types";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const MyPlanList = () => {

  // const {data, error, isLoading} = useGetMyPage();

  const {data, fetchNextPage, hasNextPage, isFetching} = useGetMyPage();
  // if (error) return <div>에러</div>
  // if (isLoading) return <div>로딩중</div>

  const { ref, inView } = useInView({
    threshold: 0.4,
    delay: 0,
  });

  useEffect(() => {
    console.log('????')
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isFetching) return <div>Fetching...</div>
  console.log('데이터 출력', data?.pages);

  return (
    <div className="flex justify-center flex-col">
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-10 bg-red-400">
        {data?.pages.map((itemList) => (
          itemList.data.plans.map((item: IPlan2) => (
            <PlanCard item={item} key={item.planId} />
          ))
        ))}
      </div>
      {/* <div ref={ref} className="h-10 bg-red-200" /> */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default MyPlanList;
