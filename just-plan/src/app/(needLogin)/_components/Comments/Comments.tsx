import Image from "next/image";
import React from "react";
import type { IProps } from "./Comments.types";

const Comments = ({ comment }: IProps) => {
  const { id, profile, name, mbti, date, content } = comment;
  return (
    <div className="bg-gray-100 p-2 rounded-md">
      <div className="flex mb-2">
        <div className="w-10 h-10 relative mr-2">
          <Image src={profile} alt="프로필" fill className=" rounded-full" />
        </div>
        <div className="flex flex-1 flex-col items-start">
          <div className="font-bold">{name}</div>
          <div className="text-xs text-gray-400">{mbti}</div>
        </div>
        <div className="text-xs">{date}</div>
      </div>

      <div className="items-start flex ml-3">{content}</div>
    </div>
  );
};

export default Comments;
