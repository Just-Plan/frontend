import { patchPlaceInfo } from "@/app/(needLogin)/_components/PlanInfoHeader/_lib/patchPlaceInfo";
import type { IPlaceRequestBody } from "@/types/place.types";
import { useMutation } from "@tanstack/react-query";

export const usePatchPlaceInfo = () => {
  return useMutation({
    mutationFn: ({
      planId,
      body,
    }: {
      planId: number;
      body: IPlaceRequestBody;
    }) => patchPlaceInfo(planId, body),
    onSuccess: () => {
      alert("patch place info 성공");
    },
    onError: () => {
      alert("patch place info 실패");
    },
  });
};
