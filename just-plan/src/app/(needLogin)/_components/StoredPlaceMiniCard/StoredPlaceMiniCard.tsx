import { ILocationInfo } from "@/types/plan.types";
import Image from "next/image";
import React from "react";

export const StoredPlaceMiniCard = ({ place }: { place: ILocationInfo }) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="w-14 h-14 relative">
        <Image src={place.image} alt="사진" fill className="rounded-lg" />
      </div>
      <div className="font-semibold text-xs">{place.title}</div>
    </div>
  );
};
