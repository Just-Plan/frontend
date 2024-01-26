import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import { AddPlaceModal, StoredPlaceMiniCard } from "..";
import { Plan, StoredPlace } from "@/mocks";
import { StoredPlaceCard } from "@/components";
import { PlanDayHeader } from "../PlanDayHeader/PlanDayHeader";
import DayPlanCard from "@/components/DayPlanCard/DayPlanCard";

const PlanModifyDaily = () => {
  return (
    <div className="bg-ourGreen flex flex-row p-3 sm:p-5 rounded-2xl gap-5">
      <div className="bg-white rounded-2xl p-5 hidden sm:block">
        <div className="mb-5 flex justify-between">
          <div className="text-2xl font-bold ">장소 보관함</div>
          <Dialog>
            <DialogTrigger className="flex h-full bg-indigo-400 rounded-none text-white p-2">
              장소 추가
            </DialogTrigger>
            <AddPlaceModal />
          </Dialog>
        </div>
        <div className="flex flex-col gap-5">
          {StoredPlace.map((item) => (
            <StoredPlaceCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <PlanDayHeader days={Plan} isModify />
        <div className="flex bg-white mb-3 p-2 gap-3 rounded-xl overflow-x-auto sm:hidden">
          {StoredPlace.map((item) => (
            <StoredPlaceMiniCard key={item.id} place={item} />
          ))}
        </div>
        <div className="flex gap-5">
          <DayPlanCard item={Plan[0]} />
          <div className="bg-white w-full hidden sm:block">지도</div>
        </div>
      </div>
    </div>
  );
};

export default PlanModifyDaily;
