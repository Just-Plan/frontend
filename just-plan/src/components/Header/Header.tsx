"use client";

import BeforeCreatePlanModal from "@/app/(needLogin)/_components/BeforeCreatePlanModal/BeforeCreatePlanModal";
import { localStorageUserInfoAtom, useLogout } from "@/store/auth.atom";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Header = () => {
  const logout = useLogout();
  const router = useRouter();
  const userInfo = useAtomValue(localStorageUserInfoAtom);

  const onMoveToOtherPage = (path: string) => {
    router.push(path);
  };

  // 만약 내 mbti 정보가 없다면 경고 후 mbti-test로 이동
  const onMoveToAddPlan = () => {
    if (userInfo.mbtiName !== "") {
      router.push("/add-plan");
    }
  };

  const onLogout = () => {
    logout();
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
          <Dialog>
            <DialogTrigger
              className="hover:cursor-pointer hover:text-gray-500"
              onClick={onMoveToAddPlan}
            >
              Create Plan
            </DialogTrigger>
            {userInfo.mbtiName === "" ? <BeforeCreatePlanModal /> : ""}
          </Dialog>
        )}
        <div
          className="hover:cursor-pointer hover:text-gray-500"
          onClick={() => onMoveToOtherPage("/mbti-test")}
        >
          MBTI Test
        </div>
        {userInfo.isLoggedIn ? (
          <>
            <div
              className="hover:cursor-pointer hover:text-gray-500"
              onClick={onLogout}
            >
              logout
            </div>
            <div
              className="hover:cursor-pointer flex justify-center items-center gap-2 ml-2 hover:text-gray-500"
              onClick={() => onMoveToOtherPage("/mypage/myPlanList?page=1")}
            >
              <Avatar>
                <AvatarImage
                  src={
                    userInfo.profile
                      ? userInfo.profile
                      : "/images/mbti_title_image.png"
                  }
                  className="rounded-full w-10 h-10 border p-0.5 border-gray-600 "
                />
                <AvatarFallback>프로필</AvatarFallback>
              </Avatar>
              {userInfo.name}
            </div>
          </>
        ) : (
          <div
            className="hover:cursor-pointer hover:text-gray-500"
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
