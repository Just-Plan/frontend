"use client";

import { Card } from "@/components/Card";
import MypageHeader from "../_components/MypageHeader.tsx/MypageHeader";
import { useState } from "react";
import { Chart } from "../_components/chart";
import { cn } from "@/lib/utils";
import { useGetAccountBook } from "@/hooks/useGetAccountBook";
import { format } from "date-fns";
import type { IModifyPlanInfo } from "@/types/plan.types";

const Page = () => {
  const [selectedCardData, setSelectedCardData] = useState<
    IModifyPlanInfo | undefined
  >(undefined);

  const handleCardClick = (item: IModifyPlanInfo) => {
    setSelectedCardData(item);
  };

  const { data, error, isLoading } = useGetAccountBook();

  if (error) return <div>에러</div>;
  if (isLoading) return <div>로딩중</div>;

  return (
    <div className="flex flex-col w-full">
      <MypageHeader choose="가계부" />
      <div className="flex justify-center items-center">
        <div className="flex flex-1 ">
          <div className="h-80 overflow-y-auto md:px-0 flex flex-col flex-1  gap-5">
            {data?.map((item) => (
              <Card
                key={item.planId}
                className={cn(
                  "p-4 cursor-pointer",
                  selectedCardData?.planId === item.planId
                    ? "bg-green-200"
                    : "bg-ourGreen",
                )}
                onClick={() => handleCardClick(item)}
              >
                <div className="flex gap-6">
                  <span>{item?.region?.koreanName}</span>
                  <span className="text-gray-400 flex-1">
                    {format(item.startDate, "yyyy-mm-dd")} ~{" "}
                    {format(item.endDate, "yyyy-mm-dd")}
                  </span>
                </div>
                <span>{item.title}</span>
              </Card>
            ))}
          </div>
        </div>
        {selectedCardData && (
          <div>
            <Chart selectedData={selectedCardData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
