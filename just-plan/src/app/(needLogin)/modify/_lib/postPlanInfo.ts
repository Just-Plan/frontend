import type { IModifyPlanInfo } from "@/types/plan.types";
import { useMutation } from "@tanstack/react-query";

const patchPlanInfo = async (info: IModifyPlanInfo) => {
  const res = await fetch(`http://13.125.188.226:8080/api/plan`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QG5hdmVyLmNvbSIsImlhdCI6MTcwNzQ4OTIyOSwiZXhwIjoxNzA3NDk2NDI5fQ.2RxG0621hkoSAvWDtUx9WaHopy0N6rH-nlHMMFwKNLo`,
    },
    body: JSON.stringify({
      ...info,
    }),
  });
  return res.json();
};

export const usePatchPlanInfo = () => {
  return useMutation({
    mutationFn: (info: IModifyPlanInfo) => patchPlanInfo(info),
    onSuccess: () => {
      alert("성공");
    },
    onError: () => {
      alert("실패");
    },
  });
};
