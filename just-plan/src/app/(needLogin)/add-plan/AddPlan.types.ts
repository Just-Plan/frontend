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
  planName: string;
  searchResults: IRegion;
  selectedDate: string | undefined;
  onPreviousStep: () => void;
  onSelectDate: (date: DateRange | undefined) => void;
  onSelectExpenses: (expenses: string) => void;
}
