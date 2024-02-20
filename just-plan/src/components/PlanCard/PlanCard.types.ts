import type { IPlan2 } from "@/types/plan.types";

// 이거 안쓰이나?
export interface ICardUserData {
  id: number;
  image: string;
  profile: string;
  name: string;
  date: string;
  money: string;
  count: number;
  mbti: string;
  hashTags: string[];
}

export interface Props {
  // item: IPlan;
  item: IPlan2;
  cityId: number;
  mbtiList: string[];
}
