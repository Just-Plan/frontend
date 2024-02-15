import { getPlanList } from "@/app/(needLogin)/_lib/getPlanList";
import { useQuery } from "@tanstack/react-query";

export const useGetPlanList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["planList", 3],
    queryFn: () => getPlanList(0, 3),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return { data, error, isLoading };
};
