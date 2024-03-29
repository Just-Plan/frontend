"use client";

import MypageHeader from "../_components/MypageHeader.tsx/MypageHeader";
import { useGetMyPage } from "@/hooks/useGetMyPage";
import PlanCard from "@/components/PlanCard/PlanCard";
import type { IPlan2 } from "@/types/plan.types";
import Pagination from "../_components/Pagination.tsx/Pagination";
import { useEffect } from "react";
import { Spinner } from "@/components/Spinner";

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { data, error, isLoading, refetch } = useGetMyPage(searchParams.page);

  useEffect(() => {
    refetch();
  }, [searchParams]);

  const page = parseInt(searchParams.page as string) || 1;

  if (error) return <div>에러</div>;
  console.log("data", data);

  return (
    <div className="flex flex-col w-full">
      <MypageHeader choose="나의 여행 일정" />
      <div className="flex justify-center flex-col">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 place-items-center">
          {data &&
            data.plans.map((item: IPlan2) => (
              <PlanCard
                item={item}
                key={item.planId}
                cityId={0}
                mbtiList={[]}
              />
            ))}
        </div>

        {data && (
          <Pagination
            totalPage={data.totalPages - 1}
            page={page}
            location="myPlanList"
          />
        )}
      </div>
      {isLoading && (
        <div className="fixed bottom-4 right-4 bg-gray-500 rounded-lg p-4">
          <Spinner className="w-8 h-8" />
        </div>
      )}
    </div>
  );
};

export default Page;
