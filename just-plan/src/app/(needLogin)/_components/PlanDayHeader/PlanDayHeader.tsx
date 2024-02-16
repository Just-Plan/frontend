import { useRouter, useSearchParams } from "next/navigation";
import type { IProps } from "./PlanDayHeader.types";
import { useAtomValue } from "jotai";
import { addedPlace, planInfoAtom } from "@/store";
import { add, format } from "date-fns";

export const PlanDayHeader = ({ isModify }: IProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const choose = searchParams.get("day");
  const added = useAtomValue(addedPlace);
  const planInfo = useAtomValue(planInfoAtom);

  const onChangeDay = (day: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("day", day);
    router.push(
      `/${isModify ? "modify" : "detail-plan"}?${newSearchParams.toString()}`
    );
  };
  return (
    <div className=" bg-white h-20 rounded-2xl mb-5 flex gap-5 sm:gap-10 items-center p-5 sm:px-8 font-bold overflow-x-auto overflow-y-hidden">
      <div
        className="hidden sm:block hover:cursor-pointer py-3 px-5 relative"
        onClick={() => onChangeDay("")}
      >
        <div className="">전체보기</div>
        {!choose && (
          <div className="bg-blue-300 w-full h-1 absolute bottom-0 left-0"></div>
        )}
      </div>

      {Object.keys(added).map((key) => (
        <div
          className="flex flex-col items-center hover:cursor-pointer py-1 px-2 relative"
          key={key}
          onClick={() => onChangeDay(key)}
        >
          <div>Day{key}</div>
          <div className="text-slate-400 text-xs">{format(add(planInfo.startDate, {days: Number(key) - 1}), "yyyy.MM.dd")}</div>
          {!!choose && choose === key && (
            <div className="bg-blue-300 w-full h-1 absolute bottom-0 left-0"></div>
          )}
        </div>
      ))}
    </div>
  );
};
