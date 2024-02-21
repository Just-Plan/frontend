import type { ICreatePlanReqBody } from "@/app/(needLogin)/add-plan/AddPlan.types";
import { postCreatePlan } from "@/app/(needLogin)/add-plan/_lib/postCreatePlan";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const usePostCreatePlan = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (body: ICreatePlanReqBody) => postCreatePlan(body),
    onSuccess: (data) => {
      router.push(`/modify?planId=${data.planId}`);
    },
    onError: () => {
      console.log("실패");
    },
  });
};
