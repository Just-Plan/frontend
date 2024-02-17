import { nextFetch } from "@/lib/returnFetch";
import { IPlaceRequestBody } from "@/types/place.types";

export const patchPlaceInfo = async (
  planId: number,
  body: IPlaceRequestBody,
) => {
  const res = await nextFetch(`/api/place/update/planId/${planId}`, {
    method: "PATCH",
    // body: JSON.stringify({...newBody, dayUpdates: newDayUpdates})
    body: JSON.stringify(body),
  });
  // return res.json();
  return res;
};
