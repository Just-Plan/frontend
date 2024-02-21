import type { IPlace } from "@/types/place.types";
import Image from "next/image";
import React from "react";
import ESFP from "@/../public/images/ESFP.png";
import { useAtom } from "jotai";
import { addStorePlaceAtom } from "@/store";

interface IProps {
  place: IPlace;
  isNew?: boolean;
}
export const StoredPlaceMiniCard = ({ place, isNew }: IProps) => {
  const { photoReference, name } = place;
  const finalPhotoReference = photoReference || ESFP;
  const [addStorePlace, setAddStorePlace] = useAtom(addStorePlaceAtom);

  const onDelete = () => {
    // 이걸 addStorePlace여기에서 삭제
    const newStore = addStorePlace.filter((item) => item.name !== place.name);
    setAddStorePlace(newStore);
  };

  return (
    <div className="flex justify-center items-center flex-col relative">
      <div className="w-14 h-14 relative ">
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
        <div className="absolute -top-1 z-10 flex gap-5">
          <div className="left-0 text-red-700 text-lg bg-white border rounded-md p-0 px-1 flex text-center text-xs justify-center items-center hover:cursor-pointer">
            new
          </div>
          <div
            className="bg-gray-200 rounded-full w-5 h-5 flex justify-center items-center"
            onClick={onDelete}
          >
            x
          </div>
        </div>
      )}
    </div>
  );
};
