import { getPlanInfo } from "@/app/(needLogin)/detail-plan/_lib/getPlanInfo"
import { useQuery } from "@tanstack/react-query"

export const useGetPlanInfo = (planId: string) => {
  const {
    data,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["planInfo", planId],
    queryFn: () => getPlanInfo(planId),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  })

  return {data, error, isLoading}
}
