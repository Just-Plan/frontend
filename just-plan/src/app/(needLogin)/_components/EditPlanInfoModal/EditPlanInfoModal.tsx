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
import ShowMoney from "../ShowMoney/ShowMoney";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import DateRangePicker from "@/components/DateRangePicker/DateRangePicker";
import Image from "next/image";

const EditPlanInfoModal = () => {
  return (
    <DialogContent className="w-96 sm:w-[550px]">
      <DialogHeader>
        <DialogTitle className="mb-3">여행 정보 수정</DialogTitle>
        <DialogDescription className="">
          <Label htmlFor="title" variant="subTitle">
            여행 제목
          </Label>
          <Input
            id="title"
            placeholder="강윤지님의 제주도 먹고 뿌셔 복사본"
            className="bg-ourGreen/80 mb-3 mt-1"
          />
          <Label htmlFor="hashtag" variant="subTitle">
            여행 해시태그
          </Label>
          <Input
            id="hashtag"
            placeholder="추가할 태그를 입력해주세요"
            className="bg-ourGreen/80 mb-3 mt-1"
          />
          <div className="text-blue-500">#식도락 x #먹고뿌셔x</div>
          <Label htmlFor="hashtag" variant="subTitle">
            여행 날짜
          </Label>
          <DateRangePicker className={"bg-ourGreen/80 rounded-3xl mb-3 mt-1"} />
          <Label htmlFor="hashtag" variant="subTitle">
            여행 예산
          </Label>

          <div className="flex justify-between items-center">
            <div className="flex gap-2 sm:gap-5 my-5">
              <div className="flex relative ">
                <Image
                  src="/images/cash.png"
                  alt="현금"
                  className="absolute top-1 left-2"
                  width={30}
                  height={30}
                />
                <Input type="number" variant={"showMoney"} />
              </div>
              <div className="flex relative ">
                <Image
                  src="/images/card.png"
                  alt="카드"
                  className="absolute top-1 left-2"
                  width={30}
                  height={30}
                />
                <Input type="number" variant={"showMoney"} />
              </div>
              <div className="flex relative ">
                <div className="absolute top-1 left-2 w-8 h-8 text-md font-bold flex items-center justify-center">
                  All
                </div>
                <Input type="number" variant={"totalMoney"} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <Label htmlFor="household" variant="subTitle">
              여행 가계부 작성하기
            </Label>
            <Switch />
          </div>
        </DialogDescription>
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
