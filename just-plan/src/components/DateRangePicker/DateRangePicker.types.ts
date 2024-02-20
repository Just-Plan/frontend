import type { SetStateAction } from "jotai";
import type { Dispatch } from "react";
import type { DateRange } from "react-day-picker";

export interface IProps {
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
  date: DateRange | undefined;
}
