import { postPlaceStored } from "@/app/(needLogin)/_components/AddPlaceModal/_lib/postPlaceStored";
import { placeKeys } from "@/constants/queries";
import type { IPlace, IPlaceResponse } from "@/types/place.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostPlaceStored = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ planId, body }: { planId: number; body: IPlace[] }) =>
      postPlaceStored(planId, body),
    onSuccess: (data, variables) => {
      alert("post place info 성공");
      // [places, lists, ${planId}] 에서 daysPlanes[0] 에 추가하기
      queryClient.setQueryData<IPlaceResponse>(
        placeKeys.lists(variables.planId),
        (prev) => {
          if (!prev) return prev;
          const newDaysPlaces = {
            ...prev.daysPlaces,
            "0": [...prev.daysPlaces[0], ...data],
          };
          return {
            ...prev,
            daysPlaces: newDaysPlaces,
          };
        },
      );
    },
    onError: () => {
      alert("post place info 실패");
    },
  });
};
