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
import { ChangeEvent, MouseEvent, PropsWithChildren, useState } from "react";
import type { IProps } from "./EditPlanInfoModal.types";
import HouseholdContent from "./_components/HouseholdContent/HouseholdContent";

const EditPlanInfoModal = ({ info, setInfo }: PropsWithChildren<IProps>) => {
  const [addHashTag, setAddHashTag] = useState<string>("");
  const [isCheckedHousehold, setIsCheckedHousehold] = useState(false);
  // const { date, title, hashTags, cache, card } = info;
  const { startDate, endDate, title, tags, budget } = info;

  const onChangeMoney = (e: ChangeEvent<HTMLInputElement>) => {
    const [name, value] = [e.target.name, e.target.value];
    if (Number.isNaN(Number(value))) return null;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleAddHashTag = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    setInfo({
      ...info,
      tags: [...info.tags, addHashTag],
    });
    setAddHashTag("");
  };

  const handleDeleteHashTag = (tag: string) => {
    const newHashTagList = info.tags.filter((item) => item !== tag);
    setInfo({
      ...info,
      tags: newHashTagList,
    });
  };

  console.log(isCheckedHousehold);

  return (
    <DialogContent className="w-90 sm:w-[450px] max-h-[40rem] overflow-y-auto overflow-x-hidden">
      <DialogHeader>
        <DialogTitle className="mb-3">여행 정보 수정</DialogTitle>
        <div className="m-1 sm:m-2">
          <Label htmlFor="title" variant="subTitle">
            여행 제목
          </Label>
          <Input
            id="title"
            placeholder={title}
            className="bg-ourGreen/80 mb-3 mt-1"
          />
          <Label htmlFor="hashtag" variant="subTitle">
            여행 해시태그
          </Label>
          <div className="flex gap-6">
            <Input
              id="hashtag"
              placeholder="추가할 태그를 입력해주세요"
              className="bg-ourGreen/80 mb-3 mt-1"
              onChange={(e) => setAddHashTag(e.target.value)}
            />
            <Button onClick={handleAddHashTag}>추가</Button>
          </div>
          <div className="flex gap-5 -mt-2 mb-4 ml-2">
            {tags.map((tag) => (
              <div key={tag} className="flex gap-0.5">
                <div className="text-blue-500">#{tag}</div>
                <div
                  className="hover:cursor-pointer hover:bg-gray-200 w-5 h-5 flex justify-center rounded-full"
                  onClick={() => handleDeleteHashTag(tag)}
                >
                  x
                </div>
              </div>
            ))}
          </div>
          <Label htmlFor="hashtag" variant="subTitle">
            여행 날짜
          </Label>
          <DateRangePicker className={"bg-ourGreen/80 rounded-3xl mb-3 mt-1"} />
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
                  value={budget.cash}
                  onChange={onChangeMoney}
                />
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
                  value={budget.card}
                  onChange={onChangeMoney}
                />
              </div>
              <div className="flex relative ">
                <div className="absolute top-1 left-2 w-8 h-8 text-md font-bold flex items-center justify-center">
                  All
                </div>
                <Input
                  variant={"totalMoney"}
                  value={Number(budget.cash) + Number(budget.card)}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <Label htmlFor="household" variant="subTitle">
              여행 가계부 작성하기
            </Label>
            <Switch
              checked={isCheckedHousehold}
              onCheckedChange={setIsCheckedHousehold}
              id="household"
            />
          </div>
        </div>
        {isCheckedHousehold && <HouseholdContent />}
      </DialogHeader>
      <DialogFooter className="m-auto">
        <DialogClose asChild>
          <Button type="submit">저장하기</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default EditPlanInfoModal;
