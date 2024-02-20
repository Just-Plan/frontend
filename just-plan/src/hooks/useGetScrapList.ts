import { getScrapList } from "@/app/(needLogin)/mypage/_lib/getScrapList";
import { planKeys } from "@/constants/queries";
import { useQuery } from "@tanstack/react-query";

export const useGetScrapList = (pageParam: string | undefined) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: planKeys.scrap(Number(pageParam)),
    queryFn: () => getScrapList(pageParam, 6),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return { data, error, isLoading, refetch };
};
