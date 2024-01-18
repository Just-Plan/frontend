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
import { memoBGList } from "@/constants";
import { useState } from "react";

const MemoModal = () => {
  const [bg, setBG] = useState("bg-white");

  return (
    <DialogContent className="w-96 sm:w-[550px]">
      <DialogHeader>
        <DialogTitle className="text-2xl mb-3">메모</DialogTitle>
        <DialogDescription className="flex justify-between border-t-2 border-b-2 py-1">
          {memoBGList.map((item) => (
            <div
              onClick={() => setBG(item)}
              className={`${item} w-10 sm:w-14 h-8 rounded-3xl hover:cursor-pointer ${
                item === "bg-white" ? "border" : ""
              }`}
              key={item}
            ></div>
          ))}
        </DialogDescription>
      </DialogHeader>
      <textarea
        className={`flex h-80 sm:h-96 p-5 resize-none outline-none text-xl ${bg} ${
          bg === "bg-white" ? "border" : ""
        }`}
      />
      <DialogFooter className="m-auto">
        <DialogClose asChild>
          <Button type="submit">저장하기</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default MemoModal;
