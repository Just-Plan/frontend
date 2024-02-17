import { nextFetch } from "@/lib/returnFetch";
import { IRegion } from "@/types/plan.types";

interface IBody {
  cities: IRegion[];
}

export const getSearchCity = async (cityName: string) => {
  const res = await nextFetch(`/api/cities/search?cityName=${cityName}`);

  return res as unknown as IBody;
};
