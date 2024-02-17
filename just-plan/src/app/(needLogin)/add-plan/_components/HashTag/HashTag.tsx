import { Button } from "@/components/Button";
import type { HashTagProps } from "../../AddPlan.types";
import { AddHashTags } from "@/app/(needLogin)/_components/AddHashTags/AddHashTags";
import { useState } from "react";

export const HashTag = ({ onPreviousStep, onNextStep }: HashTagProps) => {
  const [addHashTags, setAddHashTags] = useState<string[]>([]);

  console.log("addHashtags", addHashTags);
  return (
    <div>
      <AddHashTags
        setAddHashTags={setAddHashTags}
        addHashTags={addHashTags}
        white
      />
      <Button onClick={onPreviousStep}>이전</Button>
      <Button onClick={onNextStep}>다음</Button>
    </div>
  );
};
