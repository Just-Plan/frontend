import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/Card";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import Image from "next/image";
export const SignInForm = () => {
  return (
    <Card className="w-[350px] bg-ourGreen rounded-3xl ">
      <CardHeader></CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" placeholder="이메일을 입력해주세요" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">비밀번호</Label>
              <Input id="password" placeholder="비밀번호를 입력해주세요" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center gap-5 flex-col">
        <div className="w-full">
          <Button size={"lg"} className="w-full">
            로그인하기
          </Button>
          <div className="flex justify-center ">
            <Button variant={"link"} className="text-slate-500">
              회원가입
            </Button>
            <Button variant={"link"} className="text-slate-500">
              비밀번호 찾기
            </Button>
          </div>
        </div>
        <Button variant="outline" size={"lg"} className="w-full gap-1">
          <Image
            src={"/images/KakaoLogo.png"}
            alt={""}
            width={25}
            height={25}
          />
          카카오 로그인
        </Button>
      </CardFooter>
    </Card>
  );
};
