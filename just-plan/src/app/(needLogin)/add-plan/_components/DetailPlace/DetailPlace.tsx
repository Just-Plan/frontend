"use client";

import { Button } from "@/components/ui/Button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import Comments from "../Comments/Comments";

const DetailPlace = () => {
  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle className="mb-3">
          <div className="text-blue-500 text-sm">이동수단</div>
          <div className="font-bold text-3xl">제주 국제 공항</div>
          <div className="text-gray-400 text-sm font-normal">
            Jeju Inernational Airport
          </div>
        </DialogTitle>
        <DialogDescription className="flex justify-between gap-6">
          <div className="flex flex-1 flex-col">
            <Image
              src="/images/image1.png"
              alt="장소 이미지"
              width={400}
              height={300}
              className="rounded-2xl"
            />
            <div className="bg-ourGreen p-1 rounded-e-xl my-5 text-xs font-bold">
              ENFP,INTP,ESTP,ISFJ,ENTJ가 가장 많이 스크랩한 장소입니다.
            </div>
            <div className="flex">
              <div className="text-blue-500 font-bold">영업중</div>
              <div className="font-bold">07:00에 영업 종료</div>
            </div>
            <div className="flex">
              <div className="text-blue-500 font-bold">영업시간 안내</div>
              <div className="font-bold gap-1 flex flex-col">
                <div>일요일 00:00~24:00</div>
                <div>월요일 00:00~24:00</div>
                <div>화요일 00:00~24:00</div>
                <div>수요일 00:00~24:00</div>
                <div>목요일 00:00~24:00</div>
                <div>금요일 00:00~24:00</div>
                <div>토요일 00:00~24:00</div>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col">
            <div className="flex mb-2">
              <Input
                className="rounded-md mr-2"
                placeholder="댓글을 입력하세요."
              />
              <Button variant={"ghost"} className="w-16">
                댓글 달기
              </Button>
            </div>
            <div className="gap-3 flex flex-col overflow-y-auto">
              <Comments />
              <Comments />
              <Comments />
              <Comments />
            </div>
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
};

export default DetailPlace;
