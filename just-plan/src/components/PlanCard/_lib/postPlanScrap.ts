import { nextFetch } from "@/lib/returnFetch";
import { IScrapRequstBody } from "@/types/plan.types";

export const postPlanScrap = (body: IScrapRequstBody) => {
  const res = nextFetch(`/api/plan/scrap`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  return res;
};
