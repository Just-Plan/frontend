import { nextFetch } from "@/lib/returnFetch";
import type { IRegion } from "@/types/plan.types";

interface IBody {
  cities: IRegion[];
}

export async function getCities() {
  const res = await nextFetch(`/api/cities/random/5`);
  console.log("getcities:", res);
  return res as unknown as IBody;
}
