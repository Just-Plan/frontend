import { nextFetch } from "@/lib/returnFetch";

export const postProfileImg = async (file: FormData, email: string) => {
  const res = await nextFetch(`/api/user/profile/upload?email=${email}`, {
    method: "POST",
    body: file,
  });
  return res;
};
