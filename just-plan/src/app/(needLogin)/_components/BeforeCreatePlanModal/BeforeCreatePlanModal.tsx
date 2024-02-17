"use client";

import { Button } from "@/components/Button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { useRouter } from "next/navigation";

const BeforeCreatePlanModal = () => {
  const router = useRouter();

  return (
    <DialogContent className="w-96 sm:w-[550px]" forceMount>
      <DialogHeader>
        <DialogTitle className="text-2xl mb-3">
          MBTI 테스트 결과가 존재하지 않습니다.
        </DialogTitle>
      </DialogHeader>
      <div className="flex flex-col items-center">
        <div>MBTI 테스트 후 일정 생성이 가능합니다.</div>
        <div>MBTI 테스트하러 이동하시겠습니까?</div>
      </div>
      <DialogFooter className="m-auto">
        <DialogClose asChild>
          <Button type="submit" variant={"secondary"}>
            취소
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="submit" onClick={() => router.push(`/mbti-test`)}>
            이동
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default BeforeCreatePlanModal;
