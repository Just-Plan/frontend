import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import type { IModifyPlanInfo } from "@/types/plan.types";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function Chart({ selectedData }: { selectedData: IModifyPlanInfo }) {
  const data = [
    { label: "식비", value: selectedData.expense.food },
    { label: "교통비", value: selectedData.expense.transportation },
    { label: "숙박비", value: selectedData.expense.lodging },
    { label: "쇼핑비", value: selectedData.expense.shopping },
    { label: "기타", value: selectedData.expense.etc },
  ];

  const options: ApexOptions = {
    chart: {
      id: "apexchart-example",
    },
    labels: data.map((item) => item.label),
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    dataLabels: {
      enabled: true,
    },
  };

  const series = data.map((item) => item.value);

  return (
    <div className="flex flex-col justify-center items-center w-96">
      <div className="text-xl font-bold">
        {selectedData?.region?.koreanName}
      </div>
      <div className="text-gray-500 text-sm font-semibold">
        {selectedData.title}
      </div>
      <ApexChart
        type="pie"
        options={options}
        series={series}
        height={350}
        width={350}
      />
    </div>
  );
}
