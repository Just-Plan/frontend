import { nextFetch } from "@/lib/returnFetch"

export const patchEditInfo = async (info: any) => {
  const res = await nextFetch('/api/user/update', {method: 'PATCH', body: JSON.stringify(info)});

  return res.json();
}