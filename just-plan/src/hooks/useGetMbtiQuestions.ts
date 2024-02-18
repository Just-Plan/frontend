import { getMbtiQuestions } from "@/app/(needLogin)/mbti-test/_lib/getMbtiQuestions";
import { mbtiKeys } from "@/constants/queries";
import { useQuery } from "@tanstack/react-query";

export const useGetMbtiQuestions = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: mbtiKeys.all,
    queryFn: getMbtiQuestions,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return { data, error, isLoading, refetch };
};
