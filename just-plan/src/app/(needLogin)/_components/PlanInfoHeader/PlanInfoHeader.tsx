import { Dialog, DialogTrigger } from "@/components/dialog";
import { PlanInfo } from "@/mocks";
import Image from "next/image";
import React, { useState } from "react";
import EditPlanInfoModal from "../EditPlanInfoModal/EditPlanInfoModal";
import { Button } from "@/components/Button";
import ShowMoney from "../ShowMoney/ShowMoney";
import {
  IModifyPlanInfo,
  IPlanInfo,
  IPlanInfoDetail,
} from "@/types/plan.types";
import { useRouter, useSearchParams } from "next/navigation";
import { IPlanInfoHeader } from "./PlanInfoHeader.types";
import { usePatchPlanInfo } from "../../modify/_lib/postPlanInfo";

export const PlanInfoHeader = ({ isModify, planInfo }: IPlanInfoHeader) => {
  const [info, setInfo] = useState<IModifyPlanInfo>({
    planId: planInfo.planId,
    title: planInfo.title,
    tags: planInfo.tags,
    startDate: planInfo.startDate,
    endDate: planInfo.endDate,
    published: planInfo.published,
    budget: planInfo.budget,
    useExpense: planInfo.useExpense,
    expense: planInfo.expense,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId");
  
  const { mutate } = usePatchPlanInfo();

  const handleEdit = () => {
    router.push(`/modify?planId=${planId}&day=`);
  };

  const handleSave = () => {
    router.push(`/detail-plan?planId=${planId}&day=`);
  };

  const onSubmitModify = (modifyInfo: IModifyPlanInfo) => {
    console.log("우왕 업데이트!", modifyInfo);
    setInfo(modifyInfo);
    mutate(modifyInfo);
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
        <div className="ml-2">{planInfo.region.koreanName}</div>
        <div className="text-xs ml-28">
          {info.startDate.split("T")[0]}~{info.endDate.split("T")[0]}
        </div>
      </div>
      <div className="flex">
        <div className="flex items-center flex-1">
          <div className="font-bold text-2xl sm:text-3xl my-2 sm:my-3 mr-5">
            {info.title}
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
              <EditPlanInfoModal info={info} onSubmitModify={onSubmitModify} />
            </Dialog>
          )}
        </div>

        <div className="hidden sm:flex items-center hover:cursor-pointer rounded-full p-1 w-10 h-10 hover:bg-gray-200">
          <Image src="/images/map.png" alt="지도" width={40} height={40} />
        </div>
      </div>

      <div className="flex">
        <div className="text-cyan-600 font-bold flex-1 my-auto flex gap-3">
          {info.tags.map((tag) => (
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
      <ShowMoney cash={info.budget.cash} card={info.budget.card} />
    </div>
  );
};
