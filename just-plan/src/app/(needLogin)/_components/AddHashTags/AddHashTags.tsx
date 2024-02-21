import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useState } from "react";
import type { IProps } from "./AddHashTag.types";
import { isValidString } from "@/utils/isValidString";

export const AddHashTags = ({ addHashTags, setAddHashTags, white }: IProps) => {
  const [addHashTag, setAddHashTag] = useState<string>("");

  const onAddHashTag = () => {
    if (addHashTag === "") return;
    if (!isValidString(addHashTag)) return;
    setAddHashTags([...addHashTags, addHashTag]);
    setAddHashTag("");
  };

  const onDeleteHashTag = (tag: string) => {
    const newHashTagList = addHashTags.filter((item) => item !== tag);
    setAddHashTags(newHashTagList);
  };
  return (
    <>
      <div className="flex gap-6">
        <Input
          id="hashtag"
          placeholder="추가할 태그를 입력해주세요"
          className={`bg-ourGreen/80 mb-3 mt-1 ${white} && bg-white border-2 border-ourGreen/80`}
          value={addHashTag}
          onChange={(e) => setAddHashTag(e.target.value)}
        />
        <Button type="button" onClick={onAddHashTag}>
          추가
        </Button>
      </div>
      <div className="flex gap-5 -mt-2 mb-4 ml-2">
        {addHashTags.map((tag) => (
          <div key={tag} className="flex gap-0.5">
            <div className="text-blue-500">#{tag}</div>
            <div
              className="hover:cursor-pointer hover:bg-gray-200 w-5 h-5 flex justify-center rounded-full"
              onClick={() => onDeleteHashTag(tag)}
            >
              x
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
