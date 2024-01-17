"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Spinner } from "@/components/ui/Spinner";
import { useState } from "react";
export const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Card className="w-[350px] bg-ourGreen rounded-3xl ">
      <CardHeader></CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">이름</Label>
              <Input id="email" placeholder="이름을 입력해주세요" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">이메일</Label>
              <div className="flex gap-3">
                <Input id="email" placeholder="이메일을 입력해주세요" />
                <Button size={"sm"}>{isLoading ? <Spinner /> : "인증"}</Button>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">비밀번호</Label>
              <Input id="password" placeholder="비밀번호를 입력해주세요" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
              <Input
                id="passwordConfirm"
                placeholder="비밀번호를 한번 더 입력해주세요"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center gap-5 flex-col">
        <div className="w-full">
          <Button size={"lg"} className="w-full">
            회원가입하기
          </Button>
          <div className="flex justify-center ">
            <Button variant={"link"} className="text-slate-500">
              로그인
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
