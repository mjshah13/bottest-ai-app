import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface UsageEvaluationPerformProps {
  usageChartData: number[];
  suiteRunNames: string[];
}

const UsageEvaluationPerformedChart: React.FC<UsageEvaluationPerformProps> = ({
  usageChartData,
  suiteRunNames,
}) => {
  const [series, setSeries] = useState<
    ApexAxisChartSeries | ApexNonAxisChartSeries | undefined
  >([
    {
      name: "Evaluation Performed",
      data: [],
      color: "#ffe7bc",
    },
    {
      name: "",
      data: [],
      color: "",
    },
  ]);

  useEffect(() => {
    setSeries((prev) =>
      prev?.map((item: any) =>
        item.name
          ? {
              ...item,
              data: usageChartData,
            }
          : item
      )
    );
  }, [usageChartData]);

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        ...prevOptions.xaxis,
        categories: suiteRunNames,
      },
    }));
  }, [suiteRunNames]);

  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      bar: {
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
        horizontal: false,
        columnWidth: "60%",
        // endingShape: "rounded",
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: any) {
        return `${val}`;
      },
      offsetY: -16,
      offsetX: 2,
      style: {
        fontSize: "10px",
        colors: ["text-black"],
        fontFamily: "Poppins",
      },
    },

    stroke: {
      show: true,
      width: 6,
      colors: ["transparent"],
    },
    title: {
      text: "Evaluation performed last month ",
      align: "center",
      style: {
        fontSize: "14px",
        fontWeight: "500",
        fontFamily: "Poppins",
        color: "text-black",
      },
    },
    xaxis: {
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
      tickAmount: 5, // Number of ticks including the max value
      title: {
        text: "Total Evaluation performed",
        style: {
          color: "text-black",
          fontWeight: "font-normal",
          fontFamily: "Poppins",
        },
      },
    },
    // grid: {
    //   show: true, // Show the grid lines
    //   borderColor: "#D0D0DA", // Customize the color of the grid lines
    //   strokeDashArray: 5, // Customize the dash pattern of the grid lines
    // },
    fill: {
      opacity: 1,
    },
    tooltip: {
      enabled: true,
      style: {
        fontFamily: "Poppins",
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
      fontFamily: "Poppins",
    },
  });

  return (
    <div className="w-full ">
      <div className="chart">
        <Chart options={options} series={series} type="bar" height={220} />
      </div>
    </div>
  );
};

export default UsageEvaluationPerformedChart;
