import { planKeys } from "@/constants/queries";
import { nextFetch } from "@/lib/returnFetch";
import type { IModifyPlanInfo } from "@/types/plan.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const patchPlanInfo = async (info: IModifyPlanInfo) => {
  const res = await nextFetch(`/api/plan`, {
    method: "PATCH",
    body: JSON.stringify({
      ...info,
    }),
  });

  return res as IModifyPlanInfo;
};

export const usePatchPlanInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (info: IModifyPlanInfo) => patchPlanInfo(info),
    onSuccess: (data, variables) => {
      alert("성공");
      // 데이터 업데이트
      console.log("data:", data, "variables:", variables);
      console.log(
        "planId:",
        variables.planId,
        "queryKey:",
        planKeys.detail(variables.planId),
      );
      queryClient.setQueryData<IModifyPlanInfo>(
        planKeys.detail(variables.planId),
        (prev) => {
          if (!prev) return prev;
          return { ...data };
        },
      );
    },
    onError: () => {
      alert("실패");
    },
  });
};
