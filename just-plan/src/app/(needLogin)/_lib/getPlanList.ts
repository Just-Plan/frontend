import { nextFetch } from "@/lib/returnFetch";
import type { IPlanListResBody } from "@/types/plan.types";

export async function getPlanList(
  page: number,
  size: number,
  regionId: number,
  mbtiList?: string[],
): Promise<IPlanListResBody> {
  const res = await nextFetch(
    `/api/plan/plans?regionId=${regionId}&page=${page}&size=${size}&sort=scrapCnt`,
    {
      method: "POST",
      body: JSON.stringify({ mbti: mbtiList }),
    },
  );

  return res as unknown as IPlanListResBody;
}
