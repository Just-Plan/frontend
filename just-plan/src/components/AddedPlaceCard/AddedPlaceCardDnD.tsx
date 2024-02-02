"use client";
import Image from "next/image";
import { Dialog, DialogTrigger } from "../dialog";
import MemoModal from "@/app/(needLogin)/_components/MemoModal/MemoModal";
import DetailPlace from "@/app/(needLogin)/_components/DetailPlace/DetailPlace";
import { DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { IPlace } from "@/types/place.types";

export interface IProps {
  item: IPlace;
  provided: DraggableProvided,
  snapshot: DraggableStateSnapshot
}
export const AddedPlaceCardDnD = ({ item, provided, snapshot }: IProps) => {
  const {googlePlaceId, name, formattedAddress, types, latitude, longitude, photoReference} = item;

  const time = 120;
  const image = '/images/image1.png'; // 임시

  return (
    <div
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
  >
    <Dialog>
      <DialogTrigger asChild className={cn("hover:cursor-pointer", snapshot.isDragging
        ? "bg-opacity-90 shadow-2xl shadow-gray-400"
        : "")}>
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
              <div className="font-bold flex">{name}</div>
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
                <MemoModal />
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
      </DialogTrigger>
      <DetailPlace />
    </Dialog>
    </div>
  );
};
