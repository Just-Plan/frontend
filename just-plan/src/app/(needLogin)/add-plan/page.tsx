"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Progress } from "@/components/progress";
import { useState, useEffect } from "react";
import { NameInput } from "./_components/NameInput/NameInput";
import { SearchResults } from "./_components/SearchResults/SearchResults";
import { DatePicker } from "./_components/DatePicker/DatePicker";
import type { IRegion } from "@/types/plan.types";

const Page = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [searchResults, setSearchResults] = useState<IRegion>({
    id: 0,
    koreanName: "",
    englishName: "",
    introduction: "",
    countryKoreanName: "",
    countryEnglishName: "",
    latitude: "",
    longitude: "",
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [expectedExpenses, setExpectedExpenses] = useState("");
  const progressValue = (step / 3) * 100;

  const handleNextStep = (data: string) => {
    if (step === 1) {
      setName(data);
    } else if (step === 2) {
    }
    setStep(step + 1);
  };
  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    setStep(step + 1);
  }, [searchResults, step]);

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
                onResultSelect={setSearchResults}
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
