import { nextFetch } from "@/lib/returnFetch";

// 수정 필요
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const patchEditInfo = async (info: any) => {
  const res = await nextFetch("/api/user/update", {
    method: "PATCH",
    body: JSON.stringify(info),
  });

  return res.json();
};
