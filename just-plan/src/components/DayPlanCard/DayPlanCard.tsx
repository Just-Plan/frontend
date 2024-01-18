import React, { PropsWithChildren } from "react";
import { Switch } from "../ui/switch";
import AddedPlaceCard from "../AddedPlaceCard/AddedPlaceCard";
import { IProps } from "./DayPlanCard.types";

const DayPlanCard = ({ item }: PropsWithChildren<IProps>) => {
  const { id, date, image, title, category, address } = item;
  return (
    <div className="bg-white flex flex-col w-fit p-6  rounded-3xl">
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
      <div className="flex flex-col gap-10 items-center h-[600px] overflow-y-scroll relative">
        <div className="border h-[600px] w-px absolute border-dashed	"></div>
        <AddedPlaceCard />
        <AddedPlaceCard />
        <AddedPlaceCard />
        <AddedPlaceCard />
        <AddedPlaceCard />
        <AddedPlaceCard />
        <AddedPlaceCard />
        <AddedPlaceCard />
      </div>
    </div>
  );
};

export default DayPlanCard;
