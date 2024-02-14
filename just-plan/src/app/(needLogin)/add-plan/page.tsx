"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Progress } from "@/components/progress";
import { SetStateAction, useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import DateRangePicker from "@/components/DateRangePicker/DateRangePicker";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import useFetchComposed from "@/hooks/useFetchComposed";
import { useMutation } from "@tanstack/react-query";
import { fetchComposed } from "@/lib/returnFetch";
import { convertDateFormat } from "@/utils/convertDateFormat";
import { useRouter } from "next/navigation";
import { getCities } from "../_lib/getCities";
import { getSearchCities } from "../_lib/getSearchCities";
import type {
  DatePickerProps,
  NameInputProps,
  SearchResultsProps,
} from "./AddPlan.types";

const NameInput: React.FC<NameInputProps> = ({ onNextStep }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const handleNameInputChange = (e: any) => {
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
      <button onClick={handleNextStep}>다음</button>
    </div>
  );
};

const SearchResults: React.FC<SearchResultsProps> = ({
  onPreviousStep,
  onNextStep,
  onResultSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleResultClick = (result: any) => {
    onResultSelect(result);
  };
  const handleSearch = async () => {
    try {
      const results: any = await getSearchCities(searchTerm);
      setSearchResults(results.data.cities);
    } catch (error) {
      console.error("An error occurred during search:", error);
    }
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
        {searchResults.map((result: any) => (
          <li key={result.id} onClick={() => handleResultClick(result.id)}>
            {result.koreanName}
          </li>
        ))}
      </ul>
      <div className="flex justify-center gap-8">
        <Button onClick={onPreviousStep}>이전</Button>
      </div>
    </div>
  );
};

const DatePicker: React.FC<DatePickerProps> = ({
  planName,
  searchResults,
  selectedDate,
  onPreviousStep,
  onSelectDate,
  onSelectExpenses,
}) => {
  const [hashTags, setHashTags] = useState<string[]>([]); // Change the initialization to an empty array
  const router = useRouter();

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [fetchData, { loading, data, error, reset }] = useFetchComposed<any>(
    "/api/plan",
    "POST",
  );
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const words = inputValue.split(/\s+/);

    const hashtags = words
      .filter((word) => word.length >= 1 && word.length <= 5)
      .slice(0, 4);

    setHashTags(hashtags);
  };

  const handleNextStep = () => {
    onSelectDate(date);
    fetchData({
      title: planName,
      tags: hashTags,
      startDate: convertDateFormat(date?.from),
      endDate: convertDateFormat(date?.to),
      regionId: searchResults,
    });
    if (data) {
      router.push(`/detail-plan?planId=${data.data.planId}`);
    } else {
      console.log("Error: Data is undefined or does not contain planId.");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <Label>여행 기간은 어떻게 되시나요?</Label>
      <DateRangePicker date={date} setDate={setDate} />
      <Label>해쉬태그를 입력해주세요</Label>
      <Input type="text" onChange={handleInputChange} />
      <div className="flex gap-2">
        {hashTags.map((tag, index) => (
          <div key={index} className="bg-white p-1 rounded-lg">
            {tag}
          </div>
        ))}
      </div>
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
  const [expectedExpenses, setExpectedExpenses] = useState("");
  const progressValue = (step / 3) * 100;
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
    setSearchResults(selectedResult);
    setStep(step + 1);
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
                planName={name}
                searchResults={searchResults}
                selectedDate={selectedDate}
                onPreviousStep={handlePreviousStep}
                onSelectDate={(date: any) => setSelectedDate(date)}
                onSelectExpenses={(expenses: any) =>
                  setExpectedExpenses(expenses)
                }
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
