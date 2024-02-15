"use client";

import MypageHeader from "../_components/MypageHeader.tsx/MypageHeader";
import { useGetMyPage } from "@/hooks/useGetMyPage";
import PlanCard from "@/components/PlanCard/PlanCard";
import { IPlan2 } from "@/types/plan.types";
import Pagination from "../_components/Pagination.tsx/Pagination";
import { useEffect } from "react";
import { useGetScrapList } from "@/hooks/useGetScrapList";

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { data, error, isLoading, refetch } = useGetScrapList(
    searchParams.page,
  );
  // console.log(searchParams.page);

  useEffect(() => {
    refetch();
  }, [searchParams]);

  const page = parseInt(searchParams.page as string) || 1;

  if (error) return <div>에러</div>;
  if (isLoading) return <div>로딩중</div>;
  console.log("data", data);

  return (
    <div className="flex flex-col w-full">
      <MypageHeader choose="./myPlanList" />
      <div className="flex justify-center flex-col">
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-10">
          {data?.data.plans.map((item: IPlan2) => (
            <PlanCard item={item} key={item.planId} />
          ))}
        </div>

        <Pagination totalPage={data.data.totalPages} page={page} />
      </div>
    </div>
  );
};

export default Page;
