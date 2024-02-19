import Image from "next/image";
import React from "react";
import doubleArrowLeft from "@/../public/svg/doubleArrowLeft.svg";
import doubleArrowRight from "@/../public/svg/doubleArrowRight.svg";
import chevronLeft from "@/../public/svg/chevronLeft.svg";
import chevronRight from "@/../public/svg/chevronRight.svg";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/Button";

const Pagination = ({
  totalPage,
  page,
  location,
}: {
  totalPage: number;
  page: number;
  location: string;
}) => {
  const pageGroupSize = 10; // 한 번에 표시할 최대 페이지 번호 수
  const currentPageGroup = Math.ceil(page / pageGroupSize); // 현재 페이지 그룹
  const startPage = (currentPageGroup - 1) * pageGroupSize + 1; // 현재 페이지 그룹의 시작 페이지
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPage); // 현재 페이지 그룹의 마지막 페이지

  // const buttons = Array.from({ length: totalPage }, (_, index) => (
  const buttons = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => (
      <div key={index}>
        <Link
          href={`/mypage/${location}?page=${(currentPageGroup - 1) * pageGroupSize + index + 1}`}
          className={cn(
            buttonVariants({
              variant:
                (currentPageGroup - 1) * pageGroupSize + index + 1 === page
                  ? "outline"
                  : "ghost",
            }),
          )}
        >
          {(currentPageGroup - 1) * pageGroupSize + index + 1}
        </Link>
      </div>
    ),
  );

  return (
    <div className=" flex justify-center my-5">
      <div className="flex sm:gap-0.5">
        <Link
          href={`/mypage/myPlanList?page=1`}
          className={cn(
            buttonVariants({
              variant: "ghost",
            }),
          )}
        >
          <Image src={doubleArrowLeft} alt="first" width={20} height={20} />
        </Link>
        <Link
          href={`/mypage/myPlanList?page=${page > 1 ? page - 1 : page}`}
          className={cn(
            buttonVariants({
              variant: "ghost",
            }),
          )}
        >
          <Image src={chevronLeft} alt="previous" width={20} height={20} />
        </Link>
        {buttons}
        {/* {currentPageGroup * pageGroupSize < totalPage &&} */}
        <Link
          href={`/mypage/myPlanList?page=${page < totalPage ? page + 1 : page}`}
          className={cn(
            buttonVariants({
              variant: "ghost",
            }),
          )}
        >
          <Image src={chevronRight} alt="first" width={20} height={20} />
        </Link>
        <Link
          href={`/mypage/myPlanList?page=${totalPage}`}
          className={cn(
            buttonVariants({
              variant: "ghost",
            }),
          )}
        >
          <Image src={doubleArrowRight} alt="previous" width={20} height={20} />
        </Link>
      </div>
    </div>
  );
};

export default Pagination;
