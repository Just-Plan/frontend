"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IProps } from "./DayPlanCard.types";
import { AddedPlaceCard } from "..";
import { useAtomValue } from "jotai";
import { addedPlace, planInfoAtom } from "@/store";
import { add, format } from "date-fns";
import { useEffect, useState } from "react";
import { getKaKaoTravelTimes } from "@/utils/kakaoTravelTime";

const DayPlanCard = ({ day }: IProps) => {
  const planInfo = useAtomValue(planInfoAtom);
  const added = useAtomValue(addedPlace);
  const [travelTimes, setTravelTimes] = useState<any[]>([]);

  useEffect(() => {
    const fetchTravelTimes = async () => {
      const latLongArray = added[day]?.map((item) => [
        item.longitude,
        item.latitude,
      ]);
      console.log("latLongArray", latLongArray);
      const promises = latLongArray?.slice(0, -1).map((startPoint, i) => {
        const endPoint = latLongArray[i + 1];
        console.log("start:", startPoint, "end:", endPoint);
        return getKaKaoTravelTimes(startPoint, endPoint)
          .then((travelTime) => travelTime)
          .catch((error) => {
            console.error("Error fetching travel time:", error);
            return null;
          });
      });
      const allTravelTimes = await Promise.all(promises);
      setTravelTimes(allTravelTimes);
    };

    fetchTravelTimes();
  }, [added[day]]);

  return (
    <div className="bg-white flex flex-col w-[300px] sm:w-96 p-6 rounded-3xl">
      <div className="flex justify-between">
        <div>
          <div className="font-bold text-2xl text-slate-400">{day}일차</div>
          <div className="text-slate-400 text-sm font-bold">
            {format(
              add(planInfo.startDate, { days: Number(day) - 1 }),
              "yyyy.MM.dd",
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center h-[600px] w-[280px] sm:w-[20rem] overflow-y-auto relative mt-3">
        {added[day]?.map((item, index) => (
          <AddedPlaceCard
            key={item.name}
            item={item}
            time={travelTimes[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default DayPlanCard;
