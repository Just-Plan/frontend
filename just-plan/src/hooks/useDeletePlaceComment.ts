import { deletePlaceComment } from "@/app/(needLogin)/_components/DetailPlaceModal/_lib/deletePlaceComment";
import { placeCommentKey } from "@/constants/queries";
import type { IPlaceComment } from "@/types/placeComment.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletePlaceComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      placeId,
      placeCommentId,
    }: {
      placeId: number;
      placeCommentId: number;
    }) => deletePlaceComment(placeId, placeCommentId),
    onSuccess: (_, variables) => {
      queryClient.setQueryData<IPlaceComment[]>(
        placeCommentKey.filter(variables.placeId),
        (prev) => {
          // 해당하는 id를 가지고 있는 comment 삭제
          if (!prev) return prev;
          return prev.filter(
            (item) => item.placeCommentId !== variables.placeCommentId,
          );
        },
      );
    },
    onError: () => {
      console.log("실패");
    },
  });
};
