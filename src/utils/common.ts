import { filter } from "lodash";
import { AnalyticsReportType, Test, TestType } from "./typesInterface";
import moment from "moment";
import { Wrench, Map, KeyRound, Database } from "lucide-react";

export const ROOT_API_URL = `https://kkhcslhnef.execute-api.us-east-1.amazonaws.com/`;

export const filterOptions = [
  {
    key: 1,
    label: "View all",
    status: "View all",
    include: false,
  },
  {
    key: 2,
    label: "Failed",
    status: "Fail",
    include: true,
  },
  {
    key: 3,
    label: "Passed",
    status: "Pass",
    include: true,
  },
  {
    key: 4,
    label: "Mixed",
    status: "Mixed",
    include: true,
  },
  {
    key: 5,
    label: "Running",
    status: "Running",
    include: true,
  },
  {
    key: 6,
    label: "Stopped",
    status: "Stopped",
    include: true,
  },
  {
    key: 7,
    label: "Skipped",
    status: "Skipped",
    include: true,
  },
  {
    key: 1,
    label: "Error",
    status: "Error",
    include: true,
  },
];

export const getStatuses = filterOptions
  ?.filter((status) => status?.include)
  ?.map((status) => status?.status);

export const TabBtn = ["Suite’s default", "Custom"];

