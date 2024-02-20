import type { IPlace } from "@/types/place.types";
import Image from "next/image";
import React from "react";
import ESFP from "@/../public/images/ESFP.png";

interface IProps {
  place: IPlace;
  isNew?: boolean;
}
export const StoredPlaceMiniCard = ({ place, isNew }: IProps) => {
  const { photoReference, name } = place;
  const finalPhotoReference = photoReference || ESFP;

  return (
    <div className="flex justify-center items-center flex-col relative">
      <div className="w-14 h-14 relative">
        <Image
          src={finalPhotoReference}
          alt="사진"
          fill
          className="rounded-lg"
          unoptimized={true}
        />
      </div>
      <div className="font-semibold text-xs">{name}</div>
      {isNew && (
        <div className=" absolute -top-2 -right-2 z-10 text-red-700 text-lg bg-gray-200 rounded-full p-1 flex text-center justify-center items-center hover:cursor-pointer">
          new
        </div>
      )}
    </div>
  );
};
