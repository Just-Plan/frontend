import { patchPlaceInfo } from "@/app/(needLogin)/_components/PlanInfoHeader/_lib/patchPlaceInfo";
import { placeKeys } from "@/constants/queries";
import type {
  IPlaceRequestBody,
  IPlaceResponseBody,
} from "@/types/place.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePatchPlaceInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      planId,
      body,
    }: {
      planId: number;
      body: IPlaceRequestBody;
    }) => patchPlaceInfo(planId, body),
    onSuccess: (data, variables) => {
      alert("patch place info 성공");

      // 성공했으면 바로 반영되도록 수정!
      // ["places", "lists", ${planId}]
      queryClient.setQueryData<IPlaceResponseBody>(
        placeKeys.lists(variables.planId),
        (prev) => {
          if (!prev) return prev;
          return data;
        },
      );
    },
    onError: () => {
      alert("patch place info 실패");
    },
  });
};
