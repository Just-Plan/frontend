import { Button } from "@/components/Button";
import { CardContent, CardFooter } from "@/components/Card";
import Image from "next/image";
import { useAtom } from "jotai";
import { mbtiStepAtom } from "@/store/mbti-test.atoms";
import fake_mbtitest from "/public/images/mbti_title_image.png";

import { TravelData, TravelQuestion } from "./MbtiSelectSection.types";

export const MbtiSelectSection = ({
  questions,
  onSelectAnswer,
}: {
  questions: TravelQuestion[];
  onSelectAnswer: (answer: string) => void;
}) => {
  const [mbtiStep, setMbtiStep] = useAtom(mbtiStepAtom);

  const handleNextMbtiStep = () => {
    setMbtiStep((prev) => (prev < questions.length ? prev + 1 : prev));
  };
  const currentStepIndex = mbtiStep;

  const selectAnswer = (answer: string) => {
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
              selectAnswer(questions[currentStepIndex]?.answers[0]?.answer)
            }
            variant="secondary"
            className="text-[1.3rem] w-80 h-auto hover:bg-white text-wrap"
          >
            {questions[currentStepIndex]?.answers[0]?.answer}
          </Button>
          <Button
            onClick={() =>
              selectAnswer(questions[currentStepIndex]?.answers[1]?.answer)
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
