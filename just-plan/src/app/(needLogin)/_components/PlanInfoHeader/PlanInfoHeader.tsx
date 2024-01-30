import { Dialog, DialogTrigger } from "@/components/dialog";
import { PlanInfo } from "@/mocks";
import Image from "next/image";
import React, { useState } from "react";
import EditPlanInfoModal from "../EditPlanInfoModal/EditPlanInfoModal";
import { Button } from "@/components/Button";
import ShowMoney from "../ShowMoney/ShowMoney";
import { IPlanInfo } from "@/types/plan.types";
import { useRouter, useSearchParams } from "next/navigation";

export const PlanInfoHeader = ({ isModify }: { isModify?: boolean }) => {
  const { location, date, title, hashTags, cache, card } = PlanInfo;
  const [info, setInfo] = useState<IPlanInfo>(PlanInfo);
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId");

  const handleEdit = () => {
    router.push(`/modify?planId=${planId}&day=`);
  };

  const handleSave = () => {
    router.push(`/detail-plan?planId=${planId}&day=`);
  };
  return (
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
          {isModify && (
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
            </Dialog>
          )}
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
        {isModify ? (
          <Button
            variant="outline"
            className="w-12 sm:w-28"
            onClick={handleSave}
          >
            저장
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-12 sm:w-28"
            onClick={handleEdit}
          >
            편집하기
          </Button>
        )}
      </div>
      <ShowMoney cache={cache} card={card} />
    </div>
  );
};
