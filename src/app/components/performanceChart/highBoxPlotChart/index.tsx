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

  useEffect(() => {
    if (highBoxPlotData) {
      const boxPlotSeries = {
        type: "boxPlot",
        data: highBoxPlotData.map((item, index) => ({
          x: item?.suite_run_name,
          y: item.values.map((value) => Math.round(value)),
        })),
      };

      const scatterSeries = {
        type: "scatter",
        data: highBoxPlotData.flatMap((item) =>
          item.outliers.map((outlier) => ({
            x: item?.suite_run_name,
            y: outlier,
          }))
        ),
      };

      setSeries([boxPlotSeries, scatterSeries]);
    }
  }, [highBoxPlotData]);

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        overwriteCategories: highBoxPlotData?.map(
          (item) => `${item?.suite_run_name}`
        ),
      },
    }));
  }, []);

  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      zoom: {
        enabled: false,
      },
    },
    colors: ["transparent", "transparent"],
    xaxis: {
      overwriteCategories: [],
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
