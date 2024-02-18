import { nextFetch } from "@/lib/returnFetch";
import type { IPlaceResponse } from "@/types/place.types";

export const getPlaceInfo = async (planId: number) => {
  const res = await nextFetch(`/api/place/planId/${planId}`);

  return res as unknown as IPlaceResponse;
};
