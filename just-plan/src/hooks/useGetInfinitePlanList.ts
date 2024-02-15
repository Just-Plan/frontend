import { getPlanList } from "@/app/(needLogin)/_lib/getPlanList";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetInfinitePlanList = () => {
  const {
    data: planList,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["infinitePlan"],
    queryFn: ({ pageParam }) => getPlanList(pageParam, 6),
    getNextPageParam: (lastPage) => {
      if (lastPage?.currentPage < lastPage?.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
  });

  return { planList, fetchNextPage, hasNextPage, isFetching };
};
