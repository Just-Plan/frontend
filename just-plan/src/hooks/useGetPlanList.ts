import { getPlanList } from "@/app/(needLogin)/_lib/getPlanList";
import { useQuery } from "@tanstack/react-query";

export const useGetPlanList = (regionId: number) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["planList", 3],
    queryFn: () => getPlanList(0, 3, regionId),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return { data, error, isLoading, refetch };
};
