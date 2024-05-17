import React, { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface TestResultChartProps {}

const TestResultChart: React.FC<TestResultChartProps> = ({}) => {
  const [series, setSeries] = useState<
    { data: number[]; name: string; color: string }[]
  >([
    {
      name: "Failed",
      data: [44, 55, 41, 67, 22, 43, 21, 49],
      color: "#E1654A",
    },
    {
      name: "Mixed",
      data: [13, 23, 20, 8, 13, 27, 33, 12],
      color: "#E7C200",
    },
    {
      name: "Passed",
      data: [11, 17, 15, 15, 21, 14, 15, 13],
      color: "#54CA6E",
    },
  ]);

  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: "bar",
      stacked: true,
      stackType: "100%",
      zoom: {
        enabled: false,
      },
    },

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        borderRadiusApplication: "end", // 'around', 'end'
        borderRadiusWhenStacked: "last", // 'all', 'last'
      },
    },
    title: {
      text: "Test Result by Test Suite Runs",
      align: "left",
      style: {
        fontSize: "14px",
        fontWeight: "500",
        fontFamily: "Poppins",
        color: "text-black",
      },
    },
    xaxis: {
      categories: [
        "11-30",
        "12-1 run 2",
        "12-2 run 2",
        "12-2",
        "12-3",
        "12-4 bot V2",
        "12-4",
        "12-5 run 1",
        "12-5 run 2",
        "12-6",
      ],
      labels: {
        style: {
          fontSize: "11px", // Adjust the font size here
          fontFamily: "Poppins",
        },
      },
    },
    yaxis: {
      min: 0,
      max: 100, // Set the maximum value to 500
      tickAmount: 4, // Number of ticks including the max value
      title: {
        text: "Percent",
        style: {
          color: "text-black",
          fontWeight: "font-normal",
          fontFamily: "Poppins",
        },
      },
    },
    legend: {
      position: "bottom",
      show: true,
      markers: {
        width: 11,
        height: 11,
        radius: 11,
      },
    },
    fill: {
      opacity: 1,
    },
  });

  return (
    <div className="w-full  mt-8">
      <div className="chart">
        <Chart options={options} series={series} type="bar" height={260} />
      </div>
    </div>
  );
};

export default TestResultChart;
