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

  console.log("data::::::", data);

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
      <span>{selectedData?.region?.koreanName}</span>
      <span>{selectedData.title}</span>
      <ApexChart
        type="pie"
        options={options}
        series={series}
        height={400}
        width={400}
      />
    </div>
  );
}
