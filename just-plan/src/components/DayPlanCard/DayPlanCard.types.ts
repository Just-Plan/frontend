import { IPlace } from "@/types/place.types";

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
  item: IPlan;
}

export interface IDnDProps {
  dayPlan: IPlace[];
  day: string
}