export const configOption = {
  most_recent_same_environment: "most_recent_same_environment",
  most_recent_different_environment: "most_recent_different_environment",
  specific_suite_run: "specific_suite_run",
};
export const printReport = (
  data: AnalyticsReportType | undefined
) => `<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bottest ai</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Sans+Arabic:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Outfit:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Press+Start+2P&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">

<style>
    body {
        font-family: 'Poppins', sans-serif;
        margin: 0;
        padding: 0;
        /* background-color: #f4f6f8; */
    }
    .container {
        max-width: 1440px;
        width: 80%;
        margin: auto;
        padding-top: 4rem;
        padding-bottom: 3rem;
    }
    .header {
        flex-direction: column;
        display: flex;
        align-items: flex-start;
        padding-bottom: 20px;
    }
    .header img {
        margin-bottom: 1.6rem;
        /* height: 50px; */
        /* margin-right: 20px; */
    }
    .header h1 {
        font-size: 38px;
        margin: 0;
        color: #212427;
        font-weight: 600;
    }
    .header .small-text{
        font-size: 23px;
        font-weight: 600;
        color: #388AEB;
        align-items: center;
    }
    .header h2 {
        color: #7c8897;
        margin: 5px 0 0 0;
        font-size: 23px;
        font-weight: 600;


    }
    
    .section {
        margin: 20px 0;
    }
    .section h2 {
        font-size: 30px;
        color: #314F8F;
        background-color: #D6E6F7;
        height: 78px;
        font-weight: 600;
        border-radius: 8px;
        display: flex;
        align-items: center;
        padding-left: 1.4rem;
        margin-top:4.5rem;
    }
    .content p {
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        color: #212427;
        padding-bottom: 1rem;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
    }
    table th, table td {
        padding: 10px;
        text-align: left;
        border: 1px solid #e0e0e0;
        font-size: 14px;
        color: #212427;
        font-weight: 400;
    }
    table th {
        background-color: #FDFCFA;
       font-weight: 600;
       color: #000000;
       white-space: nowrap;
       
    }
    .chart-container {
        display: flex;
        justify-content: space-between;
        margin: 20px 0;
    }
    .chart {
        width: 48%;
    }
    .highlight {
        color: #50b35f;
        font-weight: 600;
    }
    .highlight-red {
        color: #d9534f;
        font-weight: 600;
    }
    .highlight-yellow {
        color: #f0ad4e;
        font-weight: 600;
    }
    .bg-light {
        border-radius: 8px;
        border: 1px solid #f0f0f0;
    }
    .chart-heading{
        height: 68px;
        display: flex;
        align-items: center;
        margin: 0;
        padding: 0;
        padding-left: 1rem;
        border-bottom: 1px solid #f0f0f0;
        font-size: 20px;
        font-weight: 600;
        color: #212427;
    }
    .title {
        font-size: 24px;
        margin: 0;
        color: #3b4a60;
    }
    .subtitle {
        font-size: 14px;
        color: #7c8897;
        margin: 5px 0 0 0;
    }
    .list{
        padding: 0;
        padding-left: 1.3rem !important;
        display: flex;
        flex-direction: column;
        gap: 0.4rem !important;
        list-style-type:disc !important;
        padding-top:0.8rem !important;
        padding-bottom:0.8rem !important;

    }
    .list-item{
        color: #212427;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
    }
    .highlight-blue{
        color: #314F8F;
    }
    .link-text{
        color: #212427;
    }
    .highlight-dark{
        font-weight: 600;
    }
    #barchart{
        padding: 1rem;
    }
    #barchart2{
        padding: 1rem;
    }
    #piechart1,#piechart2{
        padding:1rem;
    }
   .content-text{
     padding-top: 1rem;
     margin-bottom: 2rem;
     background-color: red;
   }
   .font-bold{
    font-weight: 600;
   }
   .list-pt{
    padding: 0;
    padding-left: 1rem !important; 
    padding-top:2rem !important;
    padding-bottom: 1rem !important;
    list-style-type:disc !important;
    
   }
</style>
  <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>

</head>
<body>

  <div id="content">
    <div class="container">
        <div class="header">
            <div>
            <img src="/Assets/Logo.svg" alt="Logo">

            </div>
            <div>
                <h1 class="title">${
                  data?.suite_name
                } Suite Run <span class="small-text">(Executed on ${moment(
  data?.suite_run_timestamp
).format("D MMM YYYY, h:mm A")} PST)</span></h1>  
                <h2 class="subtitle">Comparison Suite Run: ${moment(
                  data?.suite_run_timestamp
                ).format("D MMM YYYY, h:mm A")} PST</h2>
            </div>
        </div>

        <div class="section content">
            <p>The following Tests were executed and evaluated in the Suite Run:</p>
            <table>
                <thead>
                    <tr>
                        <th>Test</th>
                        <th>Success Criteria</th>
                        <th>Baselines</th>
                        <th>Variants</th>
                        <th>Iterations</th>
                        <th>Evaluations</th>
                    </tr>
                </thead>
                <tbody>
                ${data?.tests
                  ?.map((test: Test) => {
                    return `
                  <tr>
                      <td>${test?.test_name}</td>
                      <td>${
                        test?.use_default_success_criteria
                          ? "Default"
                          : "Custom"
                      }</td>
                      <td>${test?.baseline_count}</td>
                      <td>${test?.variant_count}</td>
                      <td>${test?.iteration_count}</td>
                      <td>${test?.evaluation_count}</td>
                  </tr>
                  `;
                  })
                  .join("")}
                   
                </tbody>
            </table>
        </div>

        <div class="section">
            <h2>Overview of Results</h2>
            <p class="content">
                <ul class="list">
                    <li class="list-item">A total of ${
                      data?.overview?.total_test_count
                    } Tests,
                    ${data?.overview?.total_variant_count} Variants, and
                    ${data?.overview?.total_evaluation_count} Evaluations were
                    included in this Suite run.</li>
                    <li class="list-item"><span class="highlight">${data?.overview?.test_pass_rate?.toFixed(
                      2
                    )}%
                    of Tests passed</span>  fully (with no failures), <span class="highlight">up ${data?.overview?.delta_test_pass_rate.toFixed(
                      1
                    )}%</span> the <span class="highlight-blue">26 ${
  data?.comparison_run_name ? data?.comparison_run_name : data?.suite_name
}
                    Run.</span> </li>

                </ul>
            </p>
            
            <div class="chart-container">
                <div class="chart">
                    <div class="bg-light">
                        <h3 class="chart-heading">Number Of Tests</h3>
                        <div id="piechart1">

                        </div>
                      
                    </div>
                </div>
                <div class="chart">
                    <div class="bg-light">
                        <h3 class="chart-heading">Comparison</h3>
                        <div id="piechart2">
                        </div>
                       
                    </div>
                </div>
            </div>
            
                <ul class="list-pt">
                    <li class="list-item">Out of the <span class="highlight-dark">${
                      data?.overview?.total_evaluation_count
                    }</span> Evaluations performed, <span class="highlight">${(
  (data?.overview?.total_evaluation_count || 0) *
  (data?.overview?.evaluation_pass_rate || 0)
).toFixed(1)} Evaluations (${data?.overview?.evaluation_pass_rate.toFixed(
  1
)}%) passed, up ${data?.overview?.delta_evaluation_pass_rate.toFixed(
  0
)}%</span> from the <span class="highlight-blue font-bold">${
  data?.comparison_run_name ? data?.comparison_run_name : data?.suite_name
}
Run.</span> </li>

                </ul>
              
            <div class="chart-container">
                <div class="chart">
                    <div class="bg-light">
                        <h3 class="chart-heading">Number Of Evaluations</h3>
                        <div id="piechart3">

                        </div>
                      
                    </div>
                </div>
                <div class="chart">
                    <div class="bg-light">
                        <h3 class="chart-heading">Comparison</h3>
                        <div id="piechart4">
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>Improvements</h2>
            <p class="content">
                <ul class="list">
                    <li class="list-item">The following Tests saw a <span class="highlight">higher pass rate</span> as compared to the <span class="highlight-blue">${
                      data?.comparison_run_name
                        ? data?.comparison_run_name
                        : data?.suite_name
                    } Run:</span> </li>

                </ul>
                
            </p>
            <table>
                <thead>
                    <tr>
                        <th>Test</th>
                        <th>Pass Rate</th>
                        <th>Comparison Pass Rate</th>
                    </tr>
                </thead>

                <tbody>
                ${data?.improvements?.test_improvements
                  ?.map((item) => {
                    return `
                  <tr>
                 
                  <td>${item?.test_name}</td>
                  <td>${item?.pass_rate.toFixed(1)}%</td>
                  <td>${item?.comparison_pass_rate.toFixed(1)}%</td>
              
                  </tr>
                  `;
                  })
                  .join("")}
                   
                </tbody>
            </table>
        </div>

        <div class="section">
            <h2>Test Failure Details</h2>
            <p class="content">
                <ul class="list">
                    <li class="list-item">
                The following <span class="highlight-red">failures</span> or <span class="highlight-yellow">mixed results</span> occurred during the Suite run:

                    </li>
                </ul>
            </p>
            <table>
                <thead>
                    <tr>
                        <th>Test</th>
                        <th>Pass Rate</th>
                        <th>Failure Summary</th>
                    </tr>
                </thead>
                <tbody>
                ${data?.failures?.test_failures
                  ?.map((item) => {
                    return `
                  <tr>
                        <td>${item?.test_name}</td>
                        <td>${(item?.pass_rate).toFixed(1)}%</td>
                        <td>${
                          item?.failure_summary
                        } <a href="#" class="link-text">(See Test Run)</a></td>
                    </tr>
                  `;
                  })
                  .join("")}
                    
                </tbody>
            </table>
        </div>

        <div class="section">
            <h2>Performance</h2>
            <p class="content">
                <ul class="list">
                    <li class="list-item">
                The average Test completion time was <span class="highlight-dark">${data?.performance?.average_run_time.toFixed(
                  1
                )}</span>  seconds, which is <span class="highlight">13% faster</span> as compared to the <span class="highlight-blue font-bold">${
  data?.comparison_run_name ? data?.comparison_run_name : data?.suite_name
} Run</span> 
                    </li>

                </ul>
            </p>
            <div class="chart-container">
                <div class="chart">
                    <div class="bg-light">
                        <h3 class="chart-heading">Performance Distribution</h3>
                        <div id="barchart">
                        </div>
                    </div>
                </div>
                <div class="chart">
                    <div class="bg-light">
                        <h3 class="chart-heading">Comparison</h3>
                        <div id="barchart2">
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>

        <div class="section">
            <p class="content">
                <ul class="list">
                    <li class="list-item">
                The following Tests had an average run time that was <span class="highlight-red">>10% slower</span> compared to the <span class="highlight-blue font-bold">${
                  data?.comparison_run_name
                    ? data?.comparison_run_name
                    : data?.suite_name
                } Run:</span> 

                    </li>

                </ul>
            </p>
            <table>
                <thead>
                    <tr>
                        <th>Test</th>
                        <th>Average Run Time</th>
                        <th>Comparison Average Run Time</th>
                        <th>% Slower</th>
                        <th>Min Run Time</th>
                        <th>Max Run Time</th>
                    </tr>
                </thead>
                <tbody>
                ${data?.performance?.test_performances
                  ?.map((item) => {
                    return `
                  <tr>
                  <td>${item?.test_name}</td>
                  <td>${item?.average_run_time?.toFixed(1)} sec</td>
                  <td>${item?.comparison_average_run_time?.toFixed(1)} sec</td>
                  <td>${item?.percent_slower?.toFixed(1)}%</td>
                  <td>${item?.min_run_time} sec</td>
                  <td>${item?.max_run_time} sec</td>
              </tr>
                  `;
                  })
                  .join("")}
                  
                </tbody>
            </table>
        </div>
    </div>
   
  </div>


 <script>
  async function generatePDF() {
    const content = document.getElementById('content');

    // Use html2canvas to convert the content to a canvas
    const canvas = await html2canvas(content);

    // Convert the canvas to an image (data URL)
    const imgData = canvas.toDataURL('image/png');
    console.log(imgData);

    // Create a new jsPDF instance
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'pt', '');
      const height = window.document;
    const desiredHeight = 1480; // Adjust this value as needed (in points)
doc.internal.pageSize.setHeight(desiredHeight);
    // Calculate the dimensions of the PDF page and adjust for content height
    const pdfWidth = doc.internal.pageSize.getWidth();
    console.log((canvas.height * pdfWidth) / canvas.width)

    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add the image to the PDF
    doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, desiredHeight);

    // Save the generated PDF
    doc.save("${data?.suite_name} Suite Run");
}
  
          window.addEventListener('DOMContentLoaded', function() {
         const data = {
    performance: {
      values: [10, 20, 30],
      comparison_values: [15, 25, 35],
      buckets: ['Test1', 'Test2', 'Test3']
    },
    overview: {
      test_status_counts: [60, 20, 20],
      run_statuses: ['Pass', 'Fail', 'Warning']
    }
  };

  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false
      }
    },
    series: [{
      name: 'Number of Executions',
      data:[4,2,1,6,3,2,3,0,6,0]
    }],
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "40%",
        borderRadius: 10,
        borderRadiusApplication: "end"
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ["<69","69 - 116","116 - 162","162 - 209","209 - 256","256 - 303","303 - 350","350 - 397","397 - 443","443+"],
      title: {
        text: "Number of Tests",
        offsetY: 10,
        style: {
          fontWeight: 400,
          color: "#909193",
          fontSize: "16px",
          fontFamily: 'Poppins', sans-serif,
        }
      },
      labels: {
        style: {
          colors: "#212427",
          fontSize: "12px",
          fontFamily: "Poppins",
          fontWeight: 600
        }
      },
      tickAmount: 3
    },
    tooltip: {
      enabled: true,
      y: {},
      style: {
        fontFamily: "Poppins",
      }
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
        }
      },
      labels: {
        style: {
          colors: "#212427",
          fontSize: "12px",
          fontFamily: "Poppins",
          fontWeight: 600
        }
      },
      reversed: false,
      axisTicks: {
        show: true
      }
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      }
    }
  };
  const comparisonBarOption = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false
      }
    },
    series: [{
      name: 'Number of Executions',
      data: [3,2,6,2,3,4,1,3,3,3]
    }],
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "40%",
        borderRadius: 10,
        borderRadiusApplication: "end"
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ["<69","69 - 116","116 - 162","162 - 209","209 - 256","256 - 303","303 - 350","350 - 397","397 - 443","443+"],
      title: {
        text: "Number of Tests",
        offsetY: 10,
        style: {
          fontWeight: 400,
          color: "#909193",
          fontSize: "16px",
          fontFamily: "Poppins",
        }
      },
      labels: {
        style: {
          colors: "#212427",
          fontSize: "12px",
          fontFamily: "Poppins",
          fontWeight: 600
        }
      },
      tickAmount: 3
    },
    tooltip: {
      enabled: true,
      y: {},
      style: {
        fontFamily: "Poppins",
      }
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
        }
      },
      labels: {
        style: {
          colors: "#212427",
          fontSize: "12px",
          fontFamily: "Poppins",
          fontWeight: 600
        }
      },
      reversed: false,
      axisTicks: {
        show: true
      }
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      }
    }
  };
  
 
  const chart = new ApexCharts(document.querySelector("#barchart"), options);
  const chart2 = new ApexCharts(document.querySelector("#barchart2"), comparisonBarOption);
  chart.render();
  chart2.render();

  const donutOptionOne = {
    chart: {
      type: "donut",
      height: 350
    },
    series: [0,1,2,2,0,0,0],
    labels: ["Running","Pass","Mixed","Fail","Stopped","Error","Skipped"],
    colors: [
      "#388AEB",
      "#54CA6E",
      "#E7C200",
      "#E1654A",
      "#212427"
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
              offsetY: 10
            },
            value: {
              show: false
            },
            total: {
              show: true,
              label:"5 Tests", 
              fontSize: "24px",
              fontWeight: 600,
              fontFamily: "Poppins",
              color: "#909193"
            }
          }
        }
      }
    },
    tooltip: {
      enabled: true,
      style: {
        fontFamily: "Poppins"
      }
    },
    legend: {
      position: "right",
      offsetY: 50,
      fontSize: "16px",
      fontWeight: "400",
      fontFamily: "Poppins",
      labels: {
        colors: "#212427",
        useSeriesColors: false
      },
      markers: {
        width: 10,
        height: 10,
        radius: 5
      }
    },
    dataLabels: {
      enabled: true
    }
  };
  const donutOptionTwo = {
    chart: {
      type: "donut",
      height: 350
    },
    series: [0,1,2,2,0,0,0],
    labels: ["Running","Pass","Mixed","Fail","Stopped","Error","Skipped"],
    colors: [
      "#388AEB",
      "#54CA6E",
      "#E7C200",
      "#E1654A",
      "#212427"
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
              offsetY: 10
            },
            value: {
              show: false
            },
            total: {
              show: true,
              label: "5 Tests",
              fontSize: "24px",
              fontWeight: 600,
              fontFamily: "Poppins",
              color: "#909193"
            }
          }
        }
      }
    },
    tooltip: {
      enabled: true,
      style: {
        fontFamily: "Poppins"
      }
    },
    legend: {
      position: "right",
      offsetY: 50,
      fontSize: "16px",
      fontWeight: "400",
      fontFamily: "Poppins",
      labels: {
        colors: "#212427",
        useSeriesColors: false
      },
      markers: {
        width: 10,
        height: 10,
        radius: 5
      }
    },
    dataLabels: {
      enabled: true
    }
  };
  const donutOptionThree = {
    chart: {
      type: "donut",
      height: 350
    },
    series: [0,12,0,18,0,0,0],
    labels: ["Running","Pass","Mixed","Fail","Stopped","Error","Skipped"],
    colors: [
      "#388AEB",
      "#54CA6E",
      "#E7C200",
      "#E1654A",
      "#212427"
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
              offsetY: 10
            },
            value: {
              show: false
            },
            total: {
              show: true,
              label: "30 Evaluations",
              fontSize: "24px",
              fontWeight: 600,
              fontFamily: "Poppins",
              color: "#909193"
            }
          }
        }
      }
    },
    tooltip: {
      enabled: true,
      style: {
        fontFamily: "Poppins"
      }
    },
    legend: {
      position: "right",
      offsetY: 50,
      fontSize: "16px",
      fontWeight: "400",
      fontFamily: "Poppins",
      labels: {
        colors: "#212427",
        useSeriesColors: false
      },
      markers: {
        width: 10,
        height: 10,
        radius: 5
      }
    },
    dataLabels: {
      enabled: true
    }
  };
  const donutOptionFour = {
    chart: {
      type: "donut",
      height: 350
    },
    series: [0,11,0,19,0,0,0],
    labels: ["Running","Pass","Mixed","Fail","Stopped","Error","Skipped"],
    colors: [
      "#388AEB",
      "#54CA6E",
      "#E7C200",
      "#E1654A",
      "#212427"
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
              offsetY: 10
            },
            value: {
              show: false
            },
            total: {
              show: true,
              label: "30 Evaluations",
              fontSize: "24px",
              fontWeight: 600,
              fontFamily: "Poppins",
              color: "#909193"
            }
          }
        }
      }
    },
    tooltip: {
      enabled: true,
      style: {
        fontFamily: "Poppins"
      }
    },
    legend: {
      position: "right",
      offsetY: 50,
      fontSize: "16px",
      fontWeight: "400",
      fontFamily: "Poppins",
      labels: {
        colors: "#212427",
        useSeriesColors: false
      },
      markers: {
        width: 10,
        height: 10,
        radius: 5
      }
    },
    dataLabels: {
      enabled: true
    }
  };
  const chart1 = new ApexCharts(document.querySelector("#piechart1"), donutOptionOne);
  const chart2Donut = new ApexCharts(document.querySelector("#piechart2"), donutOptionTwo);
  const chart3 = new ApexCharts(document.querySelector("#piechart3"), donutOptionThree);
  const chart4 = new ApexCharts(document.querySelector("#piechart4"), donutOptionFour);

  chart1.render();
  chart2Donut.render();
  chart3.render();
  chart4.render();
          });

           window.addEventListener('load', function() {
            setTimeout(() => {
            generatePDF()
                
            }, 1500);
           
          });
</script>
  
</body>
</html>
			`;
