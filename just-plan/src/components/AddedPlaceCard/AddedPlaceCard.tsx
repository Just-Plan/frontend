import Image from "next/image";
import { PropsWithChildren } from "react";
import { IProps } from "./AddedPlaceCard.types";

export const AddedPlaceCard = ({ item }: PropsWithChildren<IProps>) => {
  const { id, date, image, title, category, address, time } = item;
  return (
    <div className="flex relative flex-col hover:cursor-pointer">
      <div className="border w-80 rounded-xl flex p-3 z-10 bg-white">
        <div className="w-16 h-16 relative my-auto">
          <Image
            src={image}
            alt="장소 이미지"
            fill={true}
            className="rounded-md"
          />
        </div>

        <div className="flex flex-col flex-1 ml-3">
          <div className="font-bold">{title}</div>
          <div className="flex">
            <div className=" text-sky-600 font-bold mr-2">{category}</div>
            <div className=" text-slate-400">{address}</div>
          </div>
          <div className="flex">
            <Image src="/memo.png" alt="메모" width={23} height={23} />
            <div className="text-slate-500">메모</div>
          </div>
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
  );
};
