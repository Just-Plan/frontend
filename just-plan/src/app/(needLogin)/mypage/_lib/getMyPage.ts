import { nextFetch } from "@/lib/returnFetch";
import { IPlanListResBody } from "@/types/plan.types";

export const getMyPage = async (
  page: string | undefined,
  size: number,
): Promise<IPlanListResBody> => {
  const res = await nextFetch(
    `/api/plan/my?page=${page}&size=${size}&sort=createdAt`,
  );

  return res as unknown as IPlanListResBody;
};
