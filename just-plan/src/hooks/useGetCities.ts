import { getCities } from "@/app/(needLogin)/_lib/getCities";
import { useQuery } from "@tanstack/react-query";

export const useGetCities = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return { data, error, isLoading };
};
