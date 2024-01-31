import { IModifyPlanInfo } from "@/types/plan.types";
import { useMutation } from "@tanstack/react-query";

const patchPlanInfo = async (info: IModifyPlanInfo) => {
  const res = await fetch(`http://13.125.188.226:8080/api/plan`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QG5hdmVyLmNvbSIsImlhdCI6MTcwNjY5MjM5NywiZXhwIjoxNzA2Njk5NTk3fQ.M27ZH-A5TL7EXmtVlQf6u7lFQbwyAepYYbKaFRFrtNA`,
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