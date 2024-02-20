import type { IPlace } from "@/types/place.types";

export interface IPlan {
  id: number;
  date: string;
  image: string;
  title: string;
  category: string;
  address: string;
  time: string | null;
}

export interface IProps {
  day: string;
}

export interface IDnDProps {
  dayPlan: IPlace[];
  day: string;
}
