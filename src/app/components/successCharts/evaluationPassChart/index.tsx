"use client";

import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface EvaluationPassProps {
  suiteRunNames: string[];
  evaluationPassRates: number[];
  suiteRun: string[];
}

const EvaluationPassChart: React.FC<EvaluationPassProps> = ({
  suiteRunNames,
  evaluationPassRates,
  suiteRun,
}) => {
  const [series, setSeries] = useState<
    ApexAxisChartSeries | ApexNonAxisChartSeries | undefined
  >([
    {
      name: "Regression Test Suite Success Rate for MyBot",
      data: [],
      color: "#388AEB",
    },
    {
      name: "",
      data: [],
      color: "",
    },
  ]);

  useEffect(() => {
    setSeries((prevData) =>
      prevData?.map((item: any) =>
        item?.name
          ? {
              ...item,
              data: evaluationPassRates?.map((value) =>
                Number(value.toFixed(0))
              ),
            }
          : item
      )
    );
  }, [evaluationPassRates]);

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

        dataLabels: {
          position: "top",
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
      text: "Evaluation performed - last 0 runs",
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
          fontSize: "11px",
          fontFamily: "Poppins",
        },
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 4,
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
    <div className="w-full mt-8">
      <div className="chart">
        <Chart options={options} series={series} type="bar" height={260} />
      </div>
    </div>
  );
};

export default EvaluationPassChart;
