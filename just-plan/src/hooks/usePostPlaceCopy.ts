import { postPlaceCopy } from "@/app/(needLogin)/_components/PlanInfoHeader/_lib/postPlaceCopy";
import { postPlanCopy } from "@/app/(needLogin)/_components/PlanInfoHeader/_lib/postPlanCopy";
import { useMutation } from "@tanstack/react-query";

export const usePostPlaceCopy = () => {
  return useMutation({
    mutationFn: ({
      originPlanId,
      newPlanId,
    }: {
      originPlanId: number;
      newPlanId: number;
    }) => postPlaceCopy(originPlanId, newPlanId),
    onSuccess: () => {
      alert("post place info 성공");
    },
    onError: () => {
      alert("post place info 실패");
    },
  });
};