export const homeNavData = [
  {
    label: "Product",
    sub: [
      {
        label: "How it works",
        link: "/product/how-it-works",
      },
      {
        label: "Architecture",
        link: "/product/architecture",
      },
      {
        label: "Key Concepts",
        link: "/product/concepts",
      },
      {
        label: "Deployment Options",
        link: "/product/deployment",
      },
    ],
  },
  {
    label: "Solutions",
    sub: [
      {
        label: "Regression Testing",
        link: "/solutions/regression",
      },
      {
        label: "Performance Testing",
        link: "/solutions/performance",
      },
      {
        label: "Adversarial Testing",
        link: "/solutions/adversarial",
      },
      {
        label: "Multi-Language Testing",
        link: "/solutions/multi-language",
      },
      {
        label: "AI-Powered Coverage",
        link: "/solutions/ai-powered",
      },
    ],
  },
  {
    label: "Pricing",
    link: "/pricing",
  },
  {
    label: "Resources",
    sub: [
      {
        label: "Demos",
        link: "#",
      },
      {
        label: "Q&A",
        link: "/resources/faq",
      },
      {
        label: "Documentation",
        link: "#",
      },
    ],
  },
  {
    label: "Company",
    sub: [
      {
        label: "About us",
        link: "/company/about",
      },
      {
        label: "Contact us",
        link: "/company/contact",
      },
      {
        label: "Blog",
        link: "/blog",
      },
      {
        label: "Careers",
        link: "https://www.linkedin.com/company/bottest-ai/jobs/",
        target: "_blank",
      },
    ],
  },
];

