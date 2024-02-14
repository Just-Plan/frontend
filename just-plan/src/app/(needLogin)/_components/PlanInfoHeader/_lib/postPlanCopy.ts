import { nextFetch } from "@/lib/returnFetch";

export const postPlanCopy = async (planId: number) => {
  const res = await nextFetch(`/api/plan/copy`, {
    method: "POST",
    body: JSON.stringify({ planId: planId }),
  });

  const result = await res.json();
  return result.data;
};
