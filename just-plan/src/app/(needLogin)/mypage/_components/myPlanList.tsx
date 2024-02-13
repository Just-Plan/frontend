import PlanCard from "@/components/PlanCard/PlanCard";
import { useGetMyPage } from "@/hooks/useGetMyPage";
import { MbtiCardContent } from "@/mocks";
import { IPlan, IPlan2 } from "@/types/plan.types";

const MyPlanList = () => {

  const {data, error, isLoading} = useGetMyPage();

  if (error) return <div>에러</div>
  if (isLoading) return <div>로딩중</div>

  console.log('데이터 출력', data);
  return (
    <div className="flex justify-center">
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-10 ">
        {data.plans.map((item: IPlan2) => (
          <PlanCard item={item} key={item.planId} />
        ))}
      </div>
    </div>
  );
};

export default MyPlanList;
