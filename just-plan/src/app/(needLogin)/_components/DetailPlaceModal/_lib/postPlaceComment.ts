import { nextFetch } from "@/lib/returnFetch";
import type { IReqBody } from "../DetailPlaceModa.types";
import type { IPlaceComment } from "@/types/placeComment.types";

export const postPlaceComment = async (body: IReqBody) => {
  const res = await nextFetch(`/api/place/comment`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  return res as unknown as IPlaceComment;
};
