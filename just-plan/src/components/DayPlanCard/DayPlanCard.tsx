import React, { PropsWithChildren } from "react";
import { Switch } from "../ui/switch";
import { IProps } from "./DayPlanCard.types";
import { Plan } from "@/mocks";
import { AddedPlaceCard } from "..";

const DayPlanCard = ({ item }: PropsWithChildren<IProps>) => {
  const { id, date, image, title, category, address } = item;
  return (
    <div className="bg-white flex flex-col w-full p-6  rounded-3xl">
      <div className="flex justify-between">
        <div>
          <div className="font-bold text-2xl text-slate-400">{id}일차</div>
          <div className="text-slate-400 text-sm font-bold">{date}</div>
        </div>

        <div className="flex">
          <Switch id={id.toString()} />
          <label htmlFor={id.toString()} className="ml-3">
            대중교통
          </label>
        </div>
      </div>
      <div className="flex flex-col items-center h-[600px] w-full overflow-y-scroll relative">
        {Plan.map((item) => (
          <AddedPlaceCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default DayPlanCard;
