import DayPlanCard from "@/components/DayPlanCard/DayPlanCard";
import { Button } from "@/components/ui/Button";
import { Plan, PlanInfo } from "@/mocks";
import Image from "next/image";
import ShowMoney from "../_components/ShowMoney/ShowMoney";

const page = () => {
  const { location, date, title, hashTags, cache, card } = PlanInfo;
  return (
    <div className="m-5 sm:m-10">
      <div className="">
        <div className="flex items-center">
          <Image
            src="/airplane.png"
            width={25}
            height={25}
            alt="비행기 아이콘"
          />
          <div className="ml-2">{location}</div>
          <div className="text-xs ml-28">{date}</div>
        </div>
        <div className="flex">
          <div className="flex items-center flex-1">
            <div className="font-bold text-2xl sm:text-3xl my-2 sm:my-3 mr-5">
              {title}
            </div>
            <div className="hover:cursor-pointer rounded-full p-1 hover:bg-gray-200">
              <Image src="/images/edit.png" alt="수정" width={27} height={27} />
            </div>
          </div>

          <div className="hidden sm:flex items-center hover:cursor-pointer rounded-full p-1 w-10 h-10 hover:bg-gray-200">
            <Image src="/images/map.png" alt="지도" width={40} height={40} />
          </div>
        </div>

        <div className="flex">
          <div className="text-cyan-600 font-bold flex-1 my-auto flex gap-3">
            {hashTags.map((tag) => (
              <div key={tag.id}># {tag.tag}</div>
            ))}
          </div>
          <Button variant="outline" className="w-12 sm:w-28">
            저장
          </Button>
        </div>
        <ShowMoney cache={cache} card={card} />
      </div>
      <div className="bg-ourGreen flex flex-col p-3 sm:p-5 rounded-2xl">
        <div className=" bg-white h-20 rounded-2xl mb-5 flex gap-5 sm:gap-10 items-center p-5 sm:px-8 font-bold overflow-x-auto overflow-y-hidden">
          <div className="hidden sm:block hover:cursor-pointer py-3 px-5 relative">
            <div className="">전체보기</div>
            <div className="bg-blue-300 w-full h-1 absolute bottom-0 left-0"></div>
          </div>

          {Plan.map((item) => (
            <div
              className="flex flex-col items-center hover:cursor-pointer py-1 px-2 relative"
              key={item.id}
            >
              <div>Day{item.id}</div>
              <div className="text-slate-400 text-xs">{item.date}</div>
              <div className="bg-blue-300 w-full h-1 absolute bottom-0 left-0"></div>
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
