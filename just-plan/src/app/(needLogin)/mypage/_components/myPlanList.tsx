import { MbtiCardContent, PopularCardContent } from "@/app/mocks";
import PlanCard from "@/components/PlanCard/PlanCard";

const MyPlanList = () => {
  return (
    <div className="flex justify-center">
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-10 ">
        {MbtiCardContent.map((item) => (
          <PlanCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default MyPlanList;
