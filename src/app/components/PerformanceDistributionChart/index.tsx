"use client";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface UsageEvaluationPerformProps {
  list: number[] | undefined;
  categories: string[] | undefined;
}

const PerformanceDistributionChart: React.FC<UsageEvaluationPerformProps> = ({list= [], categories= []  }) => {

  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false, // Disable the menu icon
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '40%', // Adjust the bar height as needed
        borderRadius: 10, // Add border radius to the bars
        borderRadiusApplication: 'end',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['<46', '46 - 93', '93 - 140', '140 - 187', '187 - 234', '234 - 281', '281 - 328', '328 - 375', '375 - 422', '422+'],
      title: {
        text: 'Number of Executions',
        offsetY: 10,
        style: {
          fontWeight: 400,
          color: "#909193",
          fontSize: "16px",
          fontFamily: "poppins"
        },
      },
      labels: {
        style: {
          colors: "#212427", // Change the color of the category labels
          fontSize: "12px", // Adjust the font size
          fontFamily: "Poppins", // Change the font family
          fontWeight: 600, // Adjust the font weight
        },
      },
      tickAmount: 3, // Ensure only 0, 10, 20, 30 are shown
    },
    yaxis: {
      title: {
        text: 'Executions Time (Seconds)',
        offsetX: 15,
        style: {
          fontWeight: 400,
          color: "#909193",
          fontSize: "16px",
          fontFamily: "poppins"
        },
      },
      labels: {
        style: {
          colors: "#212427", // Change the color of the category labels
          fontSize: "12px", // Adjust the font size
          fontFamily: "Poppins", // Change the font family
          fontWeight: 600, // Adjust the font weight
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
    <div className="bg-white rounded-lg shadow-md w-full h-full">
      <Chart options={options} series={series} type="bar" height={450} />
    </div>
  );
};

export default PerformanceDistributionChart;