export const homeFooterNavData = [
  {
    title: "Product",
    links: [
      {
        label: "How it works",
        href: "/product/how-it-works",
      },
      {
        label: "Architecture",
        href: "/product/architecture",
      },
      {
        label: "Key Concepts",
        href: "/product/concepts",
      },
      {
        label: "Deployment Options",
        href: "/product/deployment",
      },
    ],
  },
  {
    title: "SOLUTIONS",
    links: [
      {
        label: "Regression Testing",
        href: "/solutions/regression",
      },
      {
        label: "Performance Testing",
        href: "/solutions/performance",
      },
      {
        label: "Adversarial Testing",
        href: "/solutions/adversarial",
      },
      {
        label: "Multi-Language Testing",
        href: "/solutions/multi-language",
      },
      {
        label: "AI-Powered Coverage",
        href: "/solutions/ai-powered",
      },
    ],
  },
  {
    title: "pricing",
    links: [
      {
        label: "Comparison",
        href: "/pricing",
      },
    ],
  },
  {
    title: "resources",
    links: [
      {
        label: "Demos",
        href: "#",
      },
      {
        label: "Q&A",
        href: "/resources/faq",
      },
      {
        label: "Documentation",
        href: "#",
      },
    ],
  },
  {
    title: "company",
    links: [
      {
        label: "About us",
        href: "/company/about",
      },
      {
        label: "Contact us",
        href: "/company/contact",
      },
      {
        label: "Careers",
        href: "https://www.linkedin.com/company/bottest-ai/jobs/",
        target: "_blank",
      },
      {
        label: "Blog",
        href: "/blog",
      },
    ],
  },
];

