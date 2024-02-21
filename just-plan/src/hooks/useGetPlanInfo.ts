import { getPlanInfo } from "@/app/(needLogin)/detail-plan/_lib/getPlanInfo";
import { planKeys } from "@/constants/queries";
import { useQuery } from "@tanstack/react-query";

export const useGetPlanInfo = (planId: string) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: planKeys.detail(planId),
    queryFn: () => getPlanInfo(planId),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return { data, error, isLoading, refetch };
};
