import Image from "next/image";
import { AspectRatio } from "@/components/AspectRatio";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAtomValue } from "jotai";
import { localStorageUserInfoAtom } from "@/store/auth.atom";

const menuArr = [
  { name: "나의 여행 일정", content: "./myPlanList?page=1" },
  { name: "스크랩 여행 일정", content: "./myScrapPlanList?page=1" },
  { name: "가계부", content: "./myAccountBook" },
  { name: "회원 정보 수정", content: "./editMemberInfo" },
];

const MypageHeader = ({ choose }: { choose: string }) => {
  const userInfo = useAtomValue(localStorageUserInfoAtom);
  return (
    <div className="flex flex-col bg-white gap-5 mb-5 mx-5">
      <AspectRatio ratio={16 / 3} className="max-h-80">
        <Image
          src={userInfo.background!}
          alt="Image"
          fill
          className="rounded-2xl object-cover"
          unoptimized={true}
        />
      </AspectRatio>

      <div className="flex w-full justify-between relative mb-2">
        {menuArr.map((el) => (
          <Link
            key={el.name}
            href={el.content}
            className={cn(
              "rounded-3xl py-8 md:w-40 w-20 bg-gray-100 hover:bg-ourGreen m-auto flex items-center justify-center shadow-inner text-gray-600 font-semibold hover:translate-y-1 text-xs md:text-lg",
              el.name === choose ? "bg-ourGreen" : "",
            )}
          >
            {el.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MypageHeader;
