import { postProfileImg } from "@/app/(needLogin)/mypage/_lib/postProfileImg";
import { useMutation } from "@tanstack/react-query";

export const usePostProfileImg = () => {
  return useMutation({
    mutationFn: ({ formData, email }: { formData: FormData; email: string }) =>
      postProfileImg(formData, email),
    onSuccess: () => {
      alert("patch place info 성공");
    },
    onError: () => {
      alert("patch place info 실패");
    },
  });
};
