"use client";

import DayPlanCard from "@/components/DayPlanCard/DayPlanCard";
import { Plan, StoredPlace } from "@/mocks";
import { PlanDayHeader } from "../_components/PlanDayHeader/PlanDayHeader";
import { useSearchParams } from "next/navigation";
import { PlanInfoHeader } from "../_components";
import PlanModifyDaily, { ITems } from "../_components/PlanModifyDaily/PlanModifyDaily";
import { useState } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<ITems>({
    stored: StoredPlace,
    added: Plan,
  });
  
  const planId = searchParams.get("planId");
  const day = searchParams.get("day");

  console.log(items);
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
        <PlanModifyDaily items={items} setItems={setItems} />
      )}
    </div>
  );
};

export default Page;