export const homeStepsData = [
  {
    title: "1. Record",
    description:
      "With just a few clicks, record Tests and set up Baselines for your conversation.",
    img: "/assets/home/record.svg",
  },
  {
    title: "2. Evaluate",
    description:
      "When testing, responses are evaluated against the established Baseline.",
    img: "/assets/home/evaluate.svg",
  },
  {
    title: "3. Improve",
    description:
      "Analytics highlight key areas for improvement in your chatbot.",
    img: "/assets/home/improve.svg",
  },
];

export const architectureHeroData = [
  {
    title: "Chrome Extension",
    description:
      "Record new Tests and run them straight from your browser. Smart recording technology tracks complex UI interactions.",
    link: "#chrome-extension",
  },
  {
    title: "Test Repository",
    description:
      "Manage your full Suite of Tests, Baselines, and Test Run results all in one central place. Share and collaborate across your team.",
    link: "#test-repository",
  },
  {
    title: "Analytics Platform",
    description:
      "Track Test Run data to understand performance over time. Receive emailed reports highlighting changes key metrics.",
    link: "#analytics-platform",
  },
  {
    title: "Test Evaluator",
    description:
      "Have confidence in your chatbot’s performance with the bottest.ai LLM-powered evaluation engine.",
    link: "#test-evaluator",
  },
  {
    title: "bottest.ai Database",
    description:
      "Store all your testing data with built-in security, privacy, reliability, and SOC2 compliance. ",
    link: "#bottestai-database",
  },
  {
    title: "Execution Engine",
    description:
      "Run Tests in the cloud on an automated schedule or hook into existing CI/CD pipelines with secure APIs. ",
    link: "#execution-engine",
  },
];

