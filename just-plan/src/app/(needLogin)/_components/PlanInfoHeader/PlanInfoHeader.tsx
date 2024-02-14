"use client";

import { Dialog, DialogTrigger } from "@/components/dialog";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EditPlanInfoModal from "../EditPlanInfoModal/EditPlanInfoModal";
import { Button } from "@/components/Button";
import ShowMoney from "../ShowMoney/ShowMoney";
import type { IModifyPlanInfo, IOwner } from "@/types/plan.types";
import { useRouter, useSearchParams } from "next/navigation";
import type { IPlanInfoHeader } from "./PlanInfoHeader.types";
import { usePatchPlanInfo } from "../../modify/_lib/postPlanInfo";
import { format } from "date-fns";
import { addedPlace, planInfoAtom, storedPlace } from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { usePatchPlaceInfo } from "@/hooks/usePostPlanMutation";
import { IDayPlan, IDayUpdates, IPlaceRequestBody } from "@/types/place.types";

interface IBody {
  dayUpdates: IDayPlan;
  placeDeleteIds: number[];
}

export const PlanInfoHeader = ({ isModify }: IPlanInfoHeader) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId");
  const planInfo = useAtomValue(planInfoAtom);
  const [isCloned, setIsCloned] = useState(false);

  const [info, setInfo] = useState<IModifyPlanInfo>({
    planId: "",
    title: "",
    tags: [],
    startDate: new Date(),
    endDate: new Date(),
    published: false,
    budget: { cash: 0, card: 0 },
    useExpense: false,
    expense: {
      food: 0,
      transportation: 0,
      loadging: 0,
      shopping: 0,
      etc: 0,
    },
  });

  console.log("리렌더링");
  useEffect(() => {
    setInfo({
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
    const cloneCheck = !!planInfo.originPlan;
    console.log(
      "cloneCheck",
      cloneCheck,
      "planInfo.originPlan",
      !!planInfo.originPlan,
    );
    setIsCloned(cloneCheck);

    if (cloneCheck) {
      // 유저 찾기
      const owner =
        planInfo.originPlan.users !== undefined &&
        planInfo.originPlan?.users.find((user: IOwner) => user.owner === true)!;
      owner && userCloneInfo(owner);
    }
  }, [planInfo]);

  const [added, setAdded] = useAtom(addedPlace);
  const [stored, setStored] = useAtom(storedPlace);

  const { mutate: planMutate } = usePatchPlanInfo();
  const { mutate: placeMutate } = usePatchPlaceInfo();

  // clone 한 일정인지 여부
  const [cloneInfo, userCloneInfo] = useState<IOwner>({
    email: "",
    mbti: "",
    name: "",
    owner: false,
  });

  const onMoveToEdit = () => {
    router.push(`/modify?planId=${planId}&day=`);
  };

  const onMoveToSave = () => {
    const newStored = [...stored];
    const resultStored = newStored.map((v, index) => {
      return { ...v, orderNum: index + 1 };
    });
    setStored(resultStored);

    const temp2 = { ...added };
    console.log(`Object.keys(added):`, Object.keys(added));
    Object.keys(added).forEach((key) => {
      const newAdded = [...added[key]];
      console.log("new added:", newAdded);
      const resultAdded = newAdded.map((v, index) => {
        return { ...v, orderNum: index + 1 };
      });
      temp2[`${key}`] = resultAdded;
      console.log("temp2 출력해보기! key=", key, "temp2=", temp2);
    });
    console.log("temp2:", temp2);
    setAdded(temp2);

    // 두개 합치기
    const newBody: IBody = {
      dayUpdates: {
        ...temp2,
        "0": { ...resultStored },
      },
      placeDeleteIds: [],
    };

    let newDayUpdates: IDayUpdates = {};

    Object.keys(newBody.dayUpdates).forEach((key) => {
      const temp = Object.keys(newBody.dayUpdates[key]).map((item) => {
        return {
          placeId: newBody.dayUpdates[key][Number(item)].placeId,
          orderNum: newBody.dayUpdates[key][Number(item)].orderNum,
          memo: newBody.dayUpdates[key][Number(item)].memo,
        };
      });
      newDayUpdates[key] = temp;
    });

    const temp: IPlaceRequestBody = { ...newBody, dayUpdates: newDayUpdates };

    placeMutate({ planId: Number(planId), body: temp });
    router.push(`/detail-plan?planId=${planId}&day=`);
  };

  const onSubmitModify = (modifyInfo: IModifyPlanInfo) => {
    setInfo(modifyInfo);
    planMutate(modifyInfo);
  };

  const onMoveToOrigin = () => {
    router.push(`/detail-plan?planId=${planInfo.originPlan?.planId}&day=`);
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
          {format(info.startDate, "yyyy-MM-dd")} ~{" "}
          {format(info.endDate, "yyyy-MM-dd")}
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
        {!!planInfo.originPlan && (
          <div onClick={onMoveToOrigin}>
            cloned by {cloneInfo.name}님의 {planInfo.originPlan.title}
          </div>
        )}

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
            onClick={onMoveToSave}
          >
            저장
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-12 sm:w-28"
            onClick={onMoveToEdit}
          >
            편집하기
          </Button>
        )}
      </div>
      <ShowMoney cash={info.budget.cash} card={info.budget.card} />
    </div>
  );
};
