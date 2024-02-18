import { nextFetch } from "@/lib/returnFetch";
import type { IModifyPlanInfo } from "@/types/plan.types";

export const getAccountBook = async () => {
  const res = await nextFetch(`/api/plan/my/account-book`);

  return res as unknown as IModifyPlanInfo[];
};
