"use client";

import { Button } from "@/components/Button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { memoBGList } from "@/constants";
import type { IMemo } from "@/types/place.types";
import type { FormEvent } from "react";
import { useState } from "react";

interface IProps {
  memo: IMemo;
  onSubmitMemo: (editMemo: IMemo) => void;
}

const MemoModal = ({ memo, onSubmitMemo }: IProps) => {
  const [memoInfo, setMemoInfo] = useState(memo);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("텍스트 출력", memoInfo.content);
    console.log("색 출력:", memoInfo.color);
    onSubmitMemo(memoInfo);
  };

  const onClickColor = (item: string) => {
    setMemoInfo({
      ...memoInfo,
      color: item,
    });
  };

  const onChangeText = (text: string) => {
    setMemoInfo({
      ...memoInfo,
      content: text,
    });
  };

  return (
    <DialogContent className="w-96 sm:w-[550px]">
      <DialogHeader>
        <DialogTitle className="text-2xl mb-3">메모</DialogTitle>
        <div className="flex justify-between border-t-2 border-b-2 py-1">
          {memoBGList.map((item) => (
            <div
              onClick={() => onClickColor(item)}
              className={`${item} w-10 sm:w-14 h-8 rounded-3xl hover:cursor-pointer ${
                item === "bg-white" ? "border" : ""
              }`}
              key={item}
            ></div>
          ))}
        </div>
      </DialogHeader>
      <form onSubmit={onSubmit} id="memo" className="flex">
        <textarea
          className={`flex h-80 sm:h-96 p-5 resize-none outline-none text-xl w-full ${memoInfo.color} ${
            memoInfo.color === "bg-white" ? "border" : ""
          }`}
          value={memoInfo.content || ""}
          onChange={(e) => onChangeText(e.target.value)}
        />
      </form>
      <DialogFooter className="m-auto">
        <DialogClose asChild>
          <Button type="submit" form="memo">
            저장하기
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default MemoModal;
