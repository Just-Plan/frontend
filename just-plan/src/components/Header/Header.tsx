"use client";

import { localStorageUserInfoAtom, useLogout } from "@/store/auth.atom";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useAtom } from "jotai";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Header = () => {
  const logout = useLogout();

  const router = useRouter();
  const [userInfo, setUserInfo] = useAtom(localStorageUserInfoAtom);
  console.log(userInfo);
  const onMoveToOtherPage = (path: string) => {
    router.push(path);
  };
  const onLogout = () => {
    console.log(userInfo);
    logout();
    console.log(userInfo);
  };
  return (
    <div className="justify-between	px-8 size-full h-14 flex items-center shadow-lg">
      <div
        className="w-32 h-full flex items-center cursor-pointer"
        onClick={() => onMoveToOtherPage("/")}
      >
        <Image src="/images/logo.png" width={193} height={37} alt="logo" />
      </div>
      <div className="flex justify-between gap-4 font-bold items-center">
        {userInfo.isLoggedIn && (
          <div
            className="hover:cursor-pointer "
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
          <>
            <div onClick={onLogout}>logout</div>
            <div className="flex">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  className="rounded-full w-10 h-10"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div
              className="hover:cursor-pointer"
              onClick={() => onMoveToOtherPage("/mypage/myPlanList")}
            >
              {userInfo.name}
            </div>
          </>
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
