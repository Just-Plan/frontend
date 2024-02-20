"use client";

import DayPlanCard from "@/components/DayPlanCard/DayPlanCard";
import { PlanDayHeader } from "../_components/PlanDayHeader/PlanDayHeader";
import { useSearchParams } from "next/navigation";
import { PlanInfoHeader } from "../_components";
import PlanModifyDaily from "../_components/PlanModifyDaily/PlanModifyDaily";
import { useAtom, useSetAtom } from "jotai";
import { addedPlace, planInfoAtom, storedPlace } from "@/store";
import { useEffect } from "react";
import { useGetPlanInfo } from "@/hooks";
import { useGetPlaceInfo } from "@/hooks/useGetPlaceInfo";
import type { IDayPlan } from "@/types/place.types";

const Page = () => {
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId") as string;
  const day = searchParams.get("day");

  const [planInfo, setPlanInfo] = useAtom(planInfoAtom);
  const setStored = useSetAtom(storedPlace);

  const [added, setAdded] = useAtom(addedPlace);
  const {
    data: planData,
    error: planError,
    isLoading: planIsLoading,
    refetch: planRefetch,
  } = useGetPlanInfo(planId);
  const {
    data: placeData,
    error: placeError,
    isLoading: placeIsLoading,
    refetch: placeRefetch,
  } = useGetPlaceInfo(planId);

  useEffect(() => {
    if (planData) {
      setPlanInfo(planData); // 데이터가 있을 경우 atom을 업데이트
    }
  }, [planData]);

  useEffect(() => {
    if (placeData) {
      setStored(placeData.daysPlaces[0]);

      const newAdded: IDayPlan = {};
      for (let i = 1; i < Object.keys(placeData.daysPlaces).length; i++) {
        const key = Object.keys(placeData.daysPlaces)[i];
        newAdded[key] = placeData.daysPlaces[key];
      }
      setAdded(newAdded);
    }
  }, [placeData]);

  // 만약, 저장을 누르면 정보 다시 로딩
  // -> 쿼리키 업데이트  하는 방식으로 수정
  const onReload = () => {
    planRefetch();
    placeRefetch();
  };

  if (planIsLoading || placeIsLoading) return <div>로딩중</div>;
  if (planError || placeError) return <div>에러</div>;

  return (
    <div className="m-5 sm:m-10">
      <PlanInfoHeader isModify onReload={onReload} />

      {!day ? (
        <div className="bg-ourGreen flex flex-col p-3 sm:p-5 rounded-2xl">
          <PlanDayHeader isModify />
          <div className="flex gap-10 overflow-x-scroll">
            {Object.keys(added).map((key) => (
              <DayPlanCard key={key} day={key} />
            ))}
          </div>
        </div>
      ) : (
        <PlanModifyDaily
          day={day}
          planRegion={planInfo.region}
          places={placeData!}
          planId={Number(planId)}
        />
      )}
    </div>
  );
};

export default Page;
