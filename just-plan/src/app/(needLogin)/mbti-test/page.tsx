"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Progress } from "@/components/ui/progress";
import { MbtiSelectSection } from "./components";
import { useAtomValue } from "jotai";
import { mbtiStepAtom } from "@/store/mbti-test.atoms";
import { fake_mock } from "@/mocks";

const MBTIPage = () => {
  const MbtiDataLength = fake_mock.length;
  const mbtiStep = useAtomValue(mbtiStepAtom);

  //MBTI를 알려주는 파이널 페이지일 경우 프로그래스바 100%되도록 연결해주시면 됩니다
  const progressValue = ((mbtiStep - 1) / MbtiDataLength) * 100;
  return (
    <div className=" flex justify-center items-center">
      <div className="w-[80%] flex flex-col justify-center items-center">
        <Progress value={progressValue} className="mt-[5rem] w-[80%]" />
        <Card className="mt-[5rem] flex flex-col justify-center items-center w-[50%]">
          <CardHeader>
            <CardTitle className="text-[2rem]">당신의 여행 MBTI는?</CardTitle>
          </CardHeader>
          <MbtiSelectSection />
        </Card>
      </div>
    </div>
  );
};

export default MBTIPage;
