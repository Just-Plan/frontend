import type { IPlaceComment } from "@/types/placeComment.types";

export interface IComments {
  id: number;
  profile: string;
  name: string;
  mbti: string;
  date: string;
  content: string;
}

export interface IProps {
  placeId: number;
  commentInfo: IPlaceComment;
}
