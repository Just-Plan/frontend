import { nextFetch } from "@/lib/returnFetch";
import { IPlanListResBody } from "@/types/plan.types";

export async function getPlanList(
  page: any,
  size: number,
): Promise<IPlanListResBody> {
  const res = await nextFetch(
    `/api/plan?page=${page}&size=${size}&sort=createdAt`,
  );

  // if (!res.ok) {
  //   throw new Error("Failed to fetch data");
  // }

  // const temp = res.json();
  return res as unknown as IPlanListResBody;
}
