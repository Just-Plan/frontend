import { nextFetch } from "@/lib/returnFetch";

export const postProfileImg = async (formData: FormData, email: string) => {
  const res = await nextFetch(`/api/user/profile/upload?email=${email}`, {
    method: "POST",
    body: formData,
  });
  return res;
};
