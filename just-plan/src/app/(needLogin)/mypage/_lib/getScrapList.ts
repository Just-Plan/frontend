import { nextFetch } from "@/lib/returnFetch";
import type { IPlanListResBody } from "@/types/plan.types";

export const getScrapList = async (page: string | undefined, size: number) => {
  const res = await nextFetch(
    `/api/plan/my/scrap?page=${page}&size=${size}&sort=createdAt`,
  );

  return res as unknown as IPlanListResBody;
};
