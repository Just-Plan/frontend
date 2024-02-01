import type { IModifyPlanInfo } from "@/types/plan.types";
import { useMutation } from "@tanstack/react-query";

const patchPlanInfo = async (info: IModifyPlanInfo) => {
  const res = await fetch(`http://13.125.188.226:8080/api/plan`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QG5hdmVyLmNvbSIsImlhdCI6MTcwNjc1MDYzNiwiZXhwIjoxNzA2NzU3ODM2fQ.ezPrg-hBm284pOcUR8yZ6Ib9NmtMz-bLFicLaDnCidU`,
    },
    body: JSON.stringify({
      ...info
    }),
  },
  )
  return res.json();
};

export const usePatchPlanInfo = () => {
  return useMutation({
    mutationFn: (info: IModifyPlanInfo) =>
    patchPlanInfo(info),
    onSuccess: () => {
      alert('성공')
    },
    onError: () => {
      alert('실패')
    },
  });
};