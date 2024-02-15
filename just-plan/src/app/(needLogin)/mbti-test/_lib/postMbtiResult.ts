import { fetchComposed } from "@/lib/returnFetch";

export const postMbtiResult = async (selectedAnswers: number[]) => {
  const res = await fetchComposed("/api/mbti/result", {
    method: "POST",
    body: JSON.stringify({
      answers: selectedAnswers,
    }),
  });
  return res.json();
};
