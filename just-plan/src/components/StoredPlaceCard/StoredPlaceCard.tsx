"use client";
import Image from "next/image";
import { Dialog, DialogTrigger } from "../dialog";
import DetailPlace from "@/app/(needLogin)/_components/DetailPlace/DetailPlace";
import type { IProps } from "./StoredPlaceCard.types";
import { Button } from "../Button";

export const StoredPlaceCard = ({ item, onClickAdd }: IProps) => {
  const {googlePlaceId, name, formattedAddress, types, latitude, longitude, photoReference} = item;
  const image = '/images/image1.png'; // 임시
  
  return (
    <Dialog>
      <DialogTrigger asChild className="hover:cursor-pointer">
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
              <div className="flex justify-end w-full">
                <Button variant={"outline"} className="h-7" onClickCapture={() => onClickAdd(item)} >
                  장소 추가
                </Button>
              </div>
            </div>
            <div className="float-right">x</div>
          </div>
        </div>
      </DialogTrigger>
      <DetailPlace />
    </Dialog>
  );
};
