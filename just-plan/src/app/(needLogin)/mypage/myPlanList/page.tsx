"use client";

import React from 'react'
import MypageHeader from '../_components/MypageHeader.tsx/MypageHeader'
import { useGetMyPage } from '@/hooks/useGetMyPage';
import PlanCard from '@/components/PlanCard/PlanCard';
import { IPlan2 } from '@/types/plan.types';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useRouter } from 'next/navigation';

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) => {
  const {data, fetchNextPage, hasNextPage, isFetching} = useGetMyPage();
  console.log(searchParams.page);

  return (
    <div className='flex flex-col w-full'>
      <MypageHeader choose="./myPlanList" />
      <div className="flex justify-center flex-col">
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-10 bg-red-400">
        {data?.pages.map((itemList) => (
          itemList.data.plans.map((item: IPlan2) => (
            <PlanCard item={item} key={item.planId} />
          ))
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
    </div>
  )
}

export default Page