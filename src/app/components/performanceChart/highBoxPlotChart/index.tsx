import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { BoxDataType } from "../../../../utils/typesInterface";

interface HighBoxPlotChartProps {
  highBoxPlotData: BoxDataType[];
}

const HighBoxPlotChart: React.FC<HighBoxPlotChartProps> = ({
  highBoxPlotData,
}) => {
  const [series, setSeries] = useState<
    ApexAxisChartSeries | ApexNonAxisChartSeries | undefined
  >([
    // {
    //   type: "boxPlot",
    //   data: [
    //     {
    //       x: "11-31 Bot V2",
    //       y: [700, 760, 801, 848, 900],
    //     },
    //     {
    //       x: "11-30 run 1",
    //       y: [710, 770, 810, 850, 910],
    //     },
    //     {
    //       x: "11-30 run 2",
    //       y: [680, 740, 800, 830, 870],
    //     },
    //   ],
    // },
    // {
    //   type: "scatter",
    //   data: [
    //     {
    //       x: "11-31 Bot V2",
    //       y: 635,
    //     },
    //     {
    //       x: "11-30 run 1",
    //       y: "",
    //     },
    //     {
    //       x: "11-30 run 2",
    //       y: "",
    //     },
    //     {
    //       x: "12-15 Bot V3",
    //       y: "",
    //     },
    //     {
    //       x: "12-16",
    //       y: 635, // Three scatter plots at "12-16"
    //     },
    //     {
    //       x: "12-17",
    //       y: "",
    //     },
    //     {
    //       x: "12-18 run 1",
    //       y: "",
    //     },
    //     {
    //       x: "12-18 run 2",
    //       y: "",
    //     },
    //     {
    //       x: "12-19 run 1",
    //       y: "",
    //     },
    //     {
    //       x: "12-19 run 2",
    //       y: "",
    //     },
    //     {
    //       x: "12-19 run 3",
    //       y: "",
    //     },
    //   ],
    // },
  ]);

  useEffect(() => {
    if (highBoxPlotData) {
      const boxPlotSeries = {
        type: "boxPlot",
        group: "apexcharts-axis-0",
        data: highBoxPlotData.map((item) => ({
          x: item.suite_run_name,
          y: item.values.map((value) => Math.round(value)),
        })),
      };

      const scatterSeries = {
        type: "scatter",
        group: "apexcharts-axis-0",
        data: highBoxPlotData.flatMap((item) =>
          item.outliers.map((outlier) => ({
            x: item.suite_run_name,
            y: outlier,
          }))
        ),
      };

      setSeries([boxPlotSeries, scatterSeries]);
    }
  }, [highBoxPlotData]);

  // console.log(series);

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        categories: highBoxPlotData?.map(
          (item, i) => `${item?.suite_run_name}`
        ),
      },
    }));
  }, []);

  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: "boxPlot",
      zoom: {
        enabled: false,
      },
    },
    colors: ["transparent", "transparent"],
    xaxis: {
      type: "numeric",
      categories: [],
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
      min: 1,
      max: 520,
      labels: {
        formatter: function (val: number) {
          return Math.round(val).toString();
        },
        style: {
          fontSize: "11px",
          fontFamily: "Poppins",
        },
      },
    },
    plotOptions: {
      boxPlot: {
        colors: {
          upper: "transparent",
          lower: "transparent",
        },
      },
    },
    tooltip: {
      shared: false,
      intersect: true,
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
