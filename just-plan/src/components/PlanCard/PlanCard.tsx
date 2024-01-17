import Image from "next/image";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/Card";

const PlanCard = () => {
  return (
    <Card className="w-full sm:w-96">
      <CardHeader className="p-0">
        <Image
          src="/images/image1.png"
          width={384}
          height={240}
          className="object-contain"
          alt="이미지"
        />
      </CardHeader>
      <CardContent className="bg-white p-0">
        <div className="flex justify-between p-3 items-center">
          <div className="bg-red-300 w-16 h-16 rounded-full relative flex">
            <Image
              className="rounded-full"
              src="/image1.png"
              fill={true}
              alt="이미지"
            />
          </div>
          <div className=" w-60">
            <div className="text-base flex">
              <b>강윤지님</b>의 오사카 뿌수기
            </div>
            <div className="flex justify-between">
              <div className="text-sm">4박 5일</div>
              <div className="text-sm">1,000,000 원</div>
            </div>
          </div>
          <div className="hover:bg-gray-300 w-10 h-10 rounded-full flex flex-col justify-center items-center">
            <svg
              width="25"
              height="25"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 2.5C3 2.22386 3.22386 2 3.5 2H11.5C11.7761 2 12 2.22386 12 2.5V13.5C12 13.6818 11.9014 13.8492 11.7424 13.9373C11.5834 14.0254 11.3891 14.0203 11.235 13.924L7.5 11.5896L3.765 13.924C3.61087 14.0203 3.41659 14.0254 3.25762 13.9373C3.09864 13.8492 3 13.6818 3 13.5V2.5ZM4 3V12.5979L6.97 10.7416C7.29427 10.539 7.70573 10.539 8.03 10.7416L11 12.5979V3H4Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>{" "}
            <div className="text-xs">137</div>
          </div>
        </div>
        <div className=" flex justify-between p-3">
          <div className="ml-3 font-bold text-stone-700">INFJ</div>
          <div className="text-sky-600 font-bold">#감성 #먹부림</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanCard;
