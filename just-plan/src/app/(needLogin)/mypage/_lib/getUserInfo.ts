import { nextFetch } from "@/lib/returnFetch";
import type { UserInfo } from "@/store/auth.atom.type";

export const getUserInfo = async () => {
  const res = await nextFetch(`/api/user/read`);

  return res as unknown as UserInfo;
};
