"use client";
import Image from "next/image";
import { Dialog, DialogTrigger } from "../dialog";
import MemoModal from "@/app/(needLogin)/_components/MemoModal/MemoModal";
import DetailPlaceModal from "@/app/(needLogin)/_components/DetailPlaceModal/DetailPlaceModal";
import type {
  DraggableProvided,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import type { IMemo, IPlace } from "@/types/place.types";
import { useAtomValue } from "jotai";
import { addedPlace } from "@/store";
import { useState } from "react";
import ESFP from "@/../public/images/ESFP.png";

export interface IProps {
  item: IPlace;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

export const AddedPlaceCardDnD = ({
  item,
  provided,
  snapshot,
  time,
}: IProps & { time: number }) => {
  const [open, setOpen] = useState(false);
  // const [added, setAdded] = useAtom(addedPlace); // 이거 수정 필요
  const added = useAtomValue(addedPlace);
  const {
    // googlePlaceId,
    placeId,
    name,
    formattedAddress,
    types,
    latitude,
    memo,
    longitude,
    photoReference,
  } = item;

  const image = photoReference || ESFP;

  const day = "1";

  // memo 바꾸기
  const onSubmitMemo = (editMemo: IMemo) => {
    // 와 이거 어떻게 바꾸지???
    console.log("editMemo:", editMemo);
    console.log("added[1]", added[day]);
    const temp = added[day].map((item) => {
      item.name === name ? { ...item, memo: editMemo } : item.memo;
    });
    console.log("added[1] edit", temp);

    // 이거 수정 필요
    // setAdded({
    //   ...added,
    //   "1": temp,
    // });
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div>
        <div
          className={cn(
            "hover:cursor-pointer",
            snapshot.isDragging
              ? "bg-opacity-90 shadow-2xl shadow-gray-400"
              : "",
          )}
        >
          <div className="flex relative flex-col w-full hover:cursor-pointer">
            <div className="border w-[280px] sm:w-80 rounded-xl flex p-3 z-10 bg-white">
              <div className="w-16 h-16 relative my-auto">
                <Image
                  src={image}
                  alt="장소 이미지"
                  fill={true}
                  className="rounded-md"
                  unoptimized={true}
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
                  {memo && (
                    <MemoModal memo={memo} onSubmitMemo={onSubmitMemo} />
                  )}
                </Dialog>
              </div>
              <div className="float-right">x</div>
            </div>
            {time && !snapshot.isDragging && (
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
    </div>
  );
};
