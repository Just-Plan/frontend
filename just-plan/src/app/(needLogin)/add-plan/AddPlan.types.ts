import type { IRegion } from "@/types/plan.types";
import type { SetStateAction } from "jotai";
import type { Dispatch } from "react";
import type { DateRange } from "react-day-picker";

export interface NameInputProps {
  onNextStep: (name: string) => void;
}
export interface SearchResultsProps {
  onPreviousStep: () => void;
  onNextStep?: (selectedResult: never[]) => void;
  onResultSelect: Dispatch<SetStateAction<IRegion>>;
}

export interface DatePickerProps {
  onPreviousStep: () => void;
  onNextStep: () => void;
  onSelectDate: (date: DateRange | undefined) => void;
  onCreatePlan: () => void;
}

export interface HashTagProps {
  onPreviousStep: () => void;
  onNextStep: () => void;
  setAddHashTags: Dispatch<SetStateAction<string[]>>;
  addHashTags: string[];
}

export interface ICreatePlanReqBody {
  title: string;
  tags: string[];
  startDate: string;
  endDate: string;
  regionId: number;
}
