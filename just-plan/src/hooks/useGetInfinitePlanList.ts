import { getPlanList } from "@/app/(needLogin)/_lib/getPlanList";
import { planKeys } from "@/constants/queries";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetInfinitePlanList = (
  regionId: number,
  mbtiList: string[],
) => {
  const {
    data: planList,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
  } = useInfiniteQuery({
    queryKey: planKeys.mbtiFilter(regionId, mbtiList),
    queryFn: ({ pageParam }) => getPlanList(pageParam, 6, regionId, mbtiList),
    getNextPageParam: (lastPage) => {
      if (lastPage?.currentPage < lastPage?.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return { planList, fetchNextPage, hasNextPage, isFetching, refetch };
};
