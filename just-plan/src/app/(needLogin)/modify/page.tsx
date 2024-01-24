"use client";

import DayPlanCard from "@/components/DayPlanCard/DayPlanCard";
import { Plan } from "@/mocks";
import { PlanDayHeader } from "../_components/PlanDayHeader/PlanDayHeader";
import { useSearchParams } from "next/navigation";
import { PlanInfoHeader } from "../_components";

const Page = () => {
  const searchParams = useSearchParams();

  const planId = searchParams.get("planId");
  const day = searchParams.get("day");

  console.log("planId:", planId, typeof planId);
  console.log("day:", day, typeof day);

  return (
    <div className="m-5 sm:m-10">
      <PlanInfoHeader isModify />

      <div className="bg-ourGreen flex flex-col p-3 sm:p-5 rounded-2xl">
        <PlanDayHeader days={Plan} isModify />
        <div className="flex gap-10 overflow-x-scroll">
          {Plan.map((item) => (
            <DayPlanCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
