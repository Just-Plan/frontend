import Image from "next/image";
import React from "react";

const HouseholdContent = () => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <div className="bg-ourGreen p-2 w-10 h-10 rounded-full">
            <Image src="/images/food.png" alt="식비" width={30} height={30} />
          </div>
          <div className="border-ourGreen border-2 rounded-full flex w-[13rem] items-center px-4 justify-between">
            <div className="">식비</div>
            <div className="">400,000₩</div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="bg-ourGreen p-2 w-10 h-10 rounded-full">
            <Image src="/images/car.png" alt="식비" width={30} height={30} />
          </div>
          <div className="border-ourGreen border-2 rounded-full flex w-[13rem] items-center px-4 justify-between">
            <div>교통비</div>
            <div>400,000₩</div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="bg-ourGreen p-2 w-10 h-10 rounded-full">
            <Image src="/images/room.png" alt="식비" width={30} height={30} />
          </div>
          <div className="border-ourGreen border-2 rounded-full flex w-[13rem] items-center px-4 justify-between">
            <div>숙박비</div>
            <div>400,000₩</div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="bg-ourGreen p-2 w-10 h-10 rounded-full">
            <Image
              src="/images/shopping.png"
              alt="식비"
              width={30}
              height={30}
            />
          </div>
          <div className="border-ourGreen border-2 rounded-full flex w-[13rem] items-center px-4 justify-between">
            <div>쇼핑비</div>
            <div>400,000₩</div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="bg-ourGreen p-2 w-10 h-10 rounded-full">
            <Image src="/images/etc.png" alt="식비" width={30} height={30} />
          </div>
          <div className="border-ourGreen border-2 rounded-full flex w-[13rem] items-center px-4 justify-between">
            <div>기타 비용</div>
            <div>400,000₩</div>
          </div>
        </div>
      </div>
      <div className="bg-ourGreen p-3 px-5 rounded-3xl justify-center items-center flex flex-col gap-4">
        <div>
          <div className="text-sm font-bold text-center">총 지출 예상</div>
          <div className="text-gray-400">1,400,000₩</div>
        </div>
        <div>
          <div className="text-sm font-bold text-center">총 예산</div>
          <div className="text-gray-400">1,000,000₩</div>
        </div>
        <div>
          <div className="text-sm font-bold text-center">초과 예산</div>
          <div className="text-gray-400">400,000₩</div>
        </div>
      </div>
    </div>
  );
};

export default HouseholdContent;
