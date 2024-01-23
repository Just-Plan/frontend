"use client";

import { useState } from "react";
import DayPlanCard from "@/components/DayPlanCard/DayPlanCard";
import { Button } from "@/components/ui/Button";
import { Plan, PlanInfo, StoredPlace } from "@/mocks";
import Image from "next/image";
import ShowMoney from "../_components/ShowMoney/ShowMoney";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import EditPlanInfoModal from "../_components/EditPlanInfoModal/EditPlanInfoModal";
import type { IPlanInfo } from "@/types/plan.types";
import { PlanDayHeader } from "../_components/PlanDayHeader/PlanDayHeader";
import { AddedPlaceCard } from "@/components";

const Page = () => {
  const [info, setInfo] = useState<IPlanInfo>(PlanInfo);

  const { location, date, title, hashTags, cache, card } = PlanInfo;
  return (
    <div className="m-5 sm:m-10">
      <div className="">
        <div className="flex items-center">
          <Image
            src="/images/airplane.png"
            width={25}
            height={25}
            alt="비행기 아이콘"
          />
          <div className="ml-2">{location}</div>
          <div className="text-xs ml-28">{date}</div>
        </div>
        <div className="flex">
          <div className="flex items-center flex-1">
            <div className="font-bold text-2xl sm:text-3xl my-2 sm:my-3 mr-5">
              {title}
            </div>
            <Dialog>
              <DialogTrigger className="hover:cursor-pointer rounded-full p-1 hover:bg-gray-200">
                <Image
                  src="/images/edit.svg"
                  alt="수정"
                  width={27}
                  height={27}
                />
              </DialogTrigger>
              <EditPlanInfoModal info={info} setInfo={setInfo} />
              {/* <MemoModal /> */}
            </Dialog>
          </div>

          <div className="hidden sm:flex items-center hover:cursor-pointer rounded-full p-1 w-10 h-10 hover:bg-gray-200">
            <Image src="/images/map.png" alt="지도" width={40} height={40} />
          </div>
        </div>

        <div className="flex">
          <div className="text-cyan-600 font-bold flex-1 my-auto flex gap-3">
            {hashTags.map((tag) => (
              <div key={tag}># {tag}</div>
            ))}
          </div>
          <Button variant="outline" className="w-12 sm:w-28">
            저장
          </Button>
        </div>
        <ShowMoney cache={cache} card={card} />
      </div>
      <div className="bg-ourGreen flex flex-row p-3 sm:p-5 rounded-2xl gap-5">
        <div className="bg-white rounded-2xl">
          <div>장소 보관함</div>
          <div className="flex flex-col gap-5">
            {StoredPlace.map((item) => (
              <AddedPlaceCard key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div>
          <PlanDayHeader days={Plan} />
          <div className="flex gap-5">
            <DayPlanCard item={Plan[0]} />
            <div className="bg-white w-full">지도</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
