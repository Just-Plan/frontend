import { patchPlaceComment } from "@/app/(needLogin)/_components/DetailPlaceModal/_lib/patchPlaceComment";
import { placeCommentKey } from "@/constants/queries";
import type { IPlaceComment } from "@/types/placeComment.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePatchPlaceComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      placeId,
      placeCommentId,
      content,
    }: {
      placeId: number;
      placeCommentId: number;
      content: string;
    }) => patchPlaceComment(placeId, placeCommentId, content),
    onSuccess: (data, variables) => {
      queryClient.setQueryData<IPlaceComment[]>(
        placeCommentKey.filter(variables.placeId),
        (prev) => {
          // 해당하는 id를 가지고 있는 comment 교체
          if (!prev) return prev;
          return prev.map((comment) =>
            comment.placeCommentId !== variables.placeCommentId
              ? comment
              : data,
          );
        },
      );
    },
    onError: () => {
      console.log("실패");
    },
  });
};
