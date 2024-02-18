import React from "react";
import type { MbtiResultProps } from "./MbtiSelect.type";
import Image from "next/image";

const MbtiResult: React.FC<MbtiResultProps> = ({ mbti }) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center pb-4">
      {mbti}
      <Image
        className="rounded-xl"
        src={`/images/${mbti}.png`}
        alt={""}
        width={300}
        height={300}
      />
    </div>
  );
};

export default MbtiResult;
