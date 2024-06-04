import { filter } from "lodash";
import { AnalyticsReportType, Test, TestType } from "./typesInterface";
import moment from "moment";

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
            <img src="./Assets/Logo.svg" alt="Logo">

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
