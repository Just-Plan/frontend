import { getUserInfo } from "@/app/(needLogin)/mypage/_lib/getUserInfo";
import { userKeys } from "@/constants/queries";
import { useQuery } from "@tanstack/react-query";

export const useGetUserInfo = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: userKeys.all,
    queryFn: getUserInfo,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return { data, error, isLoading };
};
