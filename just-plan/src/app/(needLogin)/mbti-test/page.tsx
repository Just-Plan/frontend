"use client";
import { Card, CardHeader, CardTitle } from "@/components/Card";
import { Progress } from "@/components/progress";
import { MbtiSelectSection } from "./components";
import { useAtomValue } from "jotai";
import { mbtiStepAtom } from "@/store/mbti-test.atoms";
import { fake_mock } from "@/mocks";
import { useEffect, useState } from "react";
import {
  TravelData,
  TravelQuestion,
} from "./components/MbtiSelectSection/MbtiSelectSection.types";

const MBTIPage = () => {
  const mbtiStep = useAtomValue(mbtiStepAtom);
  const [questions, setQuestions] = useState<TravelQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  useEffect(() => {
    // 수정 필요
    fetch("http://13.125.188.226:8080/api/mbti/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const progressValue = (mbtiStep / questions.length) * 100;

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswers((prevAnswers) => [...prevAnswers, answer]);
  };
  return (
    <div className=" flex justify-center items-center">
      <div className="w-[80%] flex flex-col justify-center items-center">
        <Progress value={progressValue} className="mt-[5rem] w-[80%]" />
        <Card className="mt-[5rem] flex flex-col justify-center items-center min-w-80  bg-ourGreen">
          <CardHeader>
            <CardTitle className="text-[2rem]">당신의 여행 MBTI는?</CardTitle>
          </CardHeader>
          <MbtiSelectSection
            questions={questions}
            onSelectAnswer={handleSelectAnswer}
          />
        </Card>
      </div>
    </div>
  );
};

export default MBTIPage;
