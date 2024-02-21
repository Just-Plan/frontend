import { Input } from "@/components/Input";
import type { IModifyPlanInfo } from "@/types/plan.types";
import Image from "next/image";

interface IProps {
  totalMoney: number;
  expense: IModifyPlanInfo["expense"];
  onChangeExpense: (e: React.ChangeEvent<HTMLInputElement>) => null | undefined;
}

const HouseholdContent = ({ totalMoney, expense, onChangeExpense }: IProps) => {
  // 총 예산 구하기
  const totalEstimated = Object.values(expense).reduce(
    (a, b) => Number(a) + Number(b),
    0,
  );
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <div className="bg-ourGreen p-2 w-10 h-10 rounded-full">
            <Image src="/images/food.png" alt="식비" width={30} height={30} />
          </div>
          <div className="relative w-44 sm:w-[13rem]">
            <div className="absolute top-2 left-4">식비</div>
            <Input
              name="food"
              value={expense.food}
              onChange={onChangeExpense}
              variant={"detailMoney"}
              placeholder="ex) 400000"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="bg-ourGreen p-2 w-10 h-10 rounded-full">
            <Image src="/images/car.png" alt="교통비" width={30} height={30} />
          </div>
          <div className="relative w-44 sm:w-[13rem]">
            <div className="absolute top-2 left-4">교통비</div>
            <Input
              name="transportation"
              value={expense.transportation}
              onChange={onChangeExpense}
              variant={"detailMoney"}
              placeholder="ex) 400000"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="bg-ourGreen p-2 w-10 h-10 rounded-full">
            <Image src="/images/room.png" alt="숙박" width={30} height={30} />
          </div>
          <div className="relative w-44 sm:w-[13rem]">
            <div className="absolute top-2 left-4">숙박비</div>
            <Input
              name="lodging"
              value={expense.lodging}
              onChange={onChangeExpense}
              variant={"detailMoney"}
              placeholder="ex) 400000"
            />
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
          <div className="relative w-44 sm:w-[13rem]">
            <div className="absolute top-2 left-4">쇼핑비</div>
            <Input
              name="shopping"
              value={expense.shopping}
              onChange={onChangeExpense}
              variant={"detailMoney"}
              placeholder="ex) 400000"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="bg-ourGreen p-2 w-10 h-10 rounded-full">
            <Image src="/images/etc.png" alt="기타" width={30} height={30} />
          </div>
          <div className="relative w-44 sm:w-[13rem]">
            <div className="absolute top-2 left-4">기타 비용</div>
            <Input
              name="etc"
              value={expense.etc}
              onChange={onChangeExpense}
              variant={"detailMoney"}
              placeholder="ex) 400000"
            />
          </div>
        </div>
      </div>
      <div className="bg-ourGreen sm:p-3 sm:px-5 rounded-3xl justify-center items-center text-center flex flex-col gap-8">
        <div>
          <div className="text-sm font-bold text-gray-700">총 지출 예상</div>
          <div className="text-gray-400">
            {totalEstimated.toLocaleString()} ₩
          </div>
        </div>
        <div>
          <div className="text-sm font-bold text-gray-700">총 예산</div>
          <div className="text-gray-400">{totalMoney.toLocaleString()} ₩</div>
        </div>
      </div>
    </div>
  );
};

export default HouseholdContent;
