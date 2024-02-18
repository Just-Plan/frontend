import { nextFetch } from "@/lib/returnFetch";
import type { IPlace } from "@/types/place.types";

export const postPlaceStored = async (planId: number, body: IPlace[]) => {
  const res = await nextFetch(`/api/place/planId/${planId}`, {
    method: "POST",
    body: JSON.stringify({ places: body }),
  });

  return res as unknown as IPlace[];
};
