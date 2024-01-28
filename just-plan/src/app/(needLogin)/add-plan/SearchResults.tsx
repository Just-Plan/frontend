"use client";
import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export const SearchResults = ({ onPreviousStep, onNextStep }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    // 수정 필요
    setSearchResults(["뉴욕", "파리", "제주도"]);
  };
  return (
    <div className="flex flex-col gap-5">
      <Label>어디로 떠나시나요?</Label>
      <Input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchTerm}
        onChange={handleSearchInputChange}
      />
      삭제예정
      <Button onClick={handleSearch}>검색</Button>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
      <div className="flex justify-center gap-8">
        <Button onClick={onPreviousStep}>이전</Button>
        <Button onClick={onNextStep}>다음</Button>
      </div>
    </div>
  );
};
