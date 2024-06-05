"use client";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { UsageEvaluationPerformProps } from "../../../utils/typesInterface";

const PerformanceDistributionChart: React.FC<UsageEvaluationPerformProps> = ({
  list = [],
  categories = [],
}) => {
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "40%",
        borderRadius: 10,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories,
      title: {
        text: "Number of Tests",
        offsetY: 10,
        style: {
          fontWeight: 400,
          color: "#909193",
          fontSize: "16px",
          fontFamily: "Poppins",
        },
      },

      labels: {
        style: {
          colors: "#212427",
          fontSize: "12px",
          fontFamily: "Poppins",
          fontWeight: 600,
        },
      },
      tickAmount: 3,
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val: any, opts: any) => {
          return `Number of test : ${val} `;
        },
      },
      style: {
        fontFamily: "Poppins",
      },
    },
    yaxis: {
      title: {
        text: "Executions Time (Seconds)",
        offsetX: 15,
        style: {
          fontWeight: 400,
          color: "#909193",
          fontSize: "16px",
          fontFamily: "Poppins",
        },
      },
      labels: {
        style: {
          colors: "#212427",
          fontSize: "12px",
          fontFamily: "Poppins",
          fontWeight: 600,
        },
      },
      reversed: false,
      axisTicks: {
        show: true,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  });

  const [series, setSeries] = useState<
    ApexAxisChartSeries | ApexNonAxisChartSeries | undefined
  >([
    {
      data: [],
    },
  ]);

  useEffect(() => {
    setSeries((prevData) =>
      prevData?.map((item: any) => ({
        ...item,
        data: list,
      }))
    );
  }, [list]);

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        ...prevOptions.xaxis,
        categories: categories,
      },
    }));
  }, [categories]);

  return (
    <div className="bg-white rounded-lg  w-full h-full barchart">
      <Chart options={options} series={series} type="bar" height={450} />
    </div>
  );
};

export default PerformanceDistributionChart;
