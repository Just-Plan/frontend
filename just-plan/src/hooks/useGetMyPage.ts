import { getMyPage } from "@/app/(needLogin)/mypage/_lib/getMyPage"
import { planKeys } from "@/constants/queries"
import { useQuery } from "@tanstack/react-query"

export const useGetMyPage = (pageParam: string | undefined) => {
  const {data, error, isLoading, refetch} =  useQuery({
    queryKey: planKeys.myPlan(Number(pageParam)),
    queryFn: () => getMyPage(pageParam, 6),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  })

  return {data, error, isLoading, refetch};
}