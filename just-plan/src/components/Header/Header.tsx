"use client";

import BeforeCreatePlanModal from "@/app/(needLogin)/_components/BeforeCreatePlanModal/BeforeCreatePlanModal";
import { localStorageUserInfoAtom, useLogout } from "@/store/auth.atom";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
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
  const onMoveToAddPlan = () => {
    // 만약 내 mbti 정보가 없다면 경고 후 mbti-test로 이동
    console.log("내 mbti 정보:", userInfo.mbtiName);
    if (userInfo.mbtiName !== "") {
      router.push("/add-plan");
    }
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
          <Dialog>
            <DialogTrigger
              className="hover:cursor-pointer "
              onClick={onMoveToAddPlan}
            >
              Create Plan
            </DialogTrigger>
            {userInfo.mbtiName === "" ? <BeforeCreatePlanModal /> : ""}
          </Dialog>
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
