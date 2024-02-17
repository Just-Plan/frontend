import { getSearchCity } from "@/app/(needLogin)/_lib/getSearchCity";
import { cityKeys } from "@/constants/queries";
import { useQuery } from "@tanstack/react-query";

export const useSearchRegion = (cityName: string) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: cityKeys.search(cityName),
    queryFn: () => getSearchCity(cityName),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: false,
  });
  return { data, error, isLoading, refetch };
};
