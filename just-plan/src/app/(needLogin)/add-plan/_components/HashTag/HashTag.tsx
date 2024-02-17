import { Button } from "@/components/Button";
import type { HashTagProps } from "../../AddPlan.types";
import { AddHashTags } from "@/app/(needLogin)/_components/AddHashTags/AddHashTags";

export const HashTag = ({
  onPreviousStep,
  onNextStep,
  addHashTags,
  setAddHashTags,
}: HashTagProps) => {
  return (
    <div>
      <AddHashTags
        setAddHashTags={setAddHashTags}
        addHashTags={addHashTags}
        white
      />
      <Button onClick={onPreviousStep}>이전</Button>
      <Button onClick={onNextStep}>완료</Button>
    </div>
  );
};
