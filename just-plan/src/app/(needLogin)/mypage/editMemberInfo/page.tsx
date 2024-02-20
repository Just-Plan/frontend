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
// import { usePatchEditInfo } from "@/hooks/usePatchEditInfo";
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

const Page = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const userInfo = useAtomValue(localStorageUserInfoAtom);
  const [modifyInfo, setModifyInfo] = useState({
    name: "",
    mbtiName: "",
  });

  useEffect(() => {
    setModifyInfo({
      name: userInfo.name,
      mbtiName: userInfo.mbtiName,
    });
  }, [userInfo]);

  const onChangeInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModifyInfo({
      ...modifyInfo,
      [name]: value,
    });
  };

  // const { mutate } = usePatchEditInfo();

  const onSubmit = () => {
    // 수정 필요!
    // mutate({ name: modifyInfo.name, mbtiName: value });
  };

  return (
    <div className="flex flex-col w-full">
      <MypageHeader choose="회원 정보 수정" />
      <div className="flex flex-col justify-center items-center gap-5 px-5">
        <div className="w-full flex flex-col gap-5">
          <Label>내 정보 수정하기</Label>
          <div className="w-1/2 flex items-center ">
            <Label className="w-1/2">이름</Label>
            <Input
              id="name"
              name="name"
              value={modifyInfo.name}
              onChange={onChangeInfo}
            />
          </div>
          <div className="w-1/2 flex items-center ">
            <Label className="w-1/2">나의 MBTI</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {value
                    ? MBTIList.find((MBTI) => MBTI.value === value)?.label
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
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === MBTI.value ? "opacity-100" : "opacity-0",
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
          <Button className="w-fit" size={"lg"} onClick={onSubmit}>
            수정사항 저장
          </Button>
        </div>
        <div className="w-full flex flex-col gap-5">
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
        </div>
      </div>
    </div>
  );
};

export default Page;
