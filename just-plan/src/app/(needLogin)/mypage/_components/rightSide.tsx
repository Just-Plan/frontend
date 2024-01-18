"use client";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MyPlanList from "./myPlanList";
import MyScrapPlanList from "./myScrapPlanList";
import MyAccountBook from "./myAccountBook";
import EditMemberInfo from "./editMemberInfo";

const RightSide = () => {
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    { name: "나의 여행 일정", content: <MyPlanList /> },
    { name: "스크럼 여행 일정", content: <MyScrapPlanList /> },
    { name: "가계부", content: <MyAccountBook /> },
    { name: "회원 정보 수정", content: <EditMemberInfo /> },
  ];
  const selectMenuHandler = (index: any) => {
    clickTab(index);
  };
  return (
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
  );
};

export default RightSide;
