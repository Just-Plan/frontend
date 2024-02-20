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
}: {
  totalPage: number;
  page: number;
}) => {
  console.log("page 출력", page);
  const buttons = Array.from({ length: totalPage }, (_, index) => (
    <div key={index}>
      <Link
        href={`/mypage/myPlanList?page=${index + 1}`}
        className={cn(
          buttonVariants({
            variant: index + 1 === page ? "outline" : "ghost",
          }),
        )}
      >
        {index + 1}
      </Link>
    </div>
  ));
  return (
    <div className=" flex justify-center my-5">
      <div className="flex gap-0.5">
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
