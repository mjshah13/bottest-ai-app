"use client";

import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface EvaluationPerformProps {
  suiteRunNames: string[];
  evaluationsPerformed: number[];
  suiteRun: string[];
}

const EvaluationPerformedChart: React.FC<EvaluationPerformProps> = ({
  suiteRunNames,
  evaluationsPerformed,
  suiteRun,
}) => {
  const [series, setSeries] = useState<
    ApexAxisChartSeries | ApexNonAxisChartSeries | undefined
  >([
    {
      name: "Evaluation performed ",
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
              data: evaluationsPerformed,
            }
          : item
      )
    );
  }, [evaluationsPerformed]);

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        ...prevOptions.xaxis,
        categories: suiteRunNames,
      },
      title: {
        text: `Evaluation performed - last ${suiteRun?.length} runs`,
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
      text: `Evaluation performed - last 0 runs`,
      align: "center",
      style: {
        fontSize: "14px",
        fontWeight: "500",
        fontFamily: "Poppins",
        color: "text-black",
      },
    },
    xaxis: {
      categories: suiteRunNames,

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
      fontFamily: "Poppins",
    },
  });

  return (
    <div className="w-full ">
      <div className="chart">
        <Chart options={options} series={series} type="bar" height={260} />
      </div>
    </div>
  );
};

export default EvaluationPerformedChart;
