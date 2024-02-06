"use client";

import { loggedInAtom } from "@/store/auth.atom";
import { useAtom, useAtomValue } from "jotai";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const user = useAtomValue(loggedInAtom);
  console.log(user);
  const onMoveToOtherPage = (path: string) => {
    router.push(path);
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
        {user.isLoggedIn && (
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
        {user.isLoggedIn ? (
          <div
            className="hover:cursor-pointer"
            onClick={() => onMoveToOtherPage("/mypage")}
          >
            최민우
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
