import { getPlaceDetail } from "@/app/(needLogin)/_components/DetailPlaceModal/_lib/getPlaceDetail";
import { placeKeys } from "@/constants/queries";
import { useQuery } from "@tanstack/react-query";

export const useGetPlaceDetail = (
  name: string,
  latitude: string,
  longitude: string,
) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: placeKeys.detail(name, latitude, longitude),
    queryFn: () => getPlaceDetail(name, latitude, longitude),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: false,
  });

  const resultData = data?.result;

  return { resultData, error, isLoading, refetch };
};
