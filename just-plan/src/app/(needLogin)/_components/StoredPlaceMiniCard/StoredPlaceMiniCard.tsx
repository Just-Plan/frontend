import type { IPlace } from "@/types/place.types";
import Image from "next/image";
import React from "react";

export const StoredPlaceMiniCard = ({ place }: { place: IPlace }) => {
  const { photoReference = "/images/image1.png", name } = place;
  const image = "/images/image1.png"; // 임시
  console.log(photoReference);
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="w-14 h-14 relative">
        <Image src={image} alt="사진" fill className="rounded-lg" />
      </div>
      <div className="font-semibold text-xs">{name}</div>
    </div>
  );
};
