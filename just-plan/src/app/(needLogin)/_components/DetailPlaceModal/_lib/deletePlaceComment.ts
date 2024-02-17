import { nextFetch } from "@/lib/returnFetch";

export const deletePlaceComment = async (
  placeId: number,
  placeCommentId: number,
) => {
  const res = await nextFetch(`/api/place/comment/${placeCommentId}`, {
    method: "DELETE",
  });

  return res as unknown as null;
};
