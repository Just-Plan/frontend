import type { IProps } from "./PlanDayHeader.types";

export const PlanDayHeader = ({ days }: IProps) => {
  return (
    <div className=" bg-white h-20 rounded-2xl mb-5 flex gap-5 sm:gap-10 items-center p-5 sm:px-8 font-bold overflow-x-auto overflow-y-hidden">
      <div className="hidden sm:block hover:cursor-pointer py-3 px-5 relative">
        <div className="">전체보기</div>
        <div className="bg-blue-300 w-full h-1 absolute bottom-0 left-0"></div>
      </div>

      {days.map((item) => (
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
  );
};
