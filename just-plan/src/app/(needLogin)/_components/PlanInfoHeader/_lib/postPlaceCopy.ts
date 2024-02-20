import { nextFetch } from "@/lib/returnFetch";

export const postPlaceCopy = async (
  originPlanId: number,
  newPlanId: number,
) => {
  const res = await nextFetch(
    `/api/place/copy?originPlanId=${originPlanId}&newPlanId=${newPlanId}`,
    {
      method: "POST",
    },
  );

  return res;
};
