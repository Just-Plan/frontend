import { nextFetch } from "@/lib/returnFetch"

export const getMyPage = async () => {
  const resposne = await nextFetch('/api/plan/my?page=0&size=6&sort=createdAt');

  const result = await resposne.json();

  return result.data;

}