"use client";

import DayPlanCard from "@/components/DayPlanCard/DayPlanCard";
import { PlanDayHeader } from "../_components/PlanDayHeader/PlanDayHeader";
import { useSearchParams } from "next/navigation";
import { PlanInfoHeader } from "../_components";
import { useGetPlanInfo } from "@/hooks";
import { useEffect } from "react";
import { addedPlace, planInfoAtom, storedPlace } from "@/store";
import { useAtom, useSetAtom } from "jotai";
import { useGetPlaceInfo } from "@/hooks/useGetPlaceInfo";
import { IDayPlan } from "@/types/place.types";

const Page = () => {
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId") as string;
  const day = searchParams.get("day");
  const [planInfo, setPlanInfo] = useAtom(planInfoAtom);
  const {data: planData, error: planError, isLoading: planIsLoading} = useGetPlanInfo(planId);
  const {data: placeData, error: placeError, isLoading: placeIsLoading} = useGetPlaceInfo(planId);

  const setStored = useSetAtom(storedPlace)
  const [added, setAdded] = useAtom(addedPlace);

  useEffect(() => {
    if (planData) {
      setPlanInfo(planData); // 데이터가 있을 경우 atom을 업데이트
      console.log('planInfo', planInfo);
    }
  }, [planData]);

  useEffect(() => {
    if (placeData) {
      console.log('placeData 출력', placeData);

      setStored(placeData.daysPlaces[0]);
      console.log('stored 출력', placeData.daysPlaces[0])

      const newAdded: IDayPlan = {}
      for(let i=1 ; i < Object.keys(placeData.daysPlaces).length ; i++){
        let key = Object.keys(placeData.daysPlaces)[i];
        newAdded[key] = placeData.daysPlaces[key];
      }
      console.log('added 출력', newAdded)
      setAdded(newAdded);
    }
  }, [placeData]);

  if (planIsLoading || placeIsLoading) return <div>로딩중</div>;
  if (planError || placeError) return <div>에러</div>;

  return (
    <div className="m-5 sm:m-10">
      <PlanInfoHeader />
      <div className="bg-ourGreen flex flex-col p-3 sm:p-5 rounded-2xl">
        <PlanDayHeader />
        {!day ? (
          <div className="flex gap-10 overflow-x-scroll">
            {Object.keys(added).map((key) => (
              <DayPlanCard key={key} day={key} />
            ))}
          </div>
        ) : (
          <div className="flex gap-5">
            <DayPlanCard day={day} />
            <div className="bg-white w-full hidden sm:block">지도</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
