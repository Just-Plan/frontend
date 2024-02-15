import { getSearchPlaceResult } from "@/app/(needLogin)/_components/AddPlaceModal/_lib/getSearchPlaceResult";
import { placeKeys } from "@/constants/queries";
import { useQuery } from "@tanstack/react-query";

export const useSearchPlace = (cityId: number, query: string) => {
  const {
    data: searchResultData,
    error,
    isLoading,
  } = useQuery({
    queryKey: [placeKeys.search(cityId, query)],
    queryFn: () => getSearchPlaceResult(cityId, query),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return {searchResultData, error, isLoading};
}