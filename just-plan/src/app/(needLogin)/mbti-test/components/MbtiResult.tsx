import React from "react";
import type { MbtiResultProps } from "./MbtiSelect.type";
import Image from "next/image";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

const MbtiResult: React.FC<MbtiResultProps> = ({ mbti, reset }) => {
  const mbtiUpperCase = mbti ? mbti.toUpperCase() : "";
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2 justify-center items-center pb-4">
      {mbtiUpperCase} 입니다!
      <Image
        className="rounded-xl"
        src={`/images/${mbtiUpperCase}.png`}
        alt={""}
        width={300}
        height={300}
      />
      <div className="flex gap-4">
        <Button onClick={() => router.push("/")}>홈으로</Button>{" "}
        <Button onClick={reset}>다시 검사하기</Button>
      </div>
    </div>
  );
};

export default MbtiResult;
