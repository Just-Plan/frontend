"use client";
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
import { Spinner } from "@/components/Spinner";
import { useEffect, useState } from "react";
import { fetchComposed } from "@/lib/returnFetch";
import { useForm } from "react-hook-form";
import Link from "next/link";
export const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authId, setAuthId] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onVerificationClick = () => {
    setIsLoading(true);
    const emailValue = watch("email");
    const requestBody = JSON.stringify({ email: emailValue });
    fetchComposed("/api/email-auth", {
      method: "POST",
      body: requestBody,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 2000) {
          setAuthId(data.data.auth_id);
        } else {
          console.log(`Verification failed with code ${data.code}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => setIsLoading(false));
  };
  const onSubmit = (data: any) => {
    const requestBody = JSON.stringify({
      email: data.email,
      name: data.name,
      password: data.password,
      authId: authId,
    });

    fetchComposed("/api/user/signup", {
      method: "POST",
      body: requestBody,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 2000) {
        } else {
          console.log(`Verification failed with code ${data.code}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <Card className="w-[350px] bg-ourGreen rounded-3xl ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader></CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">이름</Label>
              <Input id="email" placeholder="이름을 입력해주세요" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label variant={"subTitle"} htmlFor="email">
                이메일
              </Label>
              <div className="flex gap-3">
                <Input
                  id="email"
                  placeholder="이메일을 입력해주세요"
                  {...register("email", {
                    required: "이메일을 입력하세요",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "올바른 이메일 형식이 아닙니다",
                    },
                  })}
                />
                <Button type="button" size={"sm"} onClick={onVerificationClick}>
                  {isLoading ? <Spinner /> : "인증"}
                </Button>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">비밀번호</Label>
              <Input id="password" placeholder="비밀번호를 입력해주세요" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label variant={"subTitle"} htmlFor="passwordConfirm">
                비밀번호 확인
              </Label>
              <Input
                id="passwordConfirm"
                placeholder="비밀번호를 한번 더 입력해주세요"
                type="password"
                {...register("passwordConfirm", {
                  required: "비밀번호를 확인하세요",
                  validate: (value) =>
                    value === watch("password") ||
                    "비밀번호가 일치하지 않습니다",
                })}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-5 flex-col">
          <div className="w-full">
            <Button size={"lg"} className="w-full">
              회원가입하기
            </Button>
            <div className="flex justify-center ">
              <Link href={"/signin"}>
                <Button
                  type="button"
                  variant={"link"}
                  className="text-slate-500"
                >
                  로그인
                </Button>
              </Link>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size={"lg"}
            className="w-full gap-1"
          >
            <Image
              src={"/images/KakaoLogo.png"}
              alt={""}
              width={25}
              height={25}
            />
            카카오 로그인
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
