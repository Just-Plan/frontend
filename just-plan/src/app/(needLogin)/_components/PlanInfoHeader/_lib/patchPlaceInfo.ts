import { nextFetch } from "@/lib/returnFetch";
import type { IPlaceRequestBody } from "@/types/place.types";

export const patchPlaceInfo = async (
  planId: number,
  body: IPlaceRequestBody,
) => {
  const res = await nextFetch(`/api/place/update/planId/${planId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
  return res;
};
