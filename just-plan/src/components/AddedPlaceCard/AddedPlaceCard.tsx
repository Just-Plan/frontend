"use client";
import Image from "next/image";
import type { IProps } from "./AddedPlaceCard.types";
import { Dialog, DialogTrigger } from "../dialog";
import MemoModal from "@/app/(needLogin)/_components/MemoModal/MemoModal";
import DetailPlaceModal from "@/app/(needLogin)/_components/DetailPlaceModal/DetailPlaceModal";
import type { IMemo } from "@/types/place.types";
import { useAtom } from "jotai";
import { addedPlace } from "@/store";
import { useState } from "react";

export const AddedPlaceCard = ({ item, time }: IProps & { time: number }) => {
  const {
    placeId,
    name,
    formattedAddress,
    types,
    memo,
    latitude,
    longitude,
    // photoReference,
  } = item;
  const image = "/images/image1.png"; // 임시
  const [added, setAdded] = useAtom(addedPlace);
  const [open, setOpen] = useState(false);

  const day = "1";
  const onSubmitMemo = (editMemo: IMemo) => {
    // 와 이거 어떻게 바꾸지???
    console.log("editMemo:", editMemo);
    console.log("added[1]", added[day]);
    const temp = added[day].map((item) =>
      item.name === name ? { ...item, memo: editMemo } : item,
    );

    console.log("added[1] edit", temp);

    setAdded({
      ...added,
      1: temp,
    });
  };
  return (
    <div>
      <div>
        <div className="flex relative flex-col w-full hover:cursor-pointer">
          <div className="border w-[280px] sm:w-80 rounded-xl flex p-3 z-10 bg-white">
            <div className="w-16 h-16 relative my-auto">
              <Image
                src={image}
                alt="장소 이미지"
                fill={true}
                className="rounded-md"
              />
            </div>

            <div className="flex flex-col flex-1 ml-3">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild className="hover:cursor-pointer">
                  <div className="font-bold flex">{name}</div>
                </DialogTrigger>
                <DetailPlaceModal
                  open={open}
                  placeId={placeId!}
                  name={name}
                  latitude={latitude}
                  longitude={longitude}
                />
              </Dialog>
              <div className="flex">
                <div className=" text-sky-600 font-bold mr-2">{types}</div>
                <div className=" text-slate-400">{formattedAddress}</div>
              </div>
              <Dialog>
                <DialogTrigger className="flex hover:underline">
                  <Image
                    src="/images/memo.png"
                    alt="메모"
                    width={23}
                    height={23}
                  />
                  <div className="text-slate-500">메모</div>
                </DialogTrigger>
                {memo && <MemoModal memo={memo} onSubmitMemo={onSubmitMemo} />}
              </Dialog>
            </div>
            <div className="float-right">x</div>
          </div>
          {time && (
            <div className="flex items-center justify-center h-10 relatvie">
              <div className="border h-10 w-px absolute left-1/2 border-dashed" />
              <div className="z-10 bg-white text-xs text-zinc-500 hover:cursor-pointer">
                {time}분
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
