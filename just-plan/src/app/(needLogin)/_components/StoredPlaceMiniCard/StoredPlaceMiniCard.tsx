import Image from "next/image";
import React from "react";

export const StoredPlaceMiniCard = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="w-16 h-16 relative">
        <Image
          src="/images/image1.png"
          alt="사진"
          fill
          className="rounded-lg"
        />
      </div>
      <div className="font-semibold">성산 일출봉</div>
    </div>
  );
};
