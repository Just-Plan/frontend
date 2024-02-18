import { postPlanScrap } from "@/components/PlanCard/_lib/postPlanScrap";
import type { IScrapRequstBody } from "@/types/plan.types";
import { useMutation } from "@tanstack/react-query";

export const usePostPlanScrap = () => {
  return useMutation({
    mutationFn: (body: IScrapRequstBody) => postPlanScrap(body),
    onSuccess: () => {
      alert("patch place info 성공");
    },
    onError: () => {
      alert("patch place info 실패");
    },
  });
};
