import { nextFetch } from "@/lib/returnFetch";
import type { IPlaceComment } from "@/types/placeComment.types";

export const patchPlaceComment = async (
  placeId: number,
  placeCommentId: number,
  content: string,
) => {
  const res = await nextFetch(`/api/place/comment`, {
    method: "PATCH",
    body: JSON.stringify({ commentId: placeCommentId, content: content }),
  });

  return res as unknown as IPlaceComment;
};
