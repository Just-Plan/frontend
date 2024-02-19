"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { localStorageUserInfoAtom } from "@/store/auth.atom";
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
      <Avatar className="w-full h-full max-h-72 max-w-72 shadow-lg">
        <AvatarImage src={userInfo.profile!} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex justify-center flex-col items-center ">
        <div className="text-2xl font-bold text-gray-700">
          {userInfoData?.name}
        </div>
        <div className="font-extralight text-sm text-gray-600">
          {userInfoData?.email}
        </div>
      </div>
      <p className="text-center text-gray-500">
        {userInfoData?.introduction ||
          "아직 소개글이 없습니다. 소개글을 입력해보세요!"}
      </p>
      <div className="flex justify-center flex-col items-center ">
        <div className="text-lg font-bold text-gray-600">총 게시글 수</div>
        <div className="text-gray-500">{userInfo?.totalUserPlan}</div>
      </div>
      <div className="flex justify-center flex-col items-center ">
        <div className="text-lg font-bold text-gray-600">총 스크랩 수</div>
        <div className="text-gray-500">{userInfo?.totalScrap}</div>
      </div>
    </div>
  );
};

export default LeftSide;
