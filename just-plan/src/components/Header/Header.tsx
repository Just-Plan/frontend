"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const onClickHome = () => {
    router.replace("/home");
  };
  const onClicCreatePlan = () => {
    router.replace("/add-plan");
  };
  const onClickMBTI = () => {
    router.replace("/mbti-test");
  };
  const onClickMypage = () => {
    router.replace("/mypage");
  };
  return (
    <div className="justify-between	pl-6 pr-6 size-full h-16 flex items-center shadow-lg">
      <div className="w-48 h-full flex items-center" onClick={onClickHome}>
        <Image src="/logo.png" width={193} height={37} alt="logo" />
      </div>
      <div className="flex w-80 justify-between font-bold">
        <div className="hover:cursor-pointer" onClick={onClicCreatePlan}>
          Create Plan
        </div>
        <div className="hover:cursor-pointer" onClick={onClickMBTI}>
          MBTI Test
        </div>
        <div className="hover:cursor-pointer" onClick={onClickMypage}>
          최민우
        </div>
      </div>
    </div>
  );
};

export default Header;
