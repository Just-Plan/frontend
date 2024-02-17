import type { IReqBody } from "@/app/(needLogin)/_components/DetailPlaceModal/DetailPlaceModa.types";
import { postPlaceComment } from "@/app/(needLogin)/_components/DetailPlaceModal/_lib/postPlaceComment";
import { placeCommentKey } from "@/constants/queries";
import type { IPlaceComment } from "@/types/placeComment.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostPlaceComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: IReqBody) => postPlaceComment(body),
    onSuccess: (data: IPlaceComment, variables) => {
      // ['comment', placeId] 쿼리키에 대해 로컬에서 데이터 업데이트
      queryClient.setQueryData<IPlaceComment[]>(
        placeCommentKey.filter(variables.placeId),
        (temp) => {
          if (!temp) return temp;
          return [data, ...temp];
        },
      );
    },
    onError: () => {
      console.log("실패");
    },
  });
};
