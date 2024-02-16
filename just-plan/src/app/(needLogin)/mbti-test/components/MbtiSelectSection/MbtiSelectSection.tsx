import { Button } from "@/components/ui/Button";
import { CardContent, CardFooter } from "@/components/ui/Card";
import Image from "next/image";
import { useAtom } from "jotai";
import { mbtiStepAtom } from "@/store/mbti-test.atoms";
import fake_mbtitest from "/public/images/mbti_title_image.png";
import { fake_mock } from "@/mocks";

export const MbtiSelectSection = () => {
  const [mbtiStep, setMbtiStep] = useAtom(mbtiStepAtom);

  const handleNextMbtiStep = () => {
    setMbtiStep((prev) => (prev < fake_mock.length ? prev + 1 : prev));
  };
  const currentStepIndex = mbtiStep - 1;

  return (
    <div>
      <CardContent className="flex flex-col justify-center items-center">
        <Image
          src={fake_mbtitest}
          width={150}
          height={150}
          alt="mbti_image_임시"
        />
        <div className="mt-[2rem] text-[1.5rem]">
          Q: {fake_mock[currentStepIndex].title}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button
          onClick={handleNextMbtiStep}
          variant="secondary"
          className="text-[1.3rem] w-[20rem] h-[3rem] hover:bg-white"
        >
          {fake_mock[currentStepIndex].answer_1}
        </Button>
        <Button
          onClick={handleNextMbtiStep}
          variant="secondary"
          className="mt-5 text-[1.3rem] w-[20rem] h-[3rem] hover:bg-white"
        >
          {fake_mock[currentStepIndex].answer_2}
        </Button>
      </CardFooter>
    </div>
  );
};
