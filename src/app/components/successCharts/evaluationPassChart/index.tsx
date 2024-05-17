import React, { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface EvaluationPassProps {}

const EvaluationPassChart: React.FC<EvaluationPassProps> = ({}) => {
  const [series, setSeries] = useState<
    ApexAxisChartSeries | ApexNonAxisChartSeries | undefined
  >([
    {
      name: "Regression Test Suite Success Rate for MyBot",
      data: [30, 56, 55, 97, 121, 121, 324, 345, 345, 390].map((value) =>
        parseFloat(((value / 411) * 100).toFixed(0))
      ),
      color: "#388AEB",
    },
    {
      name: "",
      data: [],
      color: "",
    },
  ]);

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
        return `${val}%`;
      },
      offsetY: -18,
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
      text: "Evaluation performed - last 11 runs",
      align: "center",
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
      labels: {
        formatter: function (value) {
          return value.toFixed(0) + "%";
        },
        style: {
          fontSize: "11px",
          fontFamily: "Poppins",
        },
      },
      title: {
        text: "Test Success Rate",
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
    legend: {
      position: "bottom",
      show: true,
      markers: {
        width: 11,
        height: 11,
        radius: 11,
      },
    },
  });

  return (
    <div className="w-full mt-8">
      <div className="chart">
        <Chart options={options} series={series} type="bar" height={260} />
      </div>
    </div>
  );
};

export default EvaluationPassChart;
