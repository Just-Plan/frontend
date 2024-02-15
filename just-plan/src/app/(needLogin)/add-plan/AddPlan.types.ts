import type { SetStateAction } from "jotai";
import type { DateRange } from "react-day-picker";

export interface NameInputProps {
  onNextStep: (name: string) => void;
}
export interface SearchResultsProps {
  onPreviousStep: () => void;
  onNextStep?: (selectedResult: never[]) => void;
  onResultSelect: (selectedResult: SetStateAction<never[]>) => void;
}

export interface DatePickerProps {
  planName: string;
  searchResults: string[];
  selectedDate: string | undefined;
  onPreviousStep: () => void;
  onSelectDate: (date: DateRange | undefined) => void;
  onSelectExpenses: (expenses: string) => void;
}
