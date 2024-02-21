import { patchEditInfo } from "@/app/(needLogin)/mypage/_lib/patchEditInfo";
import { userKeys } from "@/constants/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePatchEditInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      name,
      mbtiName,
      introduction,
    }: {
      name: string;
      mbtiName: string;
      introduction: string;
    }) => patchEditInfo({ name, mbtiName, introduction }),
    onSuccess: () => {
      alert("성공");

      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
    onError: () => {
      alert("실패");
    },
  });
};
