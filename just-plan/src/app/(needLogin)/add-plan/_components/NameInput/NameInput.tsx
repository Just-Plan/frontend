import { Label } from "@radix-ui/react-label";
import type { ChangeEvent } from "react";
import { useState } from "react";
import type { NameInputProps } from "../../AddPlan.types";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export const NameInput = ({ onNextStep }: NameInputProps) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleNextStep = () => {
    if (!name) {
      setError("플랜 이름을 입력해주세요~");
      return;
    }
    onNextStep(name);
  };

  return (
    <div className="flex flex-col gap-5">
      <Label>플랜 이름을 입력해주세요~</Label>
      <Input
        type="text"
        placeholder="이름을 입력하세요"
        value={name}
        onChange={handleNameInputChange}
      />
      <span className="text-red-600">{error}</span>
      <Button onClick={handleNextStep}>다음</Button>
    </div>
  );
};
