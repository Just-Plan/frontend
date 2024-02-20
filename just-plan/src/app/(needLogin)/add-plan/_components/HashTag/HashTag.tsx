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
    <div className="flex flex-col gap-5 text-center items-center">
      <div className="text-lg text-gray-700 mb-10">
        여행을 나타낼 해시태그를 추가해보세요!
      </div>

      <div className="w-96">
        <AddHashTags
          setAddHashTags={setAddHashTags}
          addHashTags={addHashTags}
          white
        />
      </div>

      <div className="flex justify-center items-center w-56 sm:w-96">
        <Button className="w-1/2" onClick={onPreviousStep}>
          이전
        </Button>
        <Button className="w-1/2" onClick={onNextStep}>
          다음
        </Button>
      </div>
    </div>
  );
};
