"use client";
import { Card, CardHeader, CardTitle } from "@/components/Card";
import { Progress } from "@/components/progress";
import { MbtiSelectSection } from "./components";

import { useEffect, useState } from "react";
import type { TravelQuestion } from "./components/MbtiSelectSection/MbtiSelectSection.types";
import MbtiResult from "./components/MbtiResult";

import { usePostMbtiResult } from "@/hooks/usePostMbtiResult";
import { nextFetch } from "@/lib/returnFetch";

const MBTIPage = () => {
  const [mbtiStep, setMbtiStep] = useState(0);
  const [questions, setQuestions] = useState<TravelQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  useEffect(() => {
    // 수정 필요
    nextFetch("api/mbti/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  console.log(mbtiStep);
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
  return (
    <div className=" flex justify-center items-center">
      <div className="w-[80%] flex flex-col justify-center items-center pb-8">
        <Progress value={progressValue} className="mt-[5rem] w-[80%]" />
        <Card className="mt-[5rem] flex flex-col justify-center items-center min-w-80 pb-10  bg-ourGreen">
          <CardHeader>
            <CardTitle className="text-[2rem]">당신의 여행 MBTI는?</CardTitle>
          </CardHeader>
          {progressValue === 100 ? (
            <div>
              <MbtiResult mbti={data?.data} />
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
    </div>
  );
};

export default MBTIPage;
