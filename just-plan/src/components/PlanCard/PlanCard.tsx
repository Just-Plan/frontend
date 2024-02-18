"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../Card";
import type { Props } from "./PlanCard.types";
import { useRouter } from "next/navigation";
import bookMark from "@/../public/svg/bookMark.svg";
import selectBookMark from "@/../public/svg/selectBookMark.svg";
import { usePostPlanScrap } from "@/hooks/usePostPlanScrap";
import { useAtomValue } from "jotai";
import { localStorageUserInfoAtom } from "@/store/auth.atom";
import ESFP from "@/../public/images/ESFP.png";

const PlanCard = ({ item }: Props) => {
  const {
    budget,
    days,
    nights,
    planId,
    region,
    photoUrl,
    scrapCount,
    scrapped,
    tags,
    title,
    users,
  } = item;
  const [isSelected, setIsSelected] = useState<boolean>(scrapped as boolean);
  const [scrapCountValue, setScrapCountValue] = useState(scrapCount);
  const owner = users.find((user) => user.owner === true)!;
  const userInfo = useAtomValue(localStorageUserInfoAtom);

  const image = photoUrl || ESFP;
  // const image = "/images/image1.png"; // 임시

  // 주인을 찾자
  const profile = owner.profileUrl || ESFP;

  const router = useRouter();
  const handleToDetail = () => {
    console.log("리다이렉트!!!");
    router.push(`/detail-plan?planId=${planId}&day=`);
  };

  const { mutate } = usePostPlanScrap();

  const onClickBookMark = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) => {
    e.stopPropagation();
    // 로그인 되어있는지 확인
    if (userInfo.email === "") {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    // 스크랩 요청 보내기
    const body = {
      planId: planId,
      scrap: !isSelected,
    };

    let updatedScrapCount = isSelected
      ? scrapCountValue - 1
      : scrapCountValue + 1;
    let updatedSelected = !isSelected;
    mutate(body, {
      onError: () => {
        updatedScrapCount = isSelected
          ? scrapCountValue + 1
          : scrapCountValue - 1;
        updatedSelected = !isSelected;
      },
    });
    setIsSelected(updatedSelected);

    setScrapCountValue(updatedScrapCount);
  };
  return (
    <Card className="w-[384px]" onClick={handleToDetail}>
      <CardHeader className="p-0">
        <div className="w-96 h-60 relative">
          <Image
            src={image}
            fill
            className="object-cover"
            alt="장소 이미지"
            unoptimized={true}
          />
        </div>
      </CardHeader>
      <CardContent className="bg-white p-0">
        <div className="flex justify-between p-3 items-center w-96">
          <div className="bg-red-300 w-16 h-16 rounded-full relative flex">
            <Image
              className="rounded-full"
              src={profile}
              fill={true}
              alt="프로필"
              unoptimized={true}
            />
          </div>
          <div className="w-60">
            <div className="text-base flex">
              <b>{owner?.name}님</b>의 {title}
            </div>
            <div className="flex justify-between">
              <div className="text-sm">
                {days}박 {nights}일
              </div>
              <div className="text-sm">{budget.card + budget.cash} 원</div>
            </div>
          </div>
          <div
            className="hover:bg-gray-300 w-10 h-10 rounded-full flex flex-col justify-center items-center"
            onClick={(e) => onClickBookMark(e)}
          >
            {!isSelected ? (
              <Image src={bookMark} alt="북마크" width={25} height={25} />
            ) : (
              <Image src={selectBookMark} alt="북마크" width={25} height={25} />
            )}

            <div className="text-xs">{scrapCountValue}</div>
          </div>
        </div>
        <div className=" flex justify-between p-3">
          <div className="ml-3 font-bold text-stone-700">
            {owner?.mbti.type}
          </div>
          <div className="text-sky-600 font-bold flex">
            {tags?.map((tag) => <div key={tag}>{tag} </div>)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanCard;
