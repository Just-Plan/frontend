import { Button } from "@/components/Button";
import { SearchCity } from "@/components/SearchCity/SearchCity";
import type { SearchResultsProps } from "../../AddPlan.types";

export const SearchResults = ({
  onPreviousStep,
  onResultSelect,
}: SearchResultsProps) => {
  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="text-lg text-gray-700">어디로 떠나시나요?</div>
      <div>
        <SearchCity setRegion={onResultSelect} />
      </div>
      <div className="w-56 sm:w-96">
        <Button className="w-full" onClick={onPreviousStep}>
          이전
        </Button>
      </div>
    </div>
  );
};
