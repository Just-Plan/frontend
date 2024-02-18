import { nextFetch } from "@/lib/returnFetch";
import type { IPlanFinal } from "@/types/plan.types";
import type { ICreatePlanReqBody } from "../AddPlan.types";

export const postCreatePlan = async (body: ICreatePlanReqBody) => {
  const res = await nextFetch(`/api/plan`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  return res as unknown as IPlanFinal;
};
