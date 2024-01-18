import DayPlanCard from "@/components/DayPlanCard/DayPlanCard";
import { Button } from "@/components/ui/Button";
import { Plan } from "@/mocks";
import Image from "next/image";

const page = () => {
  return (
    <div className="m-10">
      <div className="">
        <div className="flex items-center">
          <Image
            src="/airplane.png"
            width={25}
            height={25}
            alt="비행기 아이콘"
          />
          <div className="ml-2">제주도</div>
          <div className="text-xs ml-28">2024-01-05~2024-02-05</div>
        </div>
        <div className="flex">
          <div className="flex items-center flex-1">
            <div className="font-bold text-3xl my-3 mr-5">
              강윤지님의 제주도 먹고뿌셔
            </div>
            <div className="hover:cursor-pointer rounded-full p-1 hover:bg-gray-200">
              <Image src="/images/edit.png" alt="수정" width={27} height={27} />
            </div>
          </div>

          <div className="flex items-center hover:cursor-pointer rounded-full p-1 w-10 h-10 hover:bg-gray-200">
            <Image src="/images/map.png" alt="지도" width={40} height={40} />
          </div>
        </div>

        <div className="text-cyan-600 font-bold"># 해시태그 # 해시태그</div>
        <div className="flex justify-between items-center">
          <div className="flex gap-5 my-5">
            <div className="bg-ourGreen/60 flex p-2 px-5 rounded-full items-center">
              <Image src="/cash.png" alt="현금" width={30} height={30} />
              <div className="ml-2 text-neutral-700">200,000₩</div>
            </div>
            <div className="bg-ourGreen/60 flex p-2 px-5 rounded-full items-center">
              <Image src="/card.png" alt="카드" width={30} height={30} />
              <div className="ml-2 text-neutral-700">500,000₩</div>
            </div>
            <div className="border-2 border-ourGreen/60 flex p-2 px-5 rounded-full items-center">
              <Image src="/cash.png" alt="현금" width={30} height={30} />
              <div className="ml-2 text-neutral-700">200,000₩</div>
            </div>
          </div>
          <div>
            <Button variant="outline" className="w-28">
              저장
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-ourGreen flex flex-col p-5 rounded-2xl">
        <div className=" bg-white h-20 rounded-2xl mb-5 flex gap-10 items-center px-8 font-bold overflow-x-auto">
          <div>ALL</div>
          {Plan.map((item) => (
            // <DayPlanCard key={item.id} item={item} />
            <div className="flex flex-col items-center" key={item.id}>
              <div>Day{item.id}</div>
              <div className="text-slate-400 text-xs">{item.date}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-10 overflow-x-scroll">
          {Plan.map((item) => (
            <DayPlanCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
