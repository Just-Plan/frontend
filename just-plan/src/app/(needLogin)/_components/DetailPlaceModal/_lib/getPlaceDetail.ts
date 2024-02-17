import { nextFetch } from "@/lib/returnFetch";
import type { IPlaceDetailResponse } from "@/types/place.types";

interface ITemp {
  result: IPlaceDetailResponse;
}
export const getPlaceDetail = async (
  name: string,
  latitude: string,
  longitude: string,
) => {
  const res = await nextFetch(
    `/api/place/detail?name=${name}&latitude=${latitude}&longitude=${longitude}`,
  );

  return res as unknown as ITemp;
};
