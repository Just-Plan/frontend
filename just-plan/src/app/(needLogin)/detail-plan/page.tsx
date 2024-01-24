"use client";

import DayPlanCard from "@/components/DayPlanCard/DayPlanCard";
import { Plan } from "@/mocks";
import { PlanDayHeader } from "../_components/PlanDayHeader/PlanDayHeader";
import { useSearchParams } from "next/navigation";
import { PlanInfoHeader } from "../_components";

const Page = () => {
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId");

  return (
    <div className="m-5 sm:m-10">
      <PlanInfoHeader />
      <div className="bg-ourGreen flex flex-row p-3 sm:p-5 rounded-2xl gap-5">
        <div className="flex flex-col w-full">
          <PlanDayHeader days={Plan} />
          <div className="flex gap-5">
            <DayPlanCard item={Plan[0]} />
            <div className="bg-white w-full hidden sm:block">지도</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
