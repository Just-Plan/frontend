/* eslint-disable @typescript-eslint/no-unused-vars */
import { postPlanScrap } from "@/components/PlanCard/_lib/postPlanScrap";
import { planKeys } from "@/constants/queries";
import type { IPlanListResBody, IScrapRequstBody } from "@/types/plan.types";
import type { QueryFilters } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ITemp {
  pageParams: number[];
  pages: IPlanListResBody[];
}

export const usePostPlanScrap = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      body,
      cityId,
      mbtiList,
    }: {
      body: IScrapRequstBody;
      cityId: number;
      mbtiList: string[];
    }) => postPlanScrap(body),
    onMutate: async (newOption) => {
      // 인자 -> mutationFn에 들어가는 인자랑 동일하게 들어온다.
      // 낙관적 업데이트를 해보자!
      // 와... 인기랑 mbti랑 구분해야하네..........
      // mbti만 먼저 해보자

      console.log("newOption:", newOption);
      // 요거 invalidate 왜 해주는거지?
      queryClient.invalidateQueries(
        planKeys.mbtiFilter(
          newOption.cityId,
          newOption.mbtiList,
        ) as unknown as QueryFilters,
      );
      // invalite로 만들어서 다음에 이 캐시된 데이터가 필요하면 refetch 되도록 한다. 근데 왜 하지?

      const prevOption = queryClient.getQueryData<ITemp>(
        planKeys.mbtiFilter(newOption.cityId, newOption.mbtiList),
      );

      console.log(
        "key:",
        planKeys.mbtiFilter(newOption.cityId, newOption.mbtiList),
      );

      let newOption2;
      if (prevOption) {
        newOption2 = JSON.parse(JSON.stringify(prevOption));
        newOption2.pages.forEach((page: IPlanListResBody) => {
          page.plans.forEach((plan) => {
            if (plan.planId === newOption.body.planId) {
              plan.scrapped = !plan.scrapped;
            }
          });
        });

        queryClient.setQueryData(
          planKeys.mbtiFilter(newOption.cityId, newOption.mbtiList),
          newOption2,
        );
      }
      console.log("prevOption:", prevOption, "newOption2:", newOption2);

      // 반환값: onSuccess, onError 등에서 세번째 인자인 context로 전달한다.
      // 이 context에 이전값을 전달하면, 에러 발생 시 onError에서 이전값 복원 가능.
      return { prevOption };
    },
    onSuccess: () => {
      alert("patch place info 성공");
    },
    onError: (error, newTodo, context) => {
      alert("patch place info 실패");

      // onError에서 롤백 로직을 구현
      queryClient.setQueryData(planKeys.mbtiFilter(0, []), context?.prevOption);
    },
  });
};
