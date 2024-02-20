import { nextFetch } from "@/lib/returnFetch";
import type { IPlanInfoDetail } from "@/types/plan.types";

export async function getPlanInfo(planId: string) {
  const res = await nextFetch(`/api/plan/${planId}`);

  return res as IPlanInfoDetail;
}
