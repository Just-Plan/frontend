"use client";
import Image from "next/image";
import { Dialog, DialogTrigger } from "../dialog";
import DetailPlaceModal from "@/app/(needLogin)/_components/DetailPlaceModal/DetailPlaceModal";
import { Button } from "../Button";
import { cn } from "@/lib/utils";
import type { IDnDProps } from "./StoredPlaceCard.types";
import { useState } from "react";
import ESFP from "@/../public/images/ESFP.png";

export const StoredPlaceCardDnD = ({
  item,
  provided,
  snapshot,
  onDeletePlace,
}: IDnDProps) => {
  const {
    placeId,
    name,
    formattedAddress,
    types,
    latitude,
    longitude,
    // photoReference,
  } = item;

  const [open, setOpen] = useState(false);
  const image = photoReference || ESFP;
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={cn(
        snapshot.isDragging ? "bg-opacity-90 shadow-2xl shadow-gray-400" : "",
      )}
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="hover:cursor-pointer">
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
                <div className="font-bold flex">{name}</div>
                <div className="flex">
                  <div className=" text-sky-600 font-bold mr-2">{types}</div>
                  <div className=" text-slate-400">{formattedAddress}</div>
                </div>
                <div className="flex justify-end w-full">
                  <Button variant={"outline"} className="h-7">
                    장소 추가
                  </Button>
                </div>
              </div>
              <div
                className="float-right bg-gray-200 rounded-full w-5 h-5 flex justify-center items-center hover:cursor-pointer"
                onClick={(e) => onDeletePlace(e, placeId!)}
              >
                x
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DetailPlaceModal
          open={open}
          placeId={placeId!}
          name={name}
          latitude={latitude}
          longitude={longitude}
        />
      </Dialog>
    </div>
  );
};
