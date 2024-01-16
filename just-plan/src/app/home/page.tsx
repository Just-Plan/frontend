"use client";

// import { ScrollArea } from "@/components/ScrollArea/ScrollArea";
import Image from "next/image";
import React from "react";
// import SearchIcon from "../../../public/icons/search.svg";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlanCard from "@/components/PlanCard/PlanCard";

// import { ReactComponent as Reservation } from "../../../public/icons/search.svg";
const page = () => {
  const tags = [
    { id: 1, name: "제주", country: "대한민국" },
    { id: 2, name: "제주", country: "대한민국" },
    { id: 3, name: "제주", country: "대한민국" },
    { id: 4, name: "제주", country: "대한민국" },
    { id: 5, name: "제주", country: "대한민국" },
    { id: 6, name: "제주", country: "대한민국" },
    { id: 7, name: "제주", country: "대한민국" },
    { id: 8, name: "제주", country: "대한민국" },
    { id: 9, name: "제주", country: "대한민국" },
    { id: 10, name: "제주", country: "대한민국" },
  ];

  return (
    <div className="px-60 py-32">
      <div className="flex justify-around">
        <div className="h-96">
          <div className="h-5/6 w-96 relative">
            <Image
              src="/mascot1.png"
              fill={true}
              alt="마스코트1"
              className="object-contain"
            />
          </div>
          <div className="h-1/6 w-96 bg-red relative">
            <Image
              src="/logo.png"
              fill={true}
              className="object-contain"
              alt="로고"
            />
          </div>
        </div>
        <div className="">
          <div className="text-sky-700 font-bold text-3xl mt-5 text-center">
            나의 여행 플랜 찾기
          </div>
          <div className="bg-white w-fill h-10 rounded-3xl flex justify-between pl-5 pr-5 mt-5 border w-96">
            <input
              className="outline-none bg-transparent"
              placeholder="어디로 떠나고 싶으신가요?"
            />
            <svg width={20} viewBox="0 0 24 24" aria-hidden="true" fill="gray">
              <g>
                <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
              </g>
            </svg>
          </div>
          <ScrollArea className="w-fill h-48 rounded-md border mt-10 bg-white">
            <div className="py-4 px-8">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex justify-between p-1 items-end"
                >
                  <div className="font-bold text-neutral-600 text-2xl">
                    {tag.name}
                  </div>
                  <div className="text-neutral-400">{tag.country}</div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className=" text-center mt-20">
        <button className="bg-white text-cyan-600 border-cyan-600 border-4 rounded-2xl w-80 h-14">
          내 일정 작성하러 가기!
        </button>
        <div className="text-3xl font-bold mt-12">인기 여행 플랜</div>
        <div className="text-xl text-zinc-600 mt-2">
          인기 여행 플랜을 확인해보세요!
        </div>
        <div className="grid grid-cols-3 place-items-center mt-5">
          <PlanCard />
          <PlanCard />
          <PlanCard />
        </div>
        <div className="text-3xl font-bold mt-12">MBTI맞춤 여행 플랜</div>
        <div className="text-xl text-zinc-600 mt-2">
          ENFP, INFJ에 대한 검색 결과입니다.
        </div>
        <div className="grid grid-cols-3 place-items-center mt-5 gap-y-16">
          <PlanCard />
          <PlanCard />
          <PlanCard />
          <PlanCard />
          <PlanCard />
          <PlanCard />
          <PlanCard />
          <PlanCard />
        </div>
      </div>
    </div>
  );
};

export default page;
