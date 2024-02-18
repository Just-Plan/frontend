import { postMbtiResult } from "@/app/(needLogin)/mbti-test/_lib/postMbtiResult";
import { useMutation } from "@tanstack/react-query";

export const usePostMbtiResult = (selectedAnswers: number[]) => {
  return useMutation({
    mutationFn: () => postMbtiResult(selectedAnswers),
    onSuccess: () => {
      console.log("성공");
      console.log(selectedAnswers);
      // localStorage에 변경
    },
    onError: () => {
      console.log("실패");
    },
  });
};
