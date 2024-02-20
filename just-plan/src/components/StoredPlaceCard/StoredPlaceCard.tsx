"use client";
import Image from "next/image";
import { Dialog, DialogTrigger } from "../dialog";
import DetailPlaceModal from "@/app/(needLogin)/_components/DetailPlaceModal/DetailPlaceModal";
import type { IProps } from "./StoredPlaceCard.types";
import { Button } from "../Button";
import { useState } from "react";
import ESFP from "@/../public/images/ESFP.png";
import { cutStirng } from "@/utils/cutString";

export const StoredPlaceCard = ({ item, onClickAdd }: IProps) => {
  const {
    placeId,
    name,
    formattedAddress,
    types,
    latitude,
    longitude,
    photoReference,
  } = item;
  const image = photoReference || ESFP;
  const [open, setOpen] = useState(false);

  return (
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
                <div className=" text-slate-400" title={formattedAddress}>
                  {cutStirng(formattedAddress)}
                </div>
              </div>
              <div className="flex justify-end w-full">
                <Button
                  variant={"outline"}
                  className="h-7"
                  onClick={(e) => onClickAdd(e, item)}
                >
                  장소 추가
                </Button>
              </div>
            </div>
            <div className="float-right">x</div>
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
  );
};
