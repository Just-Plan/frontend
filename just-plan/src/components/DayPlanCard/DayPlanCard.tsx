import { Switch } from "../Switch";
import type { IProps } from "./DayPlanCard.types";
import { AddedPlaceCard } from "..";
import { useAtomValue } from "jotai";
import { addedPlace, planInfoAtom } from "@/store";
import { add, format } from "date-fns";

const DayPlanCard = ({ day }: IProps) => {
  const planInfo = useAtomValue(planInfoAtom);
  const added = useAtomValue(addedPlace);
  const latLongArray = added[day].map((item) => [
    item.latitude,
    item.longitude,
  ]);

  const origin = "37.7749,-122.4194"; // 샌프란시스코의 좌표
  const destination = "34.0522,-118.2437"; // 로스앤젤레스의 좌표

  // Directions API 호출
  // fetch(
  //   `/google/api/directions/json?origin=${origin}&destination=${destination}&key=${process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY}`,
  // )
  //   .then((response) => response.json())
  //   .then((data) => {
  //     const duration = data.routes[0].legs[0].duration.text;

  //     console.log("이동 시간:", duration);
  //   })
  //   .catch((error) => {
  //     console.error("Directions API 호출 중 오류:", error);
  //   });
  // console.log(latLongArray);
  return (
    <div className="bg-white flex flex-col w-fit p-6  rounded-3xl">
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

        <div className="flex">
          <Switch id={day} />
          <label htmlFor={day} className="ml-3">
            대중교통
          </label>
        </div>
      </div>
      <div className="flex flex-col items-center h-[600px] w-full overflow-y-scroll relative">
        {added[day].map((item, i) => (
          <AddedPlaceCard key={item.name} item={item} time={10} />
        ))}
      </div>
    </div>
  );
};

export default DayPlanCard;
