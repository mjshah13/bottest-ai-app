import React, { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface HighBoxPlotChartProps {}

const HighBoxPlotChart: React.FC<HighBoxPlotChartProps> = ({}) => {
  const [series, setSeries] = useState<
    ApexAxisChartSeries | ApexNonAxisChartSeries | undefined
  >([
    {
      type: "boxPlot",
      data: [
        {
          x: "11-31 Bot V2",
          y: [700, 760, 801, 848, 900],
        },
        {
          x: "11-30 run 1",
          y: [710, 770, 810, 850, 910],
        },
        {
          x: "11-30 run 2",
          y: [680, 740, 800, 830, 870],
        },
        {
          x: "12-15 Bot V3",
          y: [690, 750, 790, 820, 870],
        },
        {
          x: "12-16",
          y: [720, 780, 810, 860, 900],
        },
        {
          x: "12-17",
          y: [700, 760, 800, 850, 890],
        },
        {
          x: "12-18 run 1",
          y: [710, 770, 810, 850, 910],
        },
        {
          x: "12-18 run 2",
          y: [720, 780, 820, 860, 920],
        },
        {
          x: "12-19 run 1",
          y: [680, 740, 780, 830, 880],
        },
        {
          x: "12-19 run 2",
          y: [690, 750, 790, 830, 880],
        },
        {
          x: "12-19 run 3",
          y: [700, 760, 800, 850, 890],
        },
      ],
    },
    {
      type: "scatter",
      data: [
        {
          x: "11-31 Bot V2",
          y: 635,
        },
        {
          x: "11-30 run 1",
          y: "",
        },
        {
          x: "11-30 run 2",
          y: "",
        },
        {
          x: "12-15 Bot V3",
          y: "",
        },
        {
          x: "12-16",
          y: "1000", // Three scatter plots at "12-16"
        },
        {
          x: "12-17",
          y: "",
        },
        {
          x: "12-18 run 1",
          y: "",
        },
        {
          x: "12-18 run 2",
          y: "",
        },
        {
          x: "12-19 run 1",
          y: "",
        },
        {
          x: "12-19 run 2",
          y: "",
        },
        {
          x: "12-19 run 3",
          y: "",
        },
      ],
    },
  ]);

  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: "boxPlot",
      zoom: {
        enabled: false,
      },
    },
    colors: ["transparent", "transparent"],
    xaxis: {
      categories: [
        "11-31 Bot V2",
        "11-30 run 1",
        "11-30 run 2",
        "12-15 Bot V3",
        "12-16",
        "12-17",
        "12-18 run 1",
        "12-18 run 2",
        "12-19 run 1",
        "12-19 run 2",
        "12-19 run 3",
      ],
      labels: {
        style: {
          fontSize: "11px",
          fontFamily: "Poppins",
        },
      },
    },
    yaxis: {
      title: {
        text: "Test Execution Time (sec)",
        style: {
          color: "text-black",
          fontWeight: "font-normal",
          fontFamily: "Poppins",
        },
      },
      min: 600,
      max: 1200,
    },
    plotOptions: {
      boxPlot: {
        colors: {
          upper: "transparent",
          lower: "transparent",
        },
      },
    },
    legend: {
      show: false,
    },
  });

  return (
    <div className="w-full ">
      <div className="chart">
        <Chart options={options} series={series} type="boxPlot" height={260} />
      </div>
    </div>
  );
};

export default HighBoxPlotChart;
