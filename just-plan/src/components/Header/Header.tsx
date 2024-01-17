"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const onMoveToOtherPage = (path: string) => {
    router.push(path);
  };
  return (
    <div className="justify-between	px-8 size-full h-14 flex items-center shadow-lg">
      <div
        className="w-32 h-full flex items-center"
        onClick={() => onMoveToOtherPage("/home")}
      >
        <Image src="/logo.png" width={193} height={37} alt="logo" />
      </div>
      <div className="flex w-80 justify-between font-bold">
        <div
          className="hover:cursor-pointer"
          onClick={() => onMoveToOtherPage("/add-plan")}
        >
          Create Plan
        </div>
        <div
          className="hover:cursor-pointer"
          onClick={() => onMoveToOtherPage("/mbti-test")}
        >
          MBTI Test
        </div>
        <div
          className="hover:cursor-pointer"
          onClick={() => onMoveToOtherPage("/mypage")}
        >
          최민우
        </div>
      </div>
    </div>
  );
};

export default Header;
