"use client";

import Image from "next/image";
import { ScrollArea } from "@/components/ScrollArea";
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
import { getCities } from "./_lib/getCities";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPlanList } from "./_lib/getPlanList";
import { IPlan, IPlan2 } from "@/types/plan.types";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const router = useRouter();
  const onMoveToAddPlan = () => {
    router.push("/add-plan");
  };
  const { PopularPlan, PopularPlanDescription, MBTIPlan, MBTIPlanDescription } =
    HomePageConfig;

  const {
    data: searchResult,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const {
    data: popularPlanList,
    error: popularPlanError,
    isLoading: popularPlanisLoading,
  } = useQuery({
    queryKey: ["planList", 3],
    queryFn: () => getPlanList(0, 3),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  console.log(
    "아니 여기서 왜 에러가?222 data:",
    popularPlanList,
    "error: ",
    popularPlanError,
  );

  const {
    data: planList,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["infinitePlan"],
    queryFn: ({ pageParam }) => getPlanList(pageParam, 6),
    getNextPageParam: (lastPage) => {
      if (lastPage?.currentPage < lastPage?.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
  });

  const { ref, inView } = useInView({
    threshold: 0.4,
    delay: 0,
  });
  console.log("hasNextPage", hasNextPage);

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isLoading || popularPlanisLoading) {
    return <div>로딩중</div>;
  }

  if (error || popularPlanError) {
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
          <div className="bg-white h-10 rounded-3xl flex justify-between pl-5 pr-5 mt-5 border sm:w-96">
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
          <ScrollArea className="w-fill h-48 rounded-md border mt-5 bg-white">
            <div className="py-4 px-8">
              {searchResult.data.cities.map((item: any) => (
                <div
                  key={item.id}
                  className="flex justify-between p-1 items-end"
                >
                  <div className="font-bold text-neutral-600 text-2xl">
                    {item.koreanName}
                  </div>
                  <div className="text-neutral-400">
                    {item.countryKoreanName}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className=" text-center mt-20">
        <button
          className="bg-white text-cyan-600 border-cyan-600 border-4 rounded-2xl w-80 h-14 hover:bg-cyan-600/20"
          onClick={onMoveToAddPlan}
        >
          내 일정 작성하러 가기!
        </button>
        <div className="text-3xl font-bold mt-12">{PopularPlan}</div>
        <div className="text-xl text-zinc-600 mt-2">
          {PopularPlanDescription}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 place-items-center mt-5 gap-5 gap-y-16">
          {popularPlanList?.plans.map((item: IPlan2) => (
            <PlanCard item={item} key={item.planId} />
          ))}
        </div>
        <div className="text-3xl font-bold mt-12">{MBTIPlan}</div>
        <div className="text-xl text-zinc-600 mt-2">
          ENFP, INFJ{MBTIPlanDescription}
        </div>
        <Carousel className="my-5 mx-12 sm:mx-40">
          <CarouselContent>
            <CarouselItem>
              <div className="flex w-full justify-center gap-1 sm:gap-5">
                {MBTI.slice(0, 8).map((item) => (
                  <Badge key={item} variant="unselected">
                    {item}
                  </Badge>
                ))}
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex w-full justify-center gap-1 sm:gap-5">
                {MBTI.slice(8).map((item) => (
                  <Badge key={item} variant="unselected">
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
