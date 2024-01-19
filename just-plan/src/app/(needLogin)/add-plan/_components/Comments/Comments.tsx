import Image from "next/image";
import React from "react";

const Comments = () => {
  return (
    <div className="bg-gray-100 p-2 rounded-md">
      <div className="flex mb-2">
        <div className="w-10 h-10 relative mr-2">
          <Image
            src="/images/image1.png"
            alt="프로필"
            fill
            className=" rounded-full"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="font-bold">강윤지</div>
          <div className="text-xs text-gray-400">INFJ</div>
        </div>
        <div className="text-xs">2024.01.05</div>
      </div>

      <div>댓글 본문~~~~~~~</div>
    </div>
  );
};

export default Comments;
