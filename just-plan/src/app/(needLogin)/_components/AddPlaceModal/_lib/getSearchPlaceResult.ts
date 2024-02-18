import { nextFetch } from "@/lib/returnFetch";
import type { IPlace } from "@/types/place.types";

export const getSearchPlaceResult = async (cityId: number, query: string) => {
  const res = await nextFetch(
    `/api/search/place/cityId/${cityId}?query=${query}`,
  );

  return res as unknown as IPlace[];
};
