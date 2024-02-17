import { nextFetch } from "@/lib/returnFetch";
import type { IPlaceComment } from "@/types/placeComment.types";

export const getPlaceComment = async (placeId: number) => {
  const res = await nextFetch(`/api/place/comment/${placeId}`);

  return res as unknown as IPlaceComment[];
};
