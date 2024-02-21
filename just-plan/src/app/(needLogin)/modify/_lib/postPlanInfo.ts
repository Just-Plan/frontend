import { nextFetch } from "@/lib/returnFetch";
import type { IModifyPlanInfo } from "@/types/plan.types";
import { useMutation } from "@tanstack/react-query";

const patchPlanInfo = async (info: IModifyPlanInfo) => {
  const res = await nextFetch(`/api/plan`, {
    method: "PATCH",
    body: JSON.stringify({
      ...info,
    }),
  });

  return res;
};

export const usePatchPlanInfo = () => {
  return useMutation({
    mutationFn: (info: IModifyPlanInfo) => patchPlanInfo(info),
    onSuccess: () => {
      alert("성공");
    },
    onError: () => {
      alert("실패");
    },
  });
};
