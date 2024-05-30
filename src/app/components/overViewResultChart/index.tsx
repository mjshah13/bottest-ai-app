
"use client";

import React, { useEffect, useState, useRef } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { OverViewResultChartProps } from "../../../utils/typesInterface";


const OverViewResultChart: React.FC<OverViewResultChartProps> = ({
  list,
  labelData,
  name,
  id,
  onHover,
  highlightIndex,
}) => {
  const chartRef = useRef<any>(null);
  const [series, setSeries] = useState<ApexNonAxisChartSeries>([]);
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      
      id:id,
      type: "donut",
      height: 350,
      events: {
        dataPointMouseEnter: function (event, chartContext, config) {
          
          onHover?.(config.dataPointIndex);
        },
        dataPointMouseLeave: function () {
          onHover?.(null);
        },
      },
    },
    labels: [],
    colors: [
      "#388AEB",
      "#54CA6E",
      "#E7C200",
      "#E1654A",
      "#212427",
      "#E1654A",
      "#212427",
    ],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "24px",
              fontWeight: 600,
              offsetY: 10,
            },
            value: {
              show: false,
            },
            total: {
              show: true,
              label: `${series?.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0
              )} Test`,
              fontSize: "24px",
              fontWeight: 600,
              fontFamily: "Poppins",
              color: "#909193",
            },
          },
        },
      },
    },
   
    tooltip: {
    
      enabled: true,
      
      style: {
        fontFamily: "Poppins",
        
      },
     
   
    },
    legend: {
      
      position: "right",
      offsetY: 50,
      fontSize: "16px",
      fontWeight: "400",
      fontFamily: "Poppins",
      labels: {
        colors: "#212427",
        useSeriesColors: false,
      },
      markers: {
        width: 10,
        height: 10,
        radius: 5,
      },
      formatter: function (seriesName, opts) {
        return `${seriesName} - ${opts?.w?.globals?.series[opts?.seriesIndex]}`;
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: any) {
        return `${val.toFixed(1)}%`;
      },
    },
  });

  useEffect(() => {
    if (list === undefined) return;
    setSeries(list);
  }, [list]);

  useEffect(() => {
    if (labelData === undefined) return;
    setOptions((prevOptions) => {
      return {
        ...prevOptions,
        labels: labelData,
        plotOptions: {
          ...prevOptions?.plotOptions,
          pie: {
            ...prevOptions?.plotOptions?.pie,
            donut: {
              ...prevOptions?.plotOptions?.pie?.donut,
              labels: {
                ...prevOptions?.plotOptions?.pie?.donut?.labels,
                total: {
                  ...prevOptions?.plotOptions?.pie?.donut?.labels?.total,
                  label: `${series?.reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
                  )} ${name}`,
                },
              },
            },
          },
        },
      };
    });
  }, [series, labelData]);

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current.chart;

      if (highlightIndex !== null) {
        const colors = options?.colors?.map((color, index) =>
          index === highlightIndex ? "#f00" : color
        );
        console.log(colors)
        const color = options?.colors?.filter((color, index) =>
          index === highlightIndex && color
        );
        const labels = options.labels?.map((label, index) =>
          index === highlightIndex ? updateLabelText(label,color) : label
        );
        chart.updateOptions({
          colors
        }); 
      } else {
        chart.updateOptions({
          colors: [
            "#388AEB",
            "#54CA6E",
            "#E7C200",
            "#E1654A",
            "#212427",
            "#E1654A",
            "#212427",
          ],
        });
       
       
      }
    }
  }, [highlightIndex]);

  const updateLabelText = (index: string,color:any) => {
    console.log(color)
    if (chartRef?.current) {
      const chart = chartRef?.current?.chart;
      const newDataLabel = index; 
      chart.updateOptions({
        
        plotOptions: {
         
          pie: {
            donut: {
              labels: {
                total: {
                  label: newDataLabel,
                  color:color?.[0]
                },
              },
            },
          },
        },
      });
    }
  };

  return (
    <div id={id} className="bg-white rounded-lg shadow-md w-full h-full p-4">
      <Chart
        // ref={chartRef}
        options={options}
        series={series}
        type="donut"
        height={450}
      />
      
    </div>
  );
};

export default OverViewResultChart;


