"use client";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/Card";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import Image from "next/image";
import { Spinner } from "@/components/Spinner";
import { useState } from "react";
import { fetchComposed } from "@/lib/returnFetch";
import { useForm } from "react-hook-form";
import Link from "next/link";
export const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authId, setAuthId] = useState("");
  const { register, handleSubmit, watch } = useForm();
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
          console.log(data);
          setAuthId(data.data.auth_id);
        } else {
          // 다른 상황에 대한 처리를 여기에 추가하세요.
          console.log(`Verification failed with code ${data.code}`);
          // 다른 동작을 추가하세요.
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => setIsLoading(false));
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    // 나중에 any 변경 필요
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
              <Label variant={"subTitle"} htmlFor="name">
                이름
              </Label>
              <Input
                id="name"
                placeholder="이름을 입력해주세요"
                {...register("name")}
              />
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
              <Label variant={"subTitle"} htmlFor="password">
                비밀번호
              </Label>
              <Input
                id="password"
                placeholder="비밀번호를 입력해주세요"
                type="password"
                {...register("password", {
                  required: "비밀번호를 입력하세요",
                  minLength: {
                    value: 8,
                    message: "비밀번호는 최소 8자 이상이어야 합니다",
                  },
                  pattern: {
                    value: /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                    message:
                      "비밀번호는 최소 8자 이상이어야 하며, 특수 문자를 포함해야 합니다",
                  },
                })}
              />
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
