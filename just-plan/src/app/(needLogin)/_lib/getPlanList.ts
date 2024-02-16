import { nextFetch } from "@/lib/returnFetch";

export async function getPlanList(page: any, size: number) {
  // const res = await fetch(
  //   `http://13.125.188.226:8080/api/plan?page=${page}&size=${size}&sort=createdAt`,
  //   {
  //     // next: { tags: ["trends"] },
  //     // cache: "no-store",
  //   },
  // );

  const res = await nextFetch(`/api/plan?page=${page}&size=${size}&sort=createdAt`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
