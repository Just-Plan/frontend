import { Button } from "@/components/Button";
import { SearchCity } from "@/components/SearchCity/SearchCity";
import { Label } from "@radix-ui/react-label";
import type { SearchResultsProps } from "../../AddPlan.types";

export const SearchResults = ({
  onPreviousStep,
  onResultSelect,
}: SearchResultsProps) => {
  return (
    <div className="flex flex-col gap-5">
      <Label>어디로 떠나시나요?</Label>
      <SearchCity setRegion={onResultSelect} />
      <div className="flex justify-center gap-8">
        <Button onClick={onPreviousStep}>이전</Button>
      </div>
    </div>
  );
};
