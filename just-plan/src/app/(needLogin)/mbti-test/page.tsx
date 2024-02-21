"use client";
import { Card, CardHeader, CardTitle } from "@/components/Card";
import { Progress } from "@/components/progress";
import { MbtiSelectSection } from "./components";

import { useEffect, useState } from "react";
import type { TravelQuestion } from "./components/MbtiSelectSection/MbtiSelectSection.types";
import MbtiResult from "./components/MbtiResult";

import { usePostMbtiResult } from "@/hooks/usePostMbtiResult";
import { useGetMbtiQuestions } from "@/hooks/useGetMbtiQuestions";
import { Spinner } from "@/components/Spinner";

const MBTIPage = () => {
  const [mbtiStep, setMbtiStep] = useState(0);
  const [questions, setQuestions] = useState<TravelQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const { data: mbtiData, error, isLoading } = useGetMbtiQuestions();

  useEffect(() => {
    // 수정 필요
    // nextFetch("api/mbti/questions")
    //   .then((data) => setQuestions(data))
    //   .catch((error) => console.error("Error fetching data:", error));
    if (mbtiData) {
      setQuestions(mbtiData);
    }
  }, [mbtiData]);

  const progressValue = (mbtiStep / questions.length) * 100;

  const handleSelectAnswer = (answer: number) => {
    setSelectedAnswers((prevAnswers) => [...prevAnswers, answer]);
  };

  const { data, mutate } = usePostMbtiResult(selectedAnswers);
  useEffect(() => {
    if (progressValue === 100) {
      mutate();
    }
  }, [progressValue, mutate]);

  const handleResetMbtiStep = () => {
    setMbtiStep(0);
  };

  if (error) return <div>에러</div>;

  return (
    <div className=" flex justify-center items-center">
      <div className="w-[80%] flex flex-col justify-center items-center pb-8">
        <Progress value={progressValue} className="mt-[5rem] w-96 " />
        <Card className="mt-[2rem] flex flex-col justify-center items-center w-96 pb-10  bg-ourGreen">
          <CardHeader>
            <CardTitle className="text-[2rem]">당신의 여행 MBTI는?</CardTitle>
          </CardHeader>
          {progressValue === 100 ? (
            <div>
              <MbtiResult mbti={data?.data} reset={handleResetMbtiStep} />
            </div>
          ) : (
            <MbtiSelectSection
              questions={questions}
              onSelectAnswer={handleSelectAnswer}
              setMbtiStep={() => setMbtiStep((prevStep) => prevStep + 1)}
            />
          )}
        </Card>
      </div>
      {isLoading && (
        <div className="fixed bottom-4 right-4 bg-gray-500 rounded-lg p-4">
          <Spinner className="w-8 h-8" />
        </div>
      )}
    </div>
  );
};

export default MBTIPage;
