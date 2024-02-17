import { getAccountBook } from "@/app/(needLogin)/mypage/_lib/getAccountBook";
import { planKeys } from "@/constants/queries";
import { useQuery } from "@tanstack/react-query";

export const useGetAccountBook = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: planKeys.account(),
    queryFn: getAccountBook,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return { data, error, isLoading };
};
