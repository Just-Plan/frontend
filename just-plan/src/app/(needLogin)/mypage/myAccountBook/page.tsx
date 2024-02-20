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
    if (selectedCardData === item) setSelectedCardData(undefined);
    else setSelectedCardData(item);
  };

  const { data, error, isLoading } = useGetAccountBook();

  if (error) return <div>에러</div>;
  if (isLoading) return <div>로딩중</div>;

  return (
    <div className="flex flex-col w-full">
      <MypageHeader choose="가계부" />
      <div className="flex justify-center">
        <div className="flex flex-1 ">
          <div className="h-96 overflow-y-auto md:px-0 flex flex-col flex-1 gap-5 mx-10">
            {data?.map((item) => (
              <>
                {selectedCardData?.planId === item.planId && (
                  <div className="md:hidden block w-full">
                    {selectedCardData.useExpense ? (
                      <Chart selectedData={selectedCardData} />
                    ) : (
                      <div className="text-2xl font-bold flex justify-center">
                        예산 정보가 없습니다.
                      </div>
                    )}
                  </div>
                )}
                <Card
                  key={item.planId}
                  className={cn(
                    "p-4 cursor-pointer shadow-lg",
                    selectedCardData?.planId === item.planId
                      ? "bg-ourGreen"
                      : "",
                  )}
                  onClick={() => handleCardClick(item)}
                >
                  <div className="flex gap-6 items-center">
                    <span className="text-lg font-bold">
                      {item?.region?.koreanName}
                    </span>
                    <span className="text-gray-400 flex-1 text-xs">
                      {format(item.startDate, "yyyy-MM-dd")} ~{" "}
                      {format(item.endDate, "yyyy-MM-dd")}
                    </span>
                  </div>
                  <span className="text-gray-600 font-semibold">
                    {item.title}
                  </span>
                  <div className="text-xs text-gray-400 float-right">
                    총 {(item.budget.card + item.budget.cash).toLocaleString()}{" "}
                    원
                  </div>
                </Card>
              </>
            ))}
          </div>
        </div>
        {selectedCardData && (
          <div className="hidden md:block w-96">
            {selectedCardData.useExpense ? (
              <Chart selectedData={selectedCardData} />
            ) : (
              <div className="text-2xl font-bold flex justify-center">
                예산 정보가 없습니다.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
