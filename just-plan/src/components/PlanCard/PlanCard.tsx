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
import { Separator } from "@/components/ui/separator";
import dot from "@/../public/svg/dot.svg";

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

  const calc = (name: string, title: string) => {
    // 몇글자 초과하면 ... 보여주기
    const sumStr = `${owner?.name}님의 ${title}`;
    if (sumStr.length > 16) {
      const cutTitle = sumStr.slice(name.length + 2, 16) + "...";
      return { name, title: cutTitle };
    }
    return { name, title };
  };

  const newTitle = calc(owner?.name, title);

  return (
    <Card className="" onClick={handleToDetail}>
      <CardHeader className="p-0">
        <div className="w-64 h-44 relative">
          <Image
            src={image}
            fill
            className="object-cover"
            alt="장소 이미지"
            unoptimized={true}
          />
        </div>
      </CardHeader>
      <Separator className="" />

      <CardContent className="bg-white p-0">
        <div className="flex justify-between p-2 items-center w-64">
          <div className="flex w-8 h-8">
            <Image
              className="rounded-full border"
              src={profile}
              width={45}
              height={45}
              alt="프로필"
              unoptimized={true}
            />
          </div>
          <div className="p-1 w-40">
            <div className="text-xs flex" title={`${owner?.name}님의 ${title}`}>
              <b>{newTitle.name}님</b>의 {newTitle.title}
            </div>
            <div className="flex justify-between">
              <div className="text-xs">
                {nights}박 {days}일
              </div>
              <div className="text-xs">{budget.card + budget.cash} 원</div>
            </div>
          </div>
          <div
            className="hover:bg-gray-300 w-9 h-9 rounded-full flex flex-col justify-center items-center"
            onClick={(e) => onClickBookMark(e)}
          >
            {!isSelected ? (
              <Image src={bookMark} alt="북마크" width={18} height={18} />
            ) : (
              <Image src={selectBookMark} alt="북마크" width={18} height={18} />
            )}
            <div className="text-xs">{scrapCountValue}</div>
          </div>
        </div>
        <Separator className="" />
        <div className=" flex justify-between p-2">
          <div className="flex flex-1 text-xs">
            <div className=" font-bold text-stone-700">{region.koreanName}</div>
            <Image src={dot} alt="점" />
            <div className="font-bold text-stone-700">{owner?.mbti.type}</div>
          </div>
          <div
            className="text-sky-600 font-bold flex text-xs items-center gap-1"
            title={tags.toString()}
          >
            {tags?.map((tag, idx) => idx <= 2 && <div key={tag}>#{tag}</div>)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanCard;