export const pricingData = [
  {
    title: "Starter",
    description: "For getting started and small scale testing.",
    benefits: [
      "First 100 test runs",
      "1 user",
      "1 bot",
      "1 suite",
      "1 environment",
      "10 tests",
      "1 baseline / test",
    ],
    price: 0,
    button: "Start for free",
  },
  {
    title: "Individual",
    description: "For solo testers, simple projects, or those on a budget.",
    benefits: [
      "1,000/mo test runs",
      "1 user",
      "1 bot",
      "3 suites",
      "2 environments",
      "100 tests",
      "2 baselines / tests",
    ],
    price: 25,
    button: "Get Individual",
  },
  {
    title: "Professional",
    description:
      "For teams and businesses who want full test coverage or have multiple product.",
    benefits: [
      "10,000/mo test runs",
      "5 users",
      "2 bots",
      "8 suites",
      "1 environment",
      "Unlimited tests",
      "5 baselines / tests",
    ],
    price: 500,
    button: "Get Professional",
  },
  {
    title: "Enterprise",
    description:
      "For those needing an enterprise-grade solution, with custom pricing.",
    benefits: [
      "test runs",
      "users",
      "bots",
      "suites",
      "environments",
      "tests",
      "baselines / tests",
    ],
    price: "Let's talk",
    button: "Contact us",
  },
];

