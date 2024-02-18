import { getPlaceComment } from "@/app/(needLogin)/_components/DetailPlaceModal/_lib/getPlaceComment";
import { placeCommentKey } from "@/constants/queries";
import { useQuery } from "@tanstack/react-query";

export const useGetPlaceComment = (placeId: number) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: placeCommentKey.filter(placeId),
    queryFn: () => getPlaceComment(placeId),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: false,
  });

  return { data, error, isLoading, refetch };
};
