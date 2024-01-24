import React from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function ExampleChart({ selectedData }: any) {
  const data = [
    { label: "식비", value: selectedData.accountBook.meals },
    { label: "교통비", value: selectedData.accountBook.transportation },
    { label: "숙박비", value: selectedData.accountBook.lodging },
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
    <div className="flex flex-col justify-center items-center ">
      <span>{selectedData.loc}</span>
      <span>{selectedData.title}</span>
      <ApexChart
        type="pie"
        options={options}
        series={series}
        height={200}
        width={200}
      />
    </div>
  );
}
