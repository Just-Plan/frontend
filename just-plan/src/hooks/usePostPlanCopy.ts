import { postPlanCopy } from "@/app/(needLogin)/_components/PlanInfoHeader/_lib/postPlanCopy";
import { useMutation } from "@tanstack/react-query";
import { usePostPlaceCopy } from "./usePostPlaceCopy";

export const usePostPlanCopy = (planId: number) => {
  const { mutate: placeCopyMutation } = usePostPlaceCopy();

  return useMutation({
    mutationFn: () => postPlanCopy(planId),
    onSuccess: (data) => {
      alert("post plan 성공");
      console.log("fetch 결과 출력", data);
      placeCopyMutation({ originPlanId: planId, newPlanId: data.planId });
      return data;
    },
    onError: () => {
      alert("post plan 실패");
    },
  });
};
