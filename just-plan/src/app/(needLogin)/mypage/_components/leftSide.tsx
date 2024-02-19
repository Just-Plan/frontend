"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { localStorageUserInfoAtom } from "@/store/auth.atom";
import { Label } from "@radix-ui/react-label";
import { useAtom } from "jotai";
import { useEffect } from "react";

const LeftSide = () => {
  const [userInfo, setUserInfo] = useAtom(localStorageUserInfoAtom);
  // 회원 정보 조회
  const {
    data: userInfoData,
    error: userInfoError,
    isLoading: userInfoIsLoading,
  } = useGetUserInfo();

  useEffect(() => {
    if (userInfoData) {
      setUserInfo(userInfoData);
    }
  }, [userInfoData]);
  if (userInfoError) return <div>에러</div>;
  if (userInfoIsLoading) return <div>로딩중</div>;

  return (
    <div className="flex flex-col justify-center items-center px-5 gap-5">
      <Avatar className="w-full h-full max-h-72 max-w-72">
        <AvatarImage src={userInfo.profile!} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex justify-center flex-col items-center ">
        <p>{userInfoData?.name}</p>
        <p className="font-extralight text-sm">{userInfoData?.email}</p>
      </div>
      <p className="text-center">
        {userInfoData?.introduction || "소개글을 입력해보세요!"}
      </p>
      <div className="flex justify-center flex-col items-center ">
        <Label>총 게시글 수</Label>
        <p>{userInfo?.totalUserPlan}</p>
      </div>
      <div className="flex justify-center flex-col items-center ">
        <Label>총 스크랩 수</Label>
        <p>{userInfo?.totalScrap}</p>
      </div>
    </div>
  );
};

export default LeftSide;
