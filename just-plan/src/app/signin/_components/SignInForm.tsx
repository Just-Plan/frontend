"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/Card";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { fetchComposed } from "@/lib/returnFetch";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { localStorageUserInfoAtom } from "@/store/auth.atom";
import type { UserInfo } from "@/store/auth.atom.type";
import { useQueryClient } from "@tanstack/react-query";
interface FormData {
  email: string;
  password: string;
}
export const SignInForm = () => {
  const [userInfo, setUserInfo] = useAtom(localStorageUserInfoAtom);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  userInfo.isLoggedIn && router.push("/");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    const requestBody = JSON.stringify(data);

    fetchComposed("/api/user/signin", {
      method: "POST",
      body: requestBody,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.code === 2000) {
          console.log("Sign-in successful");
          console.log(result.data.accessToken);
          localStorage.setItem("access-token", result.data.accessToken);
          const userInfo: UserInfo = {
            email: data.email,
            id: result.data.id,
            name: result.data.name,
            isLoggedIn: true,
            mbtiName: result.data.mbtiName,
            profile: result.data.profile,
            introduction: result.data.introduction,
          };
          setUserInfo(userInfo);
          // 로그인 성공 후 모든 쿼리 무효화
          queryClient.invalidateQueries();
          router.push("/");
        } else {
          setErrorMessage(result.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const kakaoLogin = () => {
    router.push("/api/kakao/login");
  };
  return (
    <Card className="w-[350px] bg-ourGreen rounded-3xl ">
      <CardHeader></CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label variant={"subTitle"} htmlFor="email">
                이메일
              </Label>
              <Input
                id="email"
                placeholder="이메일을 입력해주세요"
                {...register("email", {
                  required: "이메일을 입력하세요",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "유효한 이메일 주소를 입력하세요",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
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
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-5 flex-col">
          <div className="w-full">
            <Button size={"lg"} className="w-full" type="submit">
              로그인하기
            </Button>
            <div className="flex justify-center">
              <Button
                type="button"
                variant={"link"}
                className="text-slate-500"
                onClick={() => router.push("/signup")}
              >
                회원가입
              </Button>
              <Button type="button" variant={"link"} className="text-slate-500">
                비밀번호 찾기
              </Button>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size={"lg"}
            className="w-full gap-1"
            onClick={kakaoLogin}
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
