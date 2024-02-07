import { MbtiCardContent } from "@/mocks";
import PlanCard from "@/components/PlanCard/PlanCard";

const MyScrapPlanList = () => {
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

export default MyScrapPlanList;
