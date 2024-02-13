"use client";

import {
  initialUserInfo,
  localStorageUserInfoAtom,
  logout,
} from "@/store/auth.atom";
import { useAtom, useAtomValue } from "jotai";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useAtom(localStorageUserInfoAtom);
  const onMoveToOtherPage = (path: string) => {
    router.push(path);
  };
  const onLogout = () => {
    setUserInfo(initialUserInfo);
  };
  return (
    <div className="justify-between	px-8 size-full h-14 flex items-center shadow-lg">
      <div
        className="w-32 h-full flex items-center cursor-pointer"
        onClick={() => onMoveToOtherPage("/")}
      >
        <Image src="/images/logo.png" width={193} height={37} alt="logo" />
      </div>
      <div className="flex justify-between gap-4 font-bold">
        {userInfo.isLoggedIn && (
          <div
            className="hover:cursor-pointer"
            onClick={() => onMoveToOtherPage("/add-plan")}
          >
            Create Plan
          </div>
        )}
        <div
          className="hover:cursor-pointer"
          onClick={() => onMoveToOtherPage("/mbti-test")}
        >
          MBTI Test
        </div>
        {userInfo.isLoggedIn ? (
          <div className="flex">
            <div onClick={onLogout}>logout</div>
            <div
              className="hover:cursor-pointer"
              onClick={() => onMoveToOtherPage("/mypage/myPlanList")}
            >
              최민우
            </div>
          </div>
        ) : (
          <div
            className="hover:cursor-pointer"
            onClick={() => onMoveToOtherPage("/signin")}
          >
            Login
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
