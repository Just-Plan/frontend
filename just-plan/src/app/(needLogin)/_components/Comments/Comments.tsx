"use client";
import Image from "next/image";
import type { IProps } from "./Comments.types";
import { returnDefaultImg } from "@/utils/returnDefaultImg";
import { format } from "date-fns";
import { useDeletePlaceComment } from "@/hooks/useDeletePlaceComment";

const Comments = ({ placeId, commentInfo }: IProps) => {
  const { placeCommentId, user, createdAt, content } = commentInfo;
  const { mutate } = useDeletePlaceComment();

  const onDelete = () => {
    mutate({ placeId, placeCommentId });
  };

  return (
    <div className="bg-gray-100 p-3 rounded-md">
      <div className="flex mb-2">
        <div className="w-10 h-10 relative mr-2">
          <Image
            src={returnDefaultImg(user.profile)}
            alt="프로필"
            fill
            className="rounded-full border border-black"
          />
        </div>
        <div className="flex flex-1 flex-col items-start">
          <div className="font-bold">{user.name}</div>
          <div className="text-xs text-gray-400">{user.mbtiName || "INFJ"}</div>
        </div>
        <div className="text-xs">{format(createdAt, "yyyy-MM-dd")}</div>
      </div>

      <div className="items-start flex ml-1">{content}</div>
      <div className="flex justify-end text-gray-500 gap-2">
        <div className="hover:cursor-pointer hover:text-gray-300">수정</div>
        <div
          className="hover:cursor-pointer hover:text-gray-300"
          onClick={onDelete}
        >
          삭제
        </div>
      </div>
    </div>
  );
};

export default Comments;
