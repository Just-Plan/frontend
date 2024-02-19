import { nextFetch } from "@/lib/returnFetch";
import type { UserInfo } from "@/store/auth.atom.type";

// 수정 필요
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const patchEditInfo = async ({
  name,
  mbtiName,
  introduction,
}: {
  name: string;
  mbtiName: string;
  introduction: string;
}) => {
  const res = await nextFetch<UserInfo>("/api/user/update", {
    method: "PATCH",
    body: JSON.stringify({ name, mbtiName, introduction }),
  });

  return res;
};
