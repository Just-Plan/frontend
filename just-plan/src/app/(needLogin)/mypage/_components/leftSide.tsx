"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { localStorageUserInfoAtom } from "@/store/auth.atom";
import { Label } from "@radix-ui/react-label";
import { useAtomValue } from "jotai";

const LeftSide = () => {
  const userInfo = useAtomValue(localStorageUserInfoAtom);

  return (
    <div className="flex flex-col justify-center items-center px-5 gap-5">
      <Avatar className="w-full h-full max-h-72 max-w-72">
        <AvatarImage src={userInfo.profile!} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex justify-center flex-col items-center ">
        <p>{userInfo.name}</p>
        <p className="font-extralight text-sm">{userInfo.email}</p>
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
