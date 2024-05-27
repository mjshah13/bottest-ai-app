"use client"

import React, { use, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface OverViewResultChartProps {
  list:number[] |  undefined
  labelData:string[] | undefined
  name:string | undefined
}

const OverViewResultChart: React.FC<OverViewResultChartProps> = ({list,labelData,name}) => {
  const [series, setSeries] = useState<ApexNonAxisChartSeries>([]);
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: 'donut',
      height: 350,
    },
    labels: [],
    colors: ['#388AEB', '#54CA6E', '#E7C200','#E1654A','#212427','#E1654A','#212427'],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '24px',
              fontWeight: 600,
              offsetY: 10,          
            },
            value: {
              show: false,
            },
            total: {
              show: true,
              label: `${series?.reduce((accumulator, currentValue) => accumulator + currentValue, 0)} Test`,
             fontSize:"24px",
             fontWeight:600,
             fontFamily:"Poppins",
             color:"#909193"
            }
          }
        }
      }
    },
    legend: {
      position: 'right',
      offsetY:50,
      fontSize:"16px",
      fontWeight:"400",
      fontFamily:"Poppins",
      
      labels: {
        colors: '#212427',
        useSeriesColors: false,
        
      },
      
      markers: {
        width: 10,
        height: 10,
        radius: 5,
      },
      formatter: function(seriesName, opts) {
        return `${seriesName} - ${opts?.w?.globals?.series[opts?.seriesIndex]}`;
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function(val:any) {
        return `${val.toFixed(1)}%`;
      },
    },
  });
  useEffect(() => {
    if(list === undefined) return
    setSeries(list)
  }, [list]);
  
  useEffect(() => {
    if(labelData === undefined ) return
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
                  label: `${series?.reduce((accumulator, currentValue) => accumulator + currentValue, 0)} ${name}`,
                },
              },
            },
          },
        },
      };
    });
  }, [series,labelData]);


  return (
    <div className="bg-white rounded-lg shadow-md w-full h-full p-4">
      <Chart options={options} series={series} type="donut" height={450} />
    </div>
  );
};

export default OverViewResultChart;
