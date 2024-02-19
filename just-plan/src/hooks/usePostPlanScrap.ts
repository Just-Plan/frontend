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

      const prevMBTIFilter = queryClient.getQueryData<ITemp>(
        planKeys.mbtiFilter(newOption.cityId, newOption.mbtiList),
      );

      const copyPrevMBTIFilter = JSON.parse(JSON.stringify(prevMBTIFilter));

      queryClient.setQueryData<ITemp>(
        planKeys.mbtiFilter(newOption.cityId, newOption.mbtiList),
        (prev) => {
          if (!prev) return prev;
          prev.pages = prev.pages.map((page) => {
            page.plans.map((plan) => {
              if (plan.planId === newOption.body.planId) {
                plan.scrapped = !plan.scrapped;
                if (plan.scrapped) plan.scrapCount++;
                else plan.scrapCount--;
              }
              return plan;
            });
            return page;
          });
          return prev;
        },
      );

      const prevPopular = queryClient.getQueryData<IPlanListResBody>(
        planKeys.popular(3),
      );

      const copyPrevPopular = JSON.parse(JSON.stringify(prevPopular));

      queryClient.setQueryData<IPlanListResBody>(
        planKeys.popular(3),
        (prev) => {
          if (!prev) return prev;
          prev.plans = prev.plans.map((plan) => {
            if (plan.planId === newOption.body.planId) {
              plan.scrapped = !plan.scrapped;
              if (plan.scrapped) plan.scrapCount++;
              else plan.scrapCount--;
            }
            return plan;
          });
          return prev;
        },
      );

      // 반환값: onSuccess, onError 등에서 세번째 인자인 context로 전달한다.
      // 이 context에 이전값을 전달하면, 에러 발생 시 onError에서 이전값 복원 가능.
      return { copyPrevMBTIFilter, copyPrevPopular };
    },
    onSuccess: (_, variables) => {
      alert("patch place info 성공");

      queryClient.invalidateQueries(
        planKeys.mbtiFilter(
          variables.cityId,
          variables.mbtiList,
        ) as unknown as QueryFilters,
      );
      queryClient.invalidateQueries(
        planKeys.popular(3) as unknown as QueryFilters,
      );
    },
    onError: (error, newTodo, context) => {
      alert("patch place info 실패");

      // onError에서 롤백 로직을 구현
      queryClient.setQueryData(
        planKeys.mbtiFilter(0, []),
        context?.copyPrevMBTIFilter,
      );
      queryClient.setQueryData(planKeys.popular(3), context?.copyPrevPopular);
    },
  });
};
