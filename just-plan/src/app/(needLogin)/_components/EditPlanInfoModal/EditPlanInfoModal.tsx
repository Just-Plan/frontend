"use client";

import { Button } from "@/components/ui/Button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import DateRangePicker from "@/components/DateRangePicker/DateRangePicker";
import Image from "next/image";
import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  useState,
} from "react";
import { IProps } from "./EditPlanInfoModal.types";

const EditPlanInfoModal = ({ info, setInfo }: PropsWithChildren<IProps>) => {
  const [addHashTag, setAddHashTag] = useState<string>("");
  const { date, title, hashTags, cache, card } = info;

  const onChangeMoney = (e: ChangeEvent<HTMLInputElement>) => {
    const [name, value] = [e.target.name, e.target.value];
    if (Number.isNaN(Number(value))) return null;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleAddHashTag = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    setInfo({
      ...info,
      hashTags: [...info.hashTags, addHashTag],
    });
    setAddHashTag("");
  };

  const handleDeleteHashTag = (tag: string) => {
    const newHashTagList = info.hashTags.filter((item) => item !== tag);
    setInfo({
      ...info,
      hashTags: newHashTagList,
    });
  };

  return (
    <DialogContent className="w-80 sm:w-[450px]">
      <DialogHeader>
        <DialogTitle className="mb-3">여행 정보 수정</DialogTitle>
        <div className="m-2">
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
            {hashTags.map((tag) => (
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
                  name="cache"
                  value={cache}
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
                  value={card}
                  onChange={onChangeMoney}
                />
              </div>
              <div className="flex relative ">
                <div className="absolute top-1 left-2 w-8 h-8 text-md font-bold flex items-center justify-center">
                  All
                </div>
                <Input
                  variant={"totalMoney"}
                  value={Number(cache) + Number(card)}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <Label htmlFor="household" variant="subTitle">
              여행 가계부 작성하기
            </Label>
            <Switch />
          </div>
        </div>
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
