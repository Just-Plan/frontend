import { getPlaceInfo } from "@/app/(needLogin)/detail-plan/_lib/getPlaceInfo"
import { placeKeys } from "@/constants/queries"
import { useQuery } from "@tanstack/react-query"

export const useGetPlaceInfo = (planId: string) => {
  const {
    data, error, isLoading
  } = useQuery({
    queryKey: placeKeys.lists(Number(planId)),
    queryFn: () => getPlaceInfo(Number(planId)),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  })

  return {data, error, isLoading};
}