import type { IProps } from "./DayPlanCard.types";
import { AddedPlaceCard } from "..";
import { useAtomValue } from "jotai";
import { addedPlace, planInfoAtom } from "@/store";
import { add, format } from "date-fns";

const DayPlanCard = ({ day }: IProps) => {
  const planInfo = useAtomValue(planInfoAtom);
  const added = useAtomValue(addedPlace);

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
      </div>
      <div className="flex flex-col items-center h-[600px] w-full overflow-y-scroll relative">
        {added[day].map((item) => (
          <AddedPlaceCard key={item.name} item={item} time={10} />
        ))}
      </div>
    </div>
  );
};

export default DayPlanCard;
