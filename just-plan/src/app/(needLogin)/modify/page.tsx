"use client";

import DayPlanCard from "@/components/DayPlanCard/DayPlanCard";
import { Plan } from "@/mocks";
import { PlanDayHeader } from "../_components/PlanDayHeader/PlanDayHeader";
import { useSearchParams } from "next/navigation";
import { PlanInfoHeader } from "../_components";
import PlanModifyDaily from "../_components/PlanModifyDaily/PlanModifyDaily";

const Page = () => {
  const searchParams = useSearchParams();

  const planId = searchParams.get("planId");
  const day = searchParams.get("day");

  return (
    <div className="m-5 sm:m-10">
      <PlanInfoHeader isModify />

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
        <PlanModifyDaily />
      )}
    </div>
  );
};

export default Page;
