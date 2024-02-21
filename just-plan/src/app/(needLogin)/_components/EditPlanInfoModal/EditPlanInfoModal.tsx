"use client";

import { Button } from "@/components/Button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { Switch } from "@/components/Switch";
import { Label } from "@/components/Label";
import { Input } from "@/components/Input";

import DateRangePicker from "@/components/DateRangePicker/DateRangePicker";
import Image from "next/image";
import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useState } from "react";
import type { IProps } from "./EditPlanInfoModal.types";
import HouseholdContent from "./_components/HouseholdContent/HouseholdContent";
import type { DateRange } from "react-day-picker";
import { add } from "date-fns";
import { AddHashTags } from "../AddHashTags/AddHashTags";
import type { IModifyPlanInfo } from "@/types/plan.types";
import { MAX_LEN_PLAN_TITLE } from "@/constants/MaxLen";
import { isValidString } from "@/utils/isValidString";

const EditPlanInfoModal = ({ info, onSubmitModify }: IProps) => {
  const [addHashTags, setAddHashTags] = useState<string[]>([]);
  const [modifyInfo, setModifyInfo] = useState<IModifyPlanInfo>({
    planId: "",
    title: "",
    tags: [""],
    startDate: new Date(),
    endDate: new Date(),
    published: false,
    budget: {
      cash: 0,
      card: 0,
    },
    useExpense: false,
    expense: {
      food: 0,
      transportation: 0,
      lodging: 0,
      shopping: 0,
      etc: 0,
    },
  });
  const [date, setDate] = useState<DateRange | undefined>({
    from: modifyInfo.startDate,
    to: modifyInfo.endDate,
  });

  useEffect(() => {
    setModifyInfo(info);
    setDate({
      from: info.startDate,
      to: info.endDate,
    });
    setAddHashTags(info.tags);
  }, [info]);

  console.log("info 출력:", info);
  const onChangeMoney = (e: ChangeEvent<HTMLInputElement>) => {
    const [name, value] = [e.target.name, e.target.value];
    if (Number.isNaN(Number(value))) return null;
    setModifyInfo({
      ...modifyInfo,
      budget: {
        ...modifyInfo.budget,
        [name]: Number(value),
      },
    });
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setModifyInfo({
      ...modifyInfo,
      title: e.target.value,
    });
  };

  const onChangeCheck = () => {
    setModifyInfo({
      ...modifyInfo,
      useExpense: !modifyInfo.useExpense,
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 유효한 입력이 아니면 통과 안되도록
    if (!isValidString(modifyInfo.title)) return;

    const newModifyInfo = {
      ...modifyInfo,
      tags: addHashTags,
      startDate: add(date?.from as Date, { hours: 9 }),
      endDate: add(date?.to as Date, { hours: 9 }),
    };

    // api 요청 보내기
    onSubmitModify(newModifyInfo);
  };

  const onChangeExpense = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (Number.isNaN(Number(value))) return null;
    console.log(name, value);
    setModifyInfo({
      ...modifyInfo,
      expense: {
        ...modifyInfo.expense,
        [name]: value,
      },
    });
  };

  return (
    <DialogContent className="w-90 sm:w-[450px] max-h-[40rem] overflow-y-auto overflow-x-hidden">
      <form onSubmit={onSubmit} className="flex flex-col">
        <DialogHeader>
          <DialogTitle className="mb-3">여행 정보 수정</DialogTitle>
          <div className="m-1 sm:m-2">
            <Label htmlFor="title" variant="subTitle">
              여행 제목
            </Label>
            <Input
              id="title"
              value={modifyInfo.title}
              placeholder={modifyInfo.title}
              className="border-2 border-ourGreen/80 mb-3 mt-1"
              onChange={onChangeTitle}
              maxLength={MAX_LEN_PLAN_TITLE}
            />
            {modifyInfo.title.length >= MAX_LEN_PLAN_TITLE && (
              <div className="text-red-400 text-xs -mt-1.5 mb-2 pl-3">
                {MAX_LEN_PLAN_TITLE}이하로 입력해주세요
              </div>
            )}
            {!isValidString(modifyInfo.title) && (
              <div className="text-red-400 text-xs -mt-1.5 mb-2 pl-3">
                유효한 입력이 아닙니다.
              </div>
            )}
            <Label htmlFor="hashtag" variant="subTitle">
              여행 해시태그
            </Label>
            <AddHashTags
              setAddHashTags={setAddHashTags}
              addHashTags={addHashTags}
            />
            <Label htmlFor="hashtag" variant="subTitle">
              여행 날짜
            </Label>
            <DateRangePicker
              // startDate={modifyInfo.startDate}
              // endDate={modifyInfo.endDate}
              date={date}
              setDate={setDate}
            />
            <Label htmlFor="hashtag" variant="subTitle">
              여행 예산
            </Label>

            <div className="flex justify-between items-center mt-1 mb-3">
              <div className="flex gap-2 sm:gap-5">
                <div className="flex relative ">
                  <Image
                    src="/images/cash.png"
                    alt="현금"
                    className="absolute top-2 left-2"
                    width={25}
                    height={25}
                  />
                  <Input
                    variant={"showMoney"}
                    name="cash"
                    value={modifyInfo.budget.cash}
                    onChange={onChangeMoney}
                  />
                  <div className="absolute right-2 top-2 text-sm">₩</div>
                </div>
                <div className="flex relative justify-center">
                  <Image
                    src="/images/card.png"
                    alt="카드"
                    className="absolute top-2 left-2"
                    width={25}
                    height={25}
                  />
                  <Input
                    variant={"showMoney"}
                    name="card"
                    value={modifyInfo.budget.card}
                    onChange={onChangeMoney}
                  />
                  <div className="absolute right-2 top-2 text-sm">₩</div>
                </div>
                <div className="flex relative ">
                  <div className="absolute top-1 left-2 w-8 h-8 text-md font-bold flex items-center justify-center">
                    All
                  </div>
                  <Input
                    variant={"totalMoney"}
                    value={
                      Number(modifyInfo.budget.cash) +
                      Number(modifyInfo.budget.card)
                    }
                    readOnly
                  />
                  <div className="absolute right-2 top-2 text-sm">₩</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-10">
              <Label htmlFor="household" variant="subTitle">
                여행 가계부 작성하기
              </Label>
              <Switch
                checked={modifyInfo.useExpense}
                onCheckedChange={onChangeCheck}
                id="household"
              />
            </div>
          </div>
          {modifyInfo.useExpense && (
            <HouseholdContent
              totalMoney={modifyInfo.budget.card + modifyInfo.budget.cash}
              expense={modifyInfo.expense}
              onChangeExpense={onChangeExpense}
            />
          )}
        </DialogHeader>
        <DialogFooter className="m-auto mt-5">
          <DialogClose asChild>
            <Button type="submit" disabled={!isValidString(modifyInfo.title)}>
              저장하기
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default EditPlanInfoModal;
