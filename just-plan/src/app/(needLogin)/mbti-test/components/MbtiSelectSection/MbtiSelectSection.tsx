import { Button } from "@/components/Button";
import { CardContent, CardFooter } from "@/components/Card";
import Image from "next/image";

import fake_mbtitest from "/public/images/mbti_title_image.png";

import type { TravelQuestion } from "./MbtiSelectSection.types";
import { useState } from "react";

export const MbtiSelectSection = ({
  questions,
  onSelectAnswer,
  setMbtiStep,
}: {
  questions: TravelQuestion[];
  onSelectAnswer: (answer: number) => void;
  setMbtiStep: () => void;
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const handleNextMbtiStep = () => {
    setMbtiStep();
    setCurrentStepIndex((prevIndex) => prevIndex + 1);
  };

  const selectAnswer = (answer: number) => {
    onSelectAnswer(answer);
    handleNextMbtiStep();
  };
  return (
    <div>
      <div>
        <CardContent className="flex flex-col justify-center items-center">
          <Image
            src={fake_mbtitest}
            width={150}
            height={150}
            alt="mbti_image_임시"
          />
          <div className="mt-[2rem] text-[1.5rem]">
            Q: {questions[currentStepIndex]?.question}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            onClick={() =>
              selectAnswer(questions[currentStepIndex]?.answers[0]?.answerId)
            }
            variant="secondary"
            className="text-[1.3rem] w-80 h-auto hover:bg-white text-wrap"
          >
            {questions[currentStepIndex]?.answers[0]?.answer}
          </Button>
          <Button
            onClick={() =>
              selectAnswer(questions[currentStepIndex]?.answers[1]?.answerId)
            }
            variant="secondary"
            className="mt-5 text-[1.3rem] w-80  h-auto hover:bg-white text-wrap"
          >
            {questions[currentStepIndex]?.answers[1]?.answer}
          </Button>
        </CardFooter>
      </div>
    </div>
  );
};
