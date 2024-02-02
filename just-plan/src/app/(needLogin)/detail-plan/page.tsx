"use client";

import DayPlanCard from "@/components/DayPlanCard/DayPlanCard";
import { Plan } from "@/mocks";
import { PlanDayHeader } from "../_components/PlanDayHeader/PlanDayHeader";
import { useSearchParams } from "next/navigation";
import { PlanInfoHeader } from "../_components";
import { useGetPlanInfo } from "@/hooks";
import { useEffect } from "react";
import { planInfoAtom } from "@/store";
import { useAtom } from "jotai";
import { IPlanInfoDetail } from "@/types/plan.types";

const Page = () => {
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId") as string;
  const day = searchParams.get("day");
  const [planInfo, setPlanInfo] = useAtom(planInfoAtom);
  const {data, error, isLoading} = useGetPlanInfo(planId);

  useEffect(() => {
    if (data) {
      setPlanInfo(data); // 데이터가 있을 경우 atom을 업데이트
    }
  }, [data]);

  if (isLoading) return <div>로딩중</div>;
  if (error) return <div>에러</div>;

  return (
    <div className="m-5 sm:m-10">
      {planInfo && <PlanInfoHeader planInfo={planInfo} />}
      <div className="bg-ourGreen flex flex-col p-3 sm:p-5 rounded-2xl">
        <PlanDayHeader days={Plan} />
        {!day ? (
          <div className="flex gap-10 overflow-x-scroll">
            {Plan.map((item) => (
              <DayPlanCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex gap-5">
            <DayPlanCard item={Plan[0]} />
            <div className="bg-white w-full hidden sm:block">지도</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
