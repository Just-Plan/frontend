"use client";

import Image from "next/image";
import PlanCard from "@/components/PlanCard/PlanCard";
import { Badge } from "@/components/Badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/Carousel";
import { useRouter } from "next/navigation";
import { HomePageConfig, MBTI } from "@/constants";
import type { IPlan2, IRegion } from "@/types/plan.types";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useGetPlanList } from "@/hooks/useGetPlanList";
import { useGetInfinitePlanList } from "@/hooks/useGetInfinitePlanList";
import { useAtomValue } from "jotai";
import { localStorageUserInfoAtom } from "@/store/auth.atom";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import BeforeCreatePlanModal from "./_components/BeforeCreatePlanModal/BeforeCreatePlanModal";
import { SearchCity } from "@/components/SearchCity/SearchCity";

const Home = () => {
  const router = useRouter();
  const [selectMBTI, setSelectMBTI] = useState<string[]>([]);
  const [region, setRegion] = useState<IRegion>({
    id: 0,
    koreanName: "",
    englishName: "",
    introduction: "",
    countryKoreanName: "",
    countryEnglishName: "",
    latitude: "",
    longitude: "",
  });
  const userInfo = useAtomValue(localStorageUserInfoAtom);

  const onMoveToAddPlan = () => {
    // 만약 내 mbti 정보가 없다면 경고 후 mbti-test로 이동
    if (userInfo.mbtiName !== "") {
      router.push("/add-plan");
    }
  };
  const {
    PopularPlan,
    PopularPlanDescription,
    PopularPlanDefaultDescription,
    MBTIPlan,
    MBTIPlanDescription,
    MBTIPlanDefaultDescription,
  } = HomePageConfig;

  const {
    data: popularPlanList,
    error: popularPlanError,
    isLoading: popularPlanisLoading,
    refetch: popularPlanRefetch,
  } = useGetPlanList(region.id);

  const {
    planList,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch: planListRefetch,
  } = useGetInfinitePlanList(region.id, selectMBTI);

  const { ref, inView } = useInView({
    threshold: 0.4,
    delay: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  useEffect(() => {
    popularPlanRefetch();
    planListRefetch();
  }, [region]);

  useEffect(() => {
    // mbti 선택할 때 마다 api 요청 다시 보내기
    planListRefetch();
  }, [selectMBTI]);

  const onClickMBTI = (mbti: string) => {
    const isContain = selectMBTI.indexOf(mbti);
    if (isContain < 0) {
      setSelectMBTI([...selectMBTI, mbti]);
    } else {
      const newMBTIList = selectMBTI.filter((item) => item !== mbti);
      setSelectMBTI(newMBTIList);
    }
  };

  if (popularPlanisLoading) {
    return <div>로딩중</div>;
  }

  if (popularPlanError) {
    return <div>에러</div>;
  }

  return (
    <div className="py-10 px-5 sm:px-60 sm:py-32">
      <div className="flex flex-col justify-around sm:flex-row ">
        <div className="h-52 sm:h-96">
          <div className="h-5/6 relative">
            <Image
              src="/images/mascot1.png"
              fill={true}
              alt="마스코트1"
              className="object-contain"
            />
          </div>
          <div className="h-1/6 w-96 bg-red relative">
            <Image
              src="/images/logo.png"
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
          <SearchCity setRegion={setRegion} />
        </div>
      </div>
      <div className=" text-center mt-20">
        <Dialog>
          <DialogTrigger
            className="bg-white text-cyan-600 border-cyan-600 border-4 rounded-2xl w-80 h-14 hover:bg-cyan-600/20"
            onClick={onMoveToAddPlan}
          >
            내 일정 작성하러 가기!
          </DialogTrigger>
          {userInfo.mbtiName === "" ? <BeforeCreatePlanModal /> : ""}
        </Dialog>
        <div className="text-3xl font-bold mt-12">{PopularPlan}</div>
        <div className="text-xl text-zinc-600 mt-2">
          {region.id === 0 ? (
            <>{PopularPlanDefaultDescription}</>
          ) : (
            <>
              {region.koreanName}
              {PopularPlanDescription}
            </>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 place-items-center mt-5 gap-5 gap-y-16">
          {popularPlanList?.plans.map((item: IPlan2) => (
            <PlanCard item={item} key={item.planId} />
          ))}
        </div>
        <div className="text-3xl font-bold mt-12">{MBTIPlan}</div>
        <div className="text-xl text-zinc-600 mt-2 flex justify-center">
          {selectMBTI.length !== 0 ? (
            <>
              {selectMBTI.map((mbti, index) => {
                if (index === 0) {
                  return <div key={mbti}>{mbti}</div>;
                } else {
                  return <div key={mbti}>, {mbti}</div>;
                }
              })}
              {MBTIPlanDescription}
            </>
          ) : (
            <div>{MBTIPlanDefaultDescription}</div>
          )}
        </div>
        <Carousel className="my-5 mx-12 sm:mx-40">
          <CarouselContent>
            <CarouselItem>
              <div className="flex w-full justify-center gap-1 sm:gap-5">
                {MBTI.slice(0, 8).map((item) => (
                  <Badge
                    key={item}
                    variant={
                      selectMBTI.indexOf(item) < 0 ? "unselected" : "selected"
                    }
                    onClick={() => onClickMBTI(item)}
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex w-full justify-center gap-1 sm:gap-5">
                {MBTI.slice(8).map((item) => (
                  <Badge
                    key={item}
                    variant={
                      selectMBTI.indexOf(item) < 0 ? "unselected" : "selected"
                    }
                    onClick={() => onClickMBTI(item)}
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="grid grid-cols-1 sm:grid-cols-3 place-items-center mt-5 gap-y-16">
          {planList?.pages.map((itemList) =>
            itemList.plans.map((item: IPlan2) => (
              <PlanCard item={item} key={item.planId} />
            )),
          )}
          <div ref={ref} className="h-10 bg-red-200" />
        </div>
      </div>
    </div>
  );
};

export default Home;
