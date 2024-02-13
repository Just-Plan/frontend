import { getMyPage } from "@/app/(needLogin)/mypage/_lib/getMyPage"
import { planKeys } from "@/constants/queries"
import { nextFetch } from "@/lib/returnFetch"
import { useQuery } from "@tanstack/react-query"

export const useGetMyPage = () => {
  const {data, error, isLoading} =  useQuery({
    queryKey: planKeys.myPlan(),
    queryFn: getMyPage,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  })

  return {data, error, isLoading};
}