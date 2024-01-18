import Image from "next/image";

const AddedPlaceCard = () => {
  return (
    <div className="border w-80 rounded-xl flex p-3 z-10 bg-white">
      <div className="w-16 h-16 relative my-auto">
        <Image
          src="/image1.png"
          alt="장소 이미지"
          fill={true}
          className="rounded-md"
        />
      </div>

      <div className="flex flex-col flex-1 ml-3">
        <div className="font-bold">성산 일출봉</div>
        <div className="flex">
          <div className=" text-sky-600 font-bold mr-2">명소</div>
          <div className=" text-slate-400">인천시 미추홀구</div>
        </div>
        <div className="flex">
          <Image src="/memo.png" alt="메모" width={23} height={23} />
          <div className="text-slate-500">메모</div>
        </div>
      </div>
      <div className="float-right">x</div>
    </div>
  );
};

export default AddedPlaceCard;
