import { patchEditInfo } from "@/app/(needLogin)/mypage/_lib/patchEditInfo";
import { userKeys } from "@/constants/queries";
import { localStorageUserInfoAtom } from "@/store/auth.atom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";

export const usePatchEditInfo = () => {
  const [userInfo, setUserInfo] = useAtom(localStorageUserInfoAtom);

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
    onSuccess: (data) => {
      alert("성공");

      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
    onError: () => {
      alert("실패");
    },
  });
};
