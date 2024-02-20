"use client";

import { Label } from "@radix-ui/react-label";
import MypageHeader from "../_components/MypageHeader.tsx/MypageHeader";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { localStorageUserInfoAtom } from "@/store/auth.atom";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { usePatchEditInfo } from "@/hooks/usePatchEditInfo";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MBTIList } from "@/constants";
import { Textarea } from "@/components/ui/textarea";

const Page = () => {
  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState("");
  const userInfo = useAtomValue(localStorageUserInfoAtom);
  const [modifyInfo, setModifyInfo] = useState({
    name: "",
    mbtiName: "",
    introduction: "",
  });

  useEffect(() => {
    setModifyInfo({
      name: userInfo.name,
      mbtiName: userInfo.mbtiName,
      introduction: userInfo.introduction || "",
    });
  }, [userInfo]);

  const onChangeInfo = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setModifyInfo({
      ...modifyInfo,
      [name]: value,
    });
  };

  const { mutate } = usePatchEditInfo();

  const onSubmit = () => {
    mutate({
      name: modifyInfo.name,
      mbtiName: modifyInfo.mbtiName,
      introduction: modifyInfo.introduction,
    });
  };

  // 만약 회원 정보 수정 페이지라면, 프로필 사진, 배경 사진 수정 가능하도록!

  return (
    <div className="flex flex-col w-full">
      <MypageHeader choose="회원 정보 수정" />
      <div className="flex flex-col justify-center items-center gap-5 px-5">
        <div className="w-full flex flex-col gap-10 justify-center items-center">
          <div className="text-3xl font-bold">내 정보 수정하기</div>
          <div className="flex gap-32">
            {/* <div className="flex flex-col w-2/3 bg-blue-200 items-center"> */}
            <div className="flex flex-col gap-5">
              <div className="w-96 flex items-center">
                <Label className="w-32 font-semibold text-gray-700">이름</Label>
                <Input
                  id="name"
                  name="name"
                  value={modifyInfo.name}
                  onChange={onChangeInfo}
                />
              </div>
              <div className="w-96 flex items-center ">
                <Label className=" w-32 font-semibold text-gray-700">
                  나의 MBTI
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {modifyInfo.mbtiName
                        ? MBTIList.find(
                            (MBTI) => MBTI.value === modifyInfo.mbtiName,
                          )?.label
                        : "MBTI를 선택해주세요"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search MBTI..." />
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {MBTIList.map((MBTI) => (
                          <CommandItem
                            key={MBTI.value}
                            value={MBTI.value}
                            onSelect={(currentValue) => {
                              // setValue(
                              //   currentValue === value ? "" : currentValue,
                              // );
                              setModifyInfo({
                                ...modifyInfo,
                                mbtiName:
                                  currentValue === modifyInfo.mbtiName
                                    ? ""
                                    : currentValue,
                              });
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                modifyInfo.mbtiName === MBTI.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {MBTI.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex flex-col w-96 gap-1">
              <Label htmlFor="message" className=" font-semibold text-gray-700">
                소개글 수정
              </Label>
              <Textarea
                placeholder="아직 소개글이 없습니다. 소개글을 입력해보세요!"
                id="message"
                name="introduction"
                onChange={onChangeInfo}
                value={modifyInfo.introduction}
              />
            </div>
          </div>
          <Button className="w-fit" size={"lg"} onClick={onSubmit}>
            수정사항 저장
          </Button>
        </div>
        {/* <div className="w-full flex flex-col gap-5">
          <Label>비밀번호 수정하기</Label>
          <Button
            className={cn(
              "rounded-3xl py-5 w-fit bg-ourGreen hover:bg-ourGreen",
            )}
            size={"sm"}
            variant={"secondary"}
          >
            이메일 인증 후 비밀번호 변경
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default Page;
