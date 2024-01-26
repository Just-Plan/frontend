"use client";
import Image from "next/image";
import { PropsWithChildren, useState } from "react";
import type { IProps } from "./AddedPlaceCard.types";
import { Dialog, DialogTrigger } from "../dialog";
import MemoModal from "@/app/(needLogin)/_components/MemoModal/MemoModal";
import DetailPlace from "@/app/(needLogin)/_components/DetailPlace/DetailPlace";

export const AddedPlaceCard = ({ item }: IProps) => {
  const { id, date, image, title, category, address, time } = item;

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
              <div className="font-bold flex">{title}</div>
              <div className="flex">
                <div className=" text-sky-600 font-bold mr-2">{category}</div>
                <div className=" text-slate-400">{address}</div>
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
          {time && (
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
  );
};