export const pricingTable = [
  ["Trending Analytics Dashboard", true, true, true, true],
  ["Suite Run Reports", false, false, true, true],
  ["On-premise Deployment", false, false, false, true],
  ["Webhook Integrations", false, false, false, true],
  ["SSO Integrations", false, false, false, true],
  ["Adversarial Testing", false, false, true, true],
  ["Variant Test Coverage", false, false, true, true],
  ["Multi-language Test Coverage", false, false, true, true],
];

export const faqTitles = [
  {
    title: "What is chatbot testing?",
    index: "what_is_chatbot_testing",
  },
  {
    title: "How do I test a chatbot?",
    index: "how_do_i_test_a_chatbot",
  },
  {
    title: "What are the best practices for chatbot testing?",
    index: "what_are_the_best_practices_for_chatbot_testing",
  },
  {
    title: "How should chatbot test cases be defined?",
    index: "how_should_chatbot_test_cases_be_defined",
  },
  {
    title: "Why is automation essential to software testing for chatbots?",
    index: "why_is_automation_essential_to_software_testing_for_chatbots",
  },
  {
    title:
      "How do traditional automation testing tools fall short when testing AI chatbots?",
    index:
      "how_do_traditional_automation_testing_tools_fall_short_when_testing_ai_chatbots",
  },
  {
    title:
      "How is chatbot testing different from traditional application testing or traditional automation testing?",
    index:
      "how_is_chatbot_testing_different_from_traditional_application_testing_or_traditional_automation_testing",
  },
  {
    title:
      "What are the metrics that measure the success of the chatbot testing process?",
    index:
      "what_are_the_metrics_that_measure_the_success_of_the_chatbot_testing_process",
  },
  {
    title:
      "What are the metrics that measure the success of the chatbot testing process?",
    index:
      "what_are_the_metrics_that_measure_the_success_of_the_chatbot_testing_process1",
  },
];
