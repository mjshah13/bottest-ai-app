import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { TestStatus } from "../../../../utils/typesInterface";

interface TestResultChartProps {
  testStatuses: TestStatus[];
  suiteRunNames: string[];
}

const TestResultChart: React.FC<TestResultChartProps> = ({
  testStatuses,
  suiteRunNames,
}) => {
  const [series, setSeries] = useState<
    { data: number[]; name: string; color: string }[]
  >([
    {
      name: "",
      data: [],
      color: "",
    },
  ]);

  useEffect(() => {
    if (testStatuses) {
      setSeries(
        testStatuses.map((item) => ({
          name: item.name,
          data: item.data,
          color: getColorClass(item?.name),
        }))
      );
    }
  }, [testStatuses]);

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        ...prevOptions.xaxis,
        categories: suiteRunNames,
      },
    }));
  }, [suiteRunNames]);

  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: "bar",
      stacked: true,
      stackType: "100%",
      zoom: {
        enabled: false,
      },
    },

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        borderRadiusApplication: "end", // 'around', 'end'
        borderRadiusWhenStacked: "last", // 'all', 'last'
      },
    },
    title: {
      text: "Test Result by Test Suite Runs",
      align: "left",
      style: {
        fontSize: "14px",
        fontWeight: "500",
        fontFamily: "Poppins",
        color: "text-black",
      },
    },
    xaxis: {
      categories: [],
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
      title: {
        text: "Percent",
        style: {
          color: "text-black",
          fontWeight: "font-normal",
          fontFamily: "Poppins",
        },
      },
    },
    dataLabels: {
      style: {
        colors: ["text-black"],
        fontSize: "8px",
        fontFamily: "Poppins",
        fontWeight: "500",
      },
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
    fill: {
      opacity: 1,
    },
  });

  return (
    <div className="w-full  mt-8">
      <div className="chart">
        <Chart options={options} series={series} type="bar" height={260} />
      </div>
    </div>
  );
};

export default TestResultChart;

const getColorClass = (status: string) => {
  switch (status) {
    case "Running":
      return "#388aeb";
    case "Pass":
      return "#54CA6E";
    case "Fail":
      return "#E1654A";
    case "Error":
      return "#E1654A";
    case "Mixed":
      return "#E7C200";
    case "Skipped":
      return "#212427";
    case "Stopped":
      return "#212427";
    default:
      return "";
  }
};
