import { getMyPage } from "@/app/(needLogin)/mypage/_lib/getMyPage"
import { planKeys } from "@/constants/queries"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useGetMyPage = () => {
  // const {data, error, isLoading} =  useQuery({
  //   queryKey: planKeys.myPlan(),
  //   queryFn: getMyPage,
  //   staleTime: 60 * 1000,
  //   gcTime: 300 * 1000,
  // })

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["infinitePlan"],
    queryFn: ({ pageParam = 0 }) => getMyPage(pageParam, 6),
    getNextPageParam: (lastPage, allPages) => {
      console.log('allPages.length', allPages.length)
      const nextPage = allPages.length + 1;
      return lastPage?.data.count === 0 || lastPage?.data.count < 6 ? undefined : nextPage;

    },
    initialPageParam: 0,
    retry: 0,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  console.log('hasNextpage', hasNextPage)

  return {data, fetchNextPage, hasNextPage, isFetching};
}