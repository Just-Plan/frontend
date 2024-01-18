import Image from "next/image";
import React, { PropsWithChildren } from "react";
import { IProps } from "./ShowMoney.types";

const ShowMoney = ({ cache, card }: PropsWithChildren<IProps>) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 sm:gap-5 my-5">
        <div className="bg-ourGreen/60 flex p-2 sm:px-5 rounded-full items-center">
          <Image src="/cash.png" alt="현금" width={30} height={30} />
          <div className="ml-2 text-neutral-700 text-xs sm:text-base">
            {cache.toLocaleString("ko-KR")}₩
          </div>
        </div>
        <div className="bg-ourGreen/60 flex p-2 sm:px-5 rounded-full items-center">
          <Image src="/card.png" alt="카드" width={30} height={30} />
          <div className="ml-2 text-neutral-700 text-xs sm:text-base">
            {card.toLocaleString("ko-KR")}₩
          </div>
        </div>
        <div className="border-2 border-ourGreen/60 flex p-2 sm:px-5 rounded-full items-center">
          <Image src="/cash.png" alt="현금" width={30} height={30} />
          <div className="ml-2 text-neutral-700 text-xs sm:text-base">
            {(cache + card).toLocaleString("ko-KR")}₩
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowMoney;
