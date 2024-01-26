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
import Image from "next/image";
import { useState } from "react";
import { StoredPlaceMiniCard } from "..";
import { Input } from "@/components/ui/input";
import { StoredPlaceCard } from "@/components";
import { StoredPlace } from "@/mocks";

export const AddPlaceModal = () => {
  const [bg, setBG] = useState("bg-white");

  return (
    <DialogContent className="max-w-md sm:max-w-7xl max-h-[45rem] sm:max-h-[50rem] bg-ourGreen flex flex-col items-center">
      <DialogHeader>
        <DialogTitle className="text-4xl mb-3 mt-5 font-bold">
          여행하고 싶은 장소를 추가해보세요!
        </DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <div className="flex gap-5 w-full sm:px-10">
        <div className="flex flex-col items-center gap-5">
          <div className="bg-white flex flex-col justify-center items-center p-3 rounded-full w-20 h-20">
            <Image
              src="/images/archive.png"
              alt="장소 보관함"
              width={50}
              height={50}
            />
            <div className="text-xs font-semibold">장소 보관함</div>
          </div>
          <div className="bg-white p-4 rounded-xl gap-3 flex flex-col h-96 sm:h-[32rem] overflow-y-auto">
            {StoredPlace.map((item) => (
              <StoredPlaceMiniCard key={item.id} place={item} />
            ))}
            {StoredPlace.map((item) => (
              <StoredPlaceMiniCard key={item.id} place={item} />
            ))}
          </div>
        </div>

        <div className="flex gap-5 flex-col">
          <div>
            <Input placeholder="떠나고 싶은 장소를 입력해주세요" />
          </div>
          <div className="bg-white rounded-xl gap-5 flex flex-col h-[26rem] sm:h-[35rem] p-3 sm:p-5 overflow-y-auto">
            {StoredPlace.map((item) => (
              <StoredPlaceCard key={item.id} item={item} />
            ))}
            {StoredPlace.map((item) => (
              <StoredPlaceCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="bg-white w-[200rem] hidden sm:flex">지도</div>
      </div>
      <DialogFooter className="m-auto">
        <DialogClose asChild>
          <Button>저장하기</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};
