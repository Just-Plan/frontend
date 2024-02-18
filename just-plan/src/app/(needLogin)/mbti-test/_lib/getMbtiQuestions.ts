import { nextFetch } from "@/lib/returnFetch";
import type { IMbtiQuestions } from "@/types/mbti.types";

export const getMbtiQuestions = async () => {
  const res = await nextFetch("/api/mbti/questions");

  return res as unknown as IMbtiQuestions[];
};
