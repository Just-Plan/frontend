import DayPlanCard from "@/components/DayPlanCard/DayPlanCard";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <div>
        <div className="flex">
          <Image
            src="/airplane.png"
            width={25}
            height={25}
            alt="비행기 아이콘"
          />
          <div>제주도</div>
          <div>2024-01-05~2024-02-05</div>
        </div>
        <div className="font-bold text-3xl">강윤지님의 제주도 먹고뿌셔</div>
        <div className="text-cyan-600 font-bold"># 해시태그 # 해시태그</div>
        <div className="flex justify-between">
          <div className="flex">
            <div className="bg-emerald-100 flex p-2 px-5 rounded-full items-center">
              <Image src="/cash.png" alt="현금" width={30} height={30} />
              <div className="ml-2 text-neutral-700">200,000₩</div>
            </div>
            <div className="bg-emerald-100 flex p-2 px-5 rounded-full items-center">
              <Image src="/card.png" alt="카드" width={30} height={30} />
              <div className="ml-2 text-neutral-700">500,000₩</div>
            </div>
            <div className="border-2 border-emerald-100 flex p-2 px-5 rounded-full items-center">
              <Image src="/cash.png" alt="현금" width={30} height={30} />
              <div className="ml-2 text-neutral-700">200,000₩</div>
            </div>
          </div>

          <div className="float: right flex">
            <button>저장</button>
          </div>
        </div>
      </div>
      <div className="bg-emerald-200 flex flex-col">
        <div className=" bg-white m-5 h-20 rounded-2xl mt10 flex gap-10 items-center px-8 font-bold overflow-y-scroll">
          <div>ALL</div>
          <div className="flex flex-col items-center">
            <div>Day1</div>
            <div className="text-slate-400 text-xs">2024.01.12</div>
          </div>
          <div className="flex flex-col items-center">
            <div>Day2</div>
            <div className="text-slate-400 text-xs">2024.01.12</div>
          </div>
          <div className="flex flex-col items-center">
            <div>Day3</div>
            <div className="text-slate-400 text-xs">2024.01.12</div>
          </div>
          <div className="flex flex-col items-center">
            <div>Day4</div>
            <div className="text-slate-400 text-xs">2024.01.12</div>
          </div>
          <div className="flex flex-col items-center">
            <div>Day5</div>
            <div className="text-slate-400 text-xs">2024.01.12</div>
          </div>
          <div className="flex flex-col items-center">
            <div>Day6</div>
            <div className="text-slate-400 text-xs">2024.01.12</div>
          </div>
          <div className="flex flex-col items-center">
            <div>Day7</div>
            <div className="text-slate-400 text-xs">2024.01.12</div>
          </div>
          <div className="flex flex-col items-center">
            <div>Day8</div>
            <div className="text-slate-400 text-xs">2024.01.12</div>
          </div>
          <div className="flex flex-col items-center">
            <div>Day9</div>
            <div className="text-slate-400 text-xs">2024.01.12</div>
          </div>
          <div className="flex flex-col items-center">
            <div>Day10</div>
            <div className="text-slate-400 text-xs">2024.01.12</div>
          </div>
        </div>
        <div className="flex gap-10 overflow-x-scroll">
          <DayPlanCard />
          <DayPlanCard />
          <DayPlanCard />
          <DayPlanCard />
          <DayPlanCard />
        </div>
      </div>
    </div>
  );
};

export default page;
