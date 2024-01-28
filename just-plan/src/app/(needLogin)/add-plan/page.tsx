"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Progress } from "@/components/progress";
import { useAtomValue } from "jotai";
import { addPlanSetpAtom, mbtiStepAtom } from "@/store/mbti-test.atoms";
import { fake_mock } from "@/mocks";
import { SetStateAction, useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import DateRangePicker from "@/components/DateRangePicker/DateRangePicker";
const NameInput = ({ onNextStep }: any) => {
  const [name, setName] = useState("");

  const handleNameInputChange = (e: any) => {
    setName(e.target.value);
  };

  const handleNextStep = () => {
    // 이름 입력 후 다음 단계로 진행합니다.
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
      <button onClick={handleNextStep}>다음</button>
    </div>
  );
};

const SearchResults = ({ onPreviousStep, onNextStep, onResultSelect }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const handleSearchInputChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleResultClick = (result: any) => {
    // 사용자가 리스트 항목을 클릭하면 해당 항목을 부모 컴포넌트로 전달합니다.
    onResultSelect(result);
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
      {/* 삭제예정 */}
      <Button onClick={handleSearch}>검색</Button>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index} onClick={() => handleResultClick(result)}>
            {result}
          </li>
        ))}
      </ul>
      <div className="flex justify-center gap-8">
        <Button onClick={onPreviousStep}>이전</Button>
      </div>
    </div>
  );
};

const DatePicker = ({ selectedDate, onPreviousStep, onSelectDate }: any) => {
  const [dateRange, setDateRange] = useState(selectedDate);

  const handleNextStep = () => {
    //DateRangePicker에서 데이터 연동해야함
    onSelectDate(dateRange);
  };
  return (
    <div className="flex flex-col gap-5">
      <Label>여행 기간은 어떻게 되시나요?</Label>
      <DateRangePicker />
      <Label>예상 여행 경비는?</Label>
      <Input />
      <Button onClick={onPreviousStep}>이전</Button>
      <Button onClick={handleNextStep}>다음</Button>
    </div>
  );
};
const Page = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const progressValue = (step / 3) * 100;
  console.log(selectedDate);
  const handleNextStep = (data: any) => {
    if (step === 1) {
      setName(data);
    } else if (step === 2) {
    }
    setStep(step + 1);
  };
  const handlePreviousStep = () => {
    setStep(step - 1);
  };
  const handleResultSelect = (selectedResult: SetStateAction<never[]>) => {
    // 사용자가 리스트 항목을 선택하면 해당 항목을 searchResult 값으로 설정합니다.
    setSearchResults(selectedResult);
    setStep(step + 1); // 다음 단계로 진행합니다.
  };
  return (
    <div className=" flex justify-center items-center">
      <div className="w-[80%] flex flex-col justify-center items-center">
        <Progress value={progressValue} className="mt-[5rem] w-[80%]" />
        <Card className="mt-[5rem] flex flex-col justify-center items-center min-w-80  bg-ourGreen">
          <CardHeader>
            <CardTitle className="text-[2rem]">여행 일정 작성</CardTitle>
          </CardHeader>
          <CardContent>
            {step === 1 && <NameInput onNextStep={handleNextStep} />}
            {step === 2 && (
              <SearchResults
                onPreviousStep={handlePreviousStep}
                onResultSelect={handleResultSelect}
              />
            )}
            {step === 3 && (
              <DatePicker
                selectedDate={selectedDate}
                onPreviousStep={handlePreviousStep}
                onSelectDate={(date: any) => setSelectedDate(date)}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
