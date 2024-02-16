"use client";
import Image from "next/image";
import { AspectRatio } from "@/components/AspectRatio";
import { useState } from "react";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import MyPlanList from "./_components/myPlanList";
import MyScrapPlanList from "./_components/myScrapPlanList";
import MyAccountBook from "./_components/myAccountBook";
import EditMemberInfo from "./_components/editMemberInfo";

const menuArr = [
  { name: "나의 여행 일정", content: <MyPlanList /> },
  { name: "스크럼 여행 일정", content: <MyScrapPlanList /> },
  { name: "가계부", content: <MyAccountBook /> },
  { name: "회원 정보 수정", content: <EditMemberInfo /> },
];
const MyPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [url, seturl] = useState("");

  const selectMenuHandler = (index: any) => {
    setCurrentTab(index);
  };
  return (
    <div className="md:w-4/5">
      <div className="flex flex-col bg-white gap-5">
        <AspectRatio ratio={16 / 3} className="max-h-80">
          <Image
            src="/images/test.jpg"
            alt="Image"
            fill
            className="rounded-2xl object-cover"
          />
        </AspectRatio>

        <div className="flex w-full justify-between">
          {menuArr.map((el, index) => (
            <Button
              className={cn(
                "rounded-3xl py-8 md:w-32 w-24",
                index === currentTab ? "bg-ourGreen hover:bg-ourGreen" : ""
              )}
              onClick={() => selectMenuHandler(index)}
              key={index}
              size={"lg"}
              variant={"secondary"}
            >
              {el.name}
            </Button>
          ))}
        </div>

        <div className="pt-5">
          {menuArr[currentTab] && <div>{menuArr[currentTab].content}</div>}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
