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
import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useState,
} from "react";
import type { IProps } from "./EditPlanInfoModal.types";
import HouseholdContent from "./_components/HouseholdContent/HouseholdContent";
import { DateRange } from "react-day-picker";
import { add } from "date-fns";

const EditPlanInfoModal = ({
  info,
  onSubmitModify,
}: IProps) => {
  const [addHashTag, setAddHashTag] = useState<string>("");
  const [modifyInfo, setModifyInfo] = useState(info);
  const [date, setDate] = useState<DateRange | undefined>({
    from: modifyInfo.startDate,
    to: modifyInfo.endDate,
  });

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

  const onAddHashTag = (
    e: MouseEvent<HTMLButtonElement>,
  ) => {
    if (addHashTag === "") return;
    setModifyInfo({
      ...modifyInfo,
      tags: [...modifyInfo.tags, addHashTag],
    });
    setAddHashTag("");
  };

  const onDeleteHashTag = (tag: string) => {
    const newHashTagList = info.tags.filter((item) => item !== tag);
    setModifyInfo({
      ...modifyInfo,
      tags: newHashTagList,
    });
  };

  const onChangeCheck = () => {
    setModifyInfo({
      ...modifyInfo,
      useExpense: !modifyInfo.useExpense
    })
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newModifyInfo = {
      ...modifyInfo,
      startDate: add(date?.from as Date, {hours: 9}),
      endDate: add(date?.to as Date, {hours: 9})
    }
    
    // api 요청 보내기
    onSubmitModify(newModifyInfo);
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
              className="bg-ourGreen/80 mb-3 mt-1"
              onChange={onChangeTitle}
            />
            <Label htmlFor="hashtag" variant="subTitle">
              여행 해시태그
            </Label>
            <div className="flex gap-6">
              <Input
                id="hashtag"
                placeholder="추가할 태그를 입력해주세요"
                className="bg-ourGreen/80 mb-3 mt-1"
                value={addHashTag}
                onChange={(e) => setAddHashTag(e.target.value)}
              />
              <Button type="button" onClick={onAddHashTag}>
                추가
              </Button>
            </div>
            <div className="flex gap-5 -mt-2 mb-4 ml-2">
              {modifyInfo.tags.map((tag) => (
                <div key={tag} className="flex gap-0.5">
                  <div className="text-blue-500">#{tag}</div>
                  <div
                    className="hover:cursor-pointer hover:bg-gray-200 w-5 h-5 flex justify-center rounded-full"
                    onClick={() => onDeleteHashTag(tag)}
                  >
                    x
                  </div>
                </div>
              ))}
            </div>
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
          {modifyInfo.useExpense && <HouseholdContent />}
        </DialogHeader>
        <DialogFooter className="m-auto mt-5">
          <DialogClose asChild>
            <Button type="submit">저장하기</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default EditPlanInfoModal;
