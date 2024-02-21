import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import type { NameInputProps } from "../../AddPlan.types";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { isValidString } from "@/utils/isValidString";
import { MAX_LEN_PLAN_TITLE } from "@/constants/MaxLen";

export const NameInput = ({ onNextStep }: NameInputProps) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  useEffect(() => {
    if (!name) {
      // 입력 유효성 검사
      setError("플랜 이름을 입력해주세요.");
      return;
    }
    if (!isValidString(name)) {
      setError("유효한 입력이 아닙니다.");
      return;
    }
    setError("");
  }, [name]);

  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="text-lg text-gray-700">플랜 이름을 입력해주세요.</div>
      <Input
        type="text"
        placeholder="ex) 제주도 4박 5일"
        className="w-56 sm:w-96 mt-10"
        value={name}
        onChange={handleNameInputChange}
        maxLength={MAX_LEN_PLAN_TITLE}
      />
      <span className="text-red-600 text-sm -mt-3">{error}</span>
      <Button
        className="w-56 sm:w-96"
        onClick={() => onNextStep(name)}
        disabled={!!error}
      >
        다음
      </Button>
    </div>
  );
};
