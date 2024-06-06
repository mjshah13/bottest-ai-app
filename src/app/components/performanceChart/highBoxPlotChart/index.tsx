import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import {
  BoxDataType,
  PerformanceChartDataType,
} from "../../../../utils/typesInterface";
import moment from "moment";

interface HighBoxPlotChartProps {
  highBoxPlotData: PerformanceChartDataType | null;
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
    //       y: [10, 60, 100, 320, 340],
    //     },
    //     {
    //       x: "11-30 run 1",
    //       y: [10, 30, 80, 400, 410],
    //     },
    //     {
    //       x: "11-30 run 2",
    //       y: [8, 25, 70, 200, 280],
    //     },
    //     {
    //       x: "11-31 Bot V5",
    //       y: [8, 25, 70, 200, 280],
    //     },
    //   ],
    // },
    // {
    //   type: "scatter",
    //   data: [
    //     {
    //       x: "11-31 Bot V2",
    //       y: 500,
    //     },
    //     {
    //       x: "11-30 run 1",
    //       y: 20,
    //     },
    //     {
    //       x: "11-30 run 2",
    //       y: 380,
    //     },
    //     {
    //       x: "11-31 Bot V5",
    //       y: 400,
    //     },
    //   ],
    // },
  ]);

  console.log(series);

  useEffect(() => {
    if (highBoxPlotData) {
      const boxPlotSeries = {
        type: "boxPlot",
        data: highBoxPlotData.boxes
          .map((item, index) => ({
            x: new Date(highBoxPlotData.timestamps[index]).getTime(),
            y: item.values.map((value) => Math.round(value)),
          }))
          .sort((a, b) => a.x - b.x),
      };

      const scatterSeries = {
        type: "scatter",
        name: "outlier",
        data: highBoxPlotData?.boxes
          ?.flatMap((item) =>
            item.outliers.map((outlier, index) => ({
              x: new Date(highBoxPlotData.timestamps[index]).getTime(),
              y: outlier,
            }))
          )
          .sort((a, b) => a.x - b.x), // Sort by x values in ascending order
      };

      setSeries([boxPlotSeries, scatterSeries]);
    }
  }, [highBoxPlotData]);

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        overwriteCategories: highBoxPlotData?.timestamps.map((timestamp) => {
          return moment(timestamp).format("DD MMM");
        }),
      },
    }));
  }, [highBoxPlotData]);

  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      zoom: {
        enabled: false,
      },
    },
    colors: ["transparent", "transparent"],
    xaxis: {
      type: "datetime",
      overwriteCategories: [],
      labels: {
        formatter: function (value: string): string {
          return moment(value).format("DD MMM");
        },
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
      max: 550,
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
      x: {
        formatter: function (val: number) {
          return moment(val).format("DD MMM YYYY");
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
