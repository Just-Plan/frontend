import { patchEditInfo } from "@/app/(needLogin)/mypage/_lib/patchEditInfo";
import { localStorageUserInfoAtom } from "@/store/auth.atom";
import { useMutation } from "@tanstack/react-query"
import { useAtom } from "jotai";

export const usePatchEditInfo = () => {
  const [userInfo, setUserInfo] = useAtom(localStorageUserInfoAtom);

  return useMutation({
    mutationFn: (info: any) =>
    patchEditInfo(info),
    onSuccess: (data) => {
      alert('성공')

      setUserInfo({
        ...userInfo,
        name: data.data.name,
        mbtiName: data.data.mbtiName,
      })
    },
    onError: () => {
      alert('실패')
    },
  });
}