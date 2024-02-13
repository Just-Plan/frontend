import { nextFetch } from "@/lib/returnFetch"

export const getMyPage = async (page: number, size: number) => {
  const res = await nextFetch(`/api/plan/my?page=${page}0&size=${size}&sort=createdAt`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();

}