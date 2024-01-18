"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@radix-ui/react-label";

const LeftSide = () => {
  return (
    <div className="flex flex-col justify-center items-center px-5 gap-5">
      <Avatar className="w-full h-full ">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex justify-center flex-col items-center ">
        <p>강윤지</p>
        <p className="font-extralight text-sm">cmw0918@naver.com</p>
      </div>
      <p className="text-center">INFP 윤지의 여행 일정 기록장임뮈당</p>
      <div className="flex justify-center flex-col items-center ">
        <Label>총 게시글 수</Label>
        <p>14</p>
      </div>
      <div className="flex justify-center flex-col items-center ">
        <Label>총 스크랩 수</Label>
        <p>52</p>
      </div>
    </div>
  );
};

export default LeftSide;
