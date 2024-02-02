"use client";

import DayPlanCard from "@/components/DayPlanCard/DayPlanCard";
import { Plan } from "@/mocks";
import { PlanDayHeader } from "../_components/PlanDayHeader/PlanDayHeader";
import { useSearchParams } from "next/navigation";
import { PlanInfoHeader } from "../_components";
import PlanModifyDaily from "../_components/PlanModifyDaily/PlanModifyDaily";
import { useQuery } from "@tanstack/react-query";
import { getPlanInfo } from "../detail-plan/_lib/getPlanInfo";
import { IPlace } from "@/types/place.types";

export interface Iitem {
  stored: IPlace[],
  added: IPlace[]
}

const Page = () => {
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId") as string;
  const day = searchParams.get("day");

  const {
    data: planInfo,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["planInfo", planId],
    queryFn: () => getPlanInfo(planId),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if (isLoading) return <div>로딩중</div>;
  if (error) return <div>에러</div>;

  return (
    <div className="m-5 sm:m-10">
      <PlanInfoHeader isModify planInfo={planInfo.data} />

      {!day ? (
        <div className="bg-ourGreen flex flex-col p-3 sm:p-5 rounded-2xl">
          <PlanDayHeader days={Plan} isModify />
          <div className="flex gap-10 overflow-x-scroll">
            {Plan.map((item) => (
              <DayPlanCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <PlanModifyDaily day={day} />
      )}
    </div>
  );
};

export default Page;
