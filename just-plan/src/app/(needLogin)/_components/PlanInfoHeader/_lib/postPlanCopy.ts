import { nextFetch } from "@/lib/returnFetch";
import type { IPlanFinal } from "@/types/plan.types";

export const postPlanCopy = async (planId: number) => {
  const res = await nextFetch(`/api/plan/copy`, {
    method: "POST",
    body: JSON.stringify({ planId: planId }),
  });

  return res as IPlanFinal;
};
