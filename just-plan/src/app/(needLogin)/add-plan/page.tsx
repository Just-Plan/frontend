"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Progress } from "@/components/progress";
import { useState, useEffect } from "react";
import { NameInput } from "./_components/NameInput/NameInput";
import { SearchResults } from "./_components/SearchResults/SearchResults";
import { DatePicker } from "./_components/DatePicker/DatePicker";
import type { IRegion } from "@/types/plan.types";
import type { DateRange } from "react-day-picker";
import { usePostCreatePlan } from "@/hooks/usePostCreatePlan";
import { convertDateFormat } from "@/utils/convertDateFormat";
import { HashTag } from "./_components/HashTag/HashTag";

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
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(
    undefined,
  );
  const [addHashTags, setAddHashTags] = useState<string[]>([]);
  const progressValue = (step / 4) * 100;

  const handleNextStep = (data?: string) => {
    if (step === 1) {
      setName(data!);
    } else if (step === 2) {
    }
    setStep(step + 1);
  };
  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    if (searchResults.id !== 0) {
      handleNextStep();
    }
  }, [searchResults]);

  const { mutate } = usePostCreatePlan();

  const onCreatePlan = () => {
    mutate({
      title: name,
      tags: addHashTags,
      startDate: convertDateFormat(selectedDate?.from)!,
      endDate: convertDateFormat(selectedDate?.to)!,
      regionId: searchResults.id,
    });
  };

  return (
    <div className=" flex justify-center items-center">
      <div className=" flex flex-col justify-center items-center">
        <Progress value={progressValue} className="mt-[5rem]" />
        <Card className="mt-[5rem] flex flex-col justify-center items-center w-80 sm:w-[60rem] bg-ourGreen py-10">
          <CardHeader className="p-0 pb-2">
            <CardTitle className="text-[2rem]">여행 플랜 생성</CardTitle>
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
                onSelectDate={(date) => setSelectedDate(date)}
                onPreviousStep={handlePreviousStep}
                onNextStep={handleNextStep}
                onCreatePlan={onCreatePlan}
              />
            )}
            {step === 4 && (
              <HashTag
                onPreviousStep={handlePreviousStep}
                onNextStep={onCreatePlan}
                addHashTags={addHashTags}
                setAddHashTags={setAddHashTags}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
