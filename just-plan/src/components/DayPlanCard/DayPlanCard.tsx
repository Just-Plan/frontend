import React from "react";
import { Switch } from "../ui/switch";
import AddedPlaceCard from "../AddedPlaceCard/AddedPlaceCard";

const DayPlanCard = () => {
  return (
    <div className="bg-white flex flex-col w-fit p-6  rounded-3xl">
      <div className="flex justify-between">
        <div>
          <div className="font-bold text-2xl text-slate-400">1일차</div>
          <div className="text-slate-400 text-sm font-bold">2024.01.12</div>
        </div>

        <div className="flex">
          <Switch id="airplane-mode" />
          <label htmlFor="airplane-mode" className="ml-3">
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
