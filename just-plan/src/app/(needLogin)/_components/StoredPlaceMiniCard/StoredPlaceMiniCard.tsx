import type { IPlace } from "@/types/place.types";
import Image from "next/image";
import React from "react";

interface IProps {
  place: IPlace;
  onDeletePlace: (place: IPlace) => void;
}
export const StoredPlaceMiniCard = ({ place, onDeletePlace }: IProps) => {
  const { photoReference = "/images/image1.png", name } = place;
  const image = "/images/image1.png"; // 임시

  const isNew = true;
  // 새로 추가한건지 확인 후 표시

  return (
    <div className="flex justify-center items-center flex-col relative">
      <div className="w-14 h-14 relative">
        <Image src={image} alt="사진" fill className="rounded-lg" />
      </div>
      <div className="font-semibold text-xs">{name}</div>
      {isNew && (
        <div
          className=" absolute -top-2 -right-2 z-10 text-red-700 text-lg bg-gray-200 rounded-full p-1 flex text-center justify-center items-center hover:cursor-pointer"
          onClick={() => onDeletePlace(place)}
        >
          new
        </div>
      )}
    </div>
  );
};
