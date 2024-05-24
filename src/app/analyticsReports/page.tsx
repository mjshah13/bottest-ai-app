"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Grid, Table } from "@radix-ui/themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CustomButton from "../../Elements/button";
import PerformanceDistributionChart from "../components/PerformanceDistributionChart";
import OverViewResultChart from "../components/overViewResultChart";
import Link from "next/link";
import Loader from "../components/loader";
import Skeleton from "react-loading-skeleton";
import { AnalyticsReportType } from "../../utils/typesInterface";
import useAnalyticsReport from "../../hooks/useAnalyticsReport";
import { useUser } from "@clerk/nextjs";


const AnalyticsReports = () => {
  const { user } = useUser();
  
  const {fetchAnalyticsReport,data,loading} = useAnalyticsReport();

  useEffect(() => {
    fetchAnalyticsReport("srn_tpozdSE3jwJSmfGIYTunXfh5zynQd");
  }, [user]);

  


  return (
    <div
      className="w-[100%] h-[100%] p-[80px] font-poppin max-w-[1440px]   "
      style={{ margin: "0 auto" }}
    >
      <div className=" ">
        <div className="flex h-16 shrink-0 items-center">
          <Image
            width={148}
            height={32}
            className="h-8 w-auto"
            src="/Assets/Logo.svg"
            alt="Your Company"
          />
        </div>
        <div className=" pb-20">
          <h1 className="text-[35px] font-poppin font-bold text-[#212427]">
            Feature Suite Run{" "}
            <span className="text-[#388AEB] font-bold text-[20px]">
              (Executed on 2 Feb 2024, 10:32 AM PST)
            </span>
          </h1>
          <h2 className="text-[24px] text-[#909193]  font-poppins font-black pb-8">
            Comparison Suite Run: 21 Jan 2024, 12:46 PM PST
          </h2>
          <p className="text-[16px] text-[#212427] font-poppin font-bold pb-6">
            The following Tests were executed and evaluated in the Suite Run:
          </p>

          <Table.Root variant="surface" size={"2"}>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell
                  style={{ width: "420px" }}
                  className="border-r border-[#d2cdcd] text-sm font-semibold dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30]"
                >
                  Test
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell
                  style={{ width: "172px" }}
                  className="border-r border-[#d2cdcd] text-sm font-semibold dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30]"
                >
                  Success Criteria
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell
                  style={{ width: "172px" }}
                  className="border-r border-[#d2cdcd] text-sm font-semibold dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30]"
                >
                  Baselines
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell
                  style={{ width: "172px" }}
                  className="border-r border-[#d2cdcd] text-sm font-semibold dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30]"
                >
                  Variants
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell
                  style={{ width: "172px" }}
                  className="border-r border-[#d2cdcd] text-sm font-semibold dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30]"
                >
                  Iterations
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell
                  style={{ width: "172px" }}
                  className=" text-sm font-semibold dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30]"
                >
                  Evaluations
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            {loading ? (
              <Table.Body>
                {Array(5)
                  .fill(5)
                  .map((_, i) => (
                    <Table.Row key={i} className="align-middle">
                      <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                        <Skeleton count={1} width={200} height={30} />
                      </Table.Cell>
                      <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                        <Skeleton count={1} width={200} height={30} />
                      </Table.Cell>
                      <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                        <Skeleton count={1} width={200} height={30} />
                      </Table.Cell>
                      <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                        <Skeleton count={1} width={200} height={30} />
                      </Table.Cell>
                      <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                        <Skeleton count={1} width={200} height={30} />
                      </Table.Cell>
                      <Table.Cell className=" dark:border-[#373a3b]">
                        <Skeleton count={1} width={100} height={30} />
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            ) : (
              <Table.Body>
                {data?.tests?.map((item, i) => (
                  <Table.Row key={i} className="align-middle">
                    <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                      {item.test_name}
                    </Table.Cell>
                    <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                      {item?.use_default_success_criteria === false ? (
                        <button className="w-[75px] rounded py-1 px-3 bg-[#D6E6F7] text-[12px]">
                          default
                        </button>
                      ) : (
                        <button className="w-[75px] rounded py-1 px-3 bg-[#388AEB] text-[#FDFCFA] text-[12px]">
                          Custom
                        </button>
                      )}
                    </Table.Cell>
                    <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                      {item?.baseline_count}
                    </Table.Cell>
                    <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                      {item?.variant_count}
                    </Table.Cell>
                    <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                      {item?.iteration_count}
                    </Table.Cell>
                    <Table.Cell className=" dark:border-[#373a3b]">
                      {item?.evaluation_count}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            )}
          </Table.Root>
        </div>
        <div className="">
          <div className="bg-[#D6E6F7] h-[78px] flex items-center ps-4 rounded">
            <h1 className="text-[#314F8F] font-poppin font-bold text-[30px]">
              Overview of Results
            </h1>
          </div>
          <div className="pt-6">
            <ul className="list-disc ps-6">
              <li className="text-[16px] text-[#212427] font-normal leading-6 font-poppin">
                A total of {data?.overview?.total_test_count} Tests,{" "}
                {data?.overview?.total_variant_count} Variants, and{" "}
                {data?.overview?.total_evaluation_count} Evaluations were
                included in this Suite run.
              </li>
              <li className="text-[16px] text-[#212427] font-normal leading-6 font-poppin">
                <span className="text-[#54CA6E]">
                  {data?.overview?.test_pass_rate !== undefined &&
                    (Math.round(data?.overview?.test_pass_rate) * 100) / 100}
                  % of Tests passed
                </span>{" "}
                fully (with no failures),
                <span className="text-[#54CA6E]">up 4%</span> the 26 Jan 2024
                Production Run.
              </li>
            </ul>
          </div>
          {/* charts */}
          <div className=" pt-6">
            <Grid columns={{ initial: "1", md: "2" }} gap="7" width="auto">
              <Box className="border rounded-2xl border-[#F0F0F0]">
                <h1 className="h-[68px] flex items-center ps-6 border-b border-[#F0F0F0] text-[20px] font-poppins font-extrabold text-[#212427]">
                  Number Of Tests
                </h1>
                <div className="px-4 flex justify-center items-center h-[84%]">
                  {loading ? (
                    <Skeleton count={1} width={350} height={350} circle />
                  ) : (
                    <OverViewResultChart
                      list={data?.overview?.test_status_counts}
                      labelData={data?.overview?.run_statuses}
                      name="Tests"
                    />
                  )}
                </div>
              </Box>
              <Box className="border rounded-2xl border-[#F0F0F0]">
                <h1 className="h-[68px] flex items-center ps-6 border-b border-[#F0F0F0] text-[20px] font-poppins font-extrabold text-[#212427]">
                  Comparison
                </h1>
                <div className="px-4 flex justify-center items-center h-[84%]">
                  {loading ? (
                    <Skeleton count={1} width={350} height={350} circle />
                  ) : (
                    <OverViewResultChart
                      list={data?.overview?.comparison_test_status_counts}
                      labelData={data?.overview?.run_statuses}
                      name="Tests"
                    />
                  )}
                </div>
              </Box>
            </Grid>
            <div className="pt-14 pb-8">
              <ul className="list-disc ps-6">
                <li className="text-[16px] text-[#212427] font-normal leading-6 font-poppin">
                  Out of the <span className="font-bold">110</span> Evaluations
                  performed,
                  <span className="text-[#54CA6E] font-bold">
                    {" "}
                    {data?.overview?.total_evaluation_count} Evaluations{" "}
                    {`(${
                      data?.overview?.evaluation_pass_rate !== undefined &&
                      (Math.round(data?.overview?.evaluation_pass_rate) * 100) /
                        100
                    }%)`}{" "}
                    passed, up 1%{" "}
                  </span>
                  from the{" "}
                  <span className="text-[#314F8F] font-bold">
                    26 Jan 2024 Production Run.
                  </span>
                </li>
              </ul>
            </div>
            <Grid columns={{ initial: "1", md: "2" }} gap="7" width="auto">
              <Box className="border rounded-2xl border-[#F0F0F0]">
                <h1 className="h-[68px] flex items-center ps-6 border-b border-[#F0F0F0] text-[20px] font-poppins font-extrabold text-[#212427]">
                  Number Of Evaluations
                </h1>
                <div className="px-4 flex justify-center items-center h-[84%]">
                  {loading ? (
                    <Skeleton count={1} width={350} height={350} circle />
                  ) : (
                    <OverViewResultChart
                      list={data?.overview?.evaluation_status_counts}
                      labelData={data?.overview?.run_statuses}
                      name="Evaluations"
                    />
                  )}
                </div>
              </Box>
              <Box className="border rounded-2xl border-[#F0F0F0]">
                <h1 className="h-[68px] flex items-center ps-6 border-b border-[#F0F0F0] text-[20px] font-poppins font-extrabold text-[#212427]">
                  Comparison
                </h1>
                <div className="px-4 flex justify-center items-center h-[84%]">
                  {loading ? (
                    <Skeleton count={1} width={350} height={350} circle />
                  ) : (
                    <OverViewResultChart
                      list={data?.overview?.comparison_evaluation_status_counts}
                      labelData={data?.overview?.run_statuses}
                      name="Evaluations"
                    />
                  )}
                </div>
              </Box>
            </Grid>
          </div>
          <div className="pt-20">
            <div className="bg-[#D6E6F7] h-[78px] flex items-center ps-4 rounded">
              <h1 className="text-[#314F8F] font-poppin font-bold text-[30px]">
                Improvements
              </h1>
            </div>
            <div className="pt-6">
              <ul className="list-disc ps-6">
                <li className="text-[16px] text-[#212427] font-normal leading-6 font-poppin">
                  The following Tests saw a
                  <span className="text-[#54CA6E]"> higher pass rate</span> as
                  compared to the{" "}
                  <span className="text-[#314F8F]">
                    26 Jan 2024 Production Run:
                  </span>
                </li>
              </ul>
            </div>
            <div className="pt-8">
              <Table.Root variant="surface" size={"2"}>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell
                      style={{ width: "420px" }}
                      className="border-r border-[#d2cdcd] text-sm font-semibold dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30]"
                    >
                      Test
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell
                      style={{ width: "420px" }}
                      className="border-r border-[#d2cdcd] text-sm font-semibold dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30]"
                    >
                      Pass Rate
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell
                      style={{ width: "420px" }}
                      className=" border-[#d2cdcd] text-sm font-semibold dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30]"
                    >
                      Comparison Pass Rate
                    </Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                {loading ? (
                  <Table.Body>
                    {Array(2)
                      ?.fill(2)
                      .map((_, i) => (
                        <Table.Row key={i} className="align-middle">
                          <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                            <Skeleton count={1} width={200} height={30} />
                          </Table.Cell>
                          <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                            <Skeleton count={1} width={200} height={30} />
                          </Table.Cell>
                          <Table.Cell className=" border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                            <Skeleton count={1} width={200} height={30} />
                          </Table.Cell>
                        </Table.Row>
                      ))}
                  </Table.Body>
                ) : (
                  <Table.Body>
                    {data?.improvements?.test_improvements?.map((item, i) => (
                      <Table.Row key={i} className="align-middle">
                        <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                          {item.test_name}
                        </Table.Cell>

                        <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                          {(Math.round(item.pass_rate) * 100) / 100}%
                        </Table.Cell>
                        <Table.Cell className=" border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                          {(Math.round(item.comparison_pass_rate) * 100) / 100}%
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                )}
              </Table.Root>
            </div>
          </div>
          <div className="pt-20">
            <div className="bg-[#D6E6F7] h-[78px] flex items-center ps-4 rounded">
              <h1 className="text-[#314F8F] font-poppin font-bold text-[30px]">
                Test Failure Details
              </h1>
            </div>
            <div className="pt-6">
              <ul className="list-disc ps-6">
                <li className="text-[16px] text-[#212427] font-normal leading-6 font-poppin">
                  The following
                  <span className="text-[#E1654A]"> failures</span> or{" "}
                  <span className="text-[#E7C200]">mixed results</span> occurred
                  during the Suite run:
                </li>
              </ul>
            </div>
            <div className="pt-8">
              <Table.Root variant="surface" size={"2"}>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell
                      style={{ width: "420px" }}
                      className="border-r border-[#d2cdcd] text-sm font-semibold dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30]"
                    >
                      Test
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell
                      style={{ width: "200px" }}
                      className="border-r border-[#d2cdcd] text-sm font-semibold dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30]"
                    >
                      Pass Rate
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell
                      style={{ width: "660px" }}
                      className=" border-[#d2cdcd] text-sm font-semibold dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30]"
                    >
                      Failure Summary
                    </Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                {loading ? (
                  <Table.Body>
                    {Array(2)
                      ?.fill(2)
                      .map((_, i) => (
                        <Table.Row key={i} className="align-middle">
                          <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                            <Skeleton count={1} width={200} height={30} />
                          </Table.Cell>
                          <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                            <Skeleton count={1} width={200} height={30} />
                          </Table.Cell>
                          <Table.Cell className=" border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                            <Skeleton count={1} width={200} height={30} />
                          </Table.Cell>
                        </Table.Row>
                      ))}
                  </Table.Body>
                ) : (
                  <Table.Body>
                    {data?.failures?.test_failures.map((item, i) => (
                      <Table.Row key={i} className="align-middle">
                        <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                          {item?.test_name}
                        </Table.Cell>

                        <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                          {Math.round((item?.pass_rate * 100) / 100)}%
                        </Table.Cell>
                        <Table.Cell className=" border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                          {item?.failure_summary}{" "}
                          <Link href="/app/dashboard">(See Test Run)</Link>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                )}
              </Table.Root>
            </div>
          </div>
          <div className="pt-20">
            <div className="bg-[#D6E6F7] h-[78px] flex items-center ps-4 rounded">
              <h1 className="text-[#314F8F] font-poppin font-bold text-[30px]">
                Performance
              </h1>
            </div>
            <div className="pt-6">
              <ul className="list-disc ps-6">
                <li className="text-[16px] text-[#212427] font-normal leading-6 font-poppin">
                  The average Test completion time was{" "}
                  <span className="font-black"> 50.6</span> seconds, which is
                  <span className="text-[#54CA6E]"> 13% faster</span> as
                  compared to the 26 Jan 2024 Production Run
                </li>
              </ul>
            </div>
            {/* {chart} */}
            <div className=" mt-6 mb-10">
              <Grid columns={{ initial: "1", md: "2" }} gap="7" width="auto">
                <Box className="border rounded-2xl border-[#F0F0F0]">
                  <h1 className="h-[68px] flex items-center ps-6 border-b border-[#F0F0F0] text-[20px] font-poppins font-extrabold text-[#212427]">
                    Performance Distribution
                  </h1>
                  <div className="px-4 flex justify-center items-center h-[84%]">
                    {loading ? (
                      <Skeleton count={1} width={400} height={400} />
                    ) : (
                      <PerformanceDistributionChart
                        categories={data?.performance?.buckets}
                        list={data?.performance?.values}
                      />
                    )}
                  </div>
                </Box>
                <Box className="border rounded-2xl border-[#F0F0F0]">
                  <h1 className="h-[68px] flex items-center ps-6 border-b border-[#F0F0F0] text-[20px] font-poppins font-extrabold text-[#212427]">
                    Comparison
                  </h1>
                  <div className="px-4 flex justify-center items-center h-[84%]">
                    {loading ? (
                      <Skeleton count={1} width={400} height={400} />
                    ) : (
                      <PerformanceDistributionChart
                        categories={data?.performance?.buckets}
                        list={data?.performance?.comparison_values}
                      />
                    )}
                  </div>
                </Box>
              </Grid>
            </div>
            <div className="pt-6">
              <ul className="list-disc ps-6">
                <li className="text-[16px] text-[#212427] font-normal leading-6 font-poppin">
                  The following Tests had an average run time that was
                  <span className="text-[#E1654A] font-bold">
                    {">10% slower"}
                  </span>{" "}
                  compared to the{" "}
                  <span className="text-[#314F8F] font-bold">
                    26 Jan 2024 Production Run
                  </span>
                </li>
              </ul>
            </div>
            <div className="pt-8">
              <Table.Root variant="surface" size={"2"}>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell
                      style={{ width: "480px" }}
                      className="border-r border-[#d2cdcd] text-sm font-semibold dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30] no-wrap"
                    >
                      Test
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell
                      style={{ width: "218px" }}
                      className="border-r border-[#d2cdcd] text-sm font-semibold dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30] no-wrap"
                    >
                      Average Run Time
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell
                      style={{ width: "280px" }}
                      className="border-r border-[#d2cdcd] text-sm font-semibold dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30] "
                    >
                      Comparison Average Run Time
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell
                      style={{ width: "100px" }}
                      className="border-r border-[#d2cdcd] text-sm font-semibold dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30]"
                    >
                      % Slower
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell
                      style={{ width: "150px" }}
                      className="border-r border-[#d2cdcd] text-sm font-semibold dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30]"
                    >
                      Min Run Time
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell
                      style={{ width: "150px" }}
                      className="border-[#d2cdcd] text-sm font-semibold dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30]"
                    >
                      Max Run Time
                    </Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                {loading ? (
                  <Table.Body>
                    {Array(3)
                      ?.fill(3)
                      .map((item, i) => (
                        <Table.Row key={i} className="align-middle">
                          <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                            <Skeleton count={1} width={200} height={30} />
                          </Table.Cell>

                          <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                            <Skeleton count={1} width={200} height={30} />
                          </Table.Cell>
                          <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                            <Skeleton count={1} width={200} height={30} />
                          </Table.Cell>
                          <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                            <Skeleton count={1} width={200} height={30} />
                          </Table.Cell>
                          <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                            <Skeleton count={1} width={200} height={30} />
                          </Table.Cell>
                          <Table.Cell className=" border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                            <Skeleton count={1} width={100} height={30} />
                          </Table.Cell>
                        </Table.Row>
                      ))}
                  </Table.Body>
                ) : (
                  <Table.Body>
                    {data?.performance?.test_performances?.map((item, i) => (
                      <Table.Row key={i} className="align-middle">
                        <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                          {item?.test_name}
                        </Table.Cell>

                        <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                          {item?.average_run_time?.toFixed(1)} sec
                        </Table.Cell>
                        <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                          {item?.comparison_average_run_time?.toFixed(1)} sec
                        </Table.Cell>
                        <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                          {(Math.round(item?.percent_slower) * 100) / 100}%
                        </Table.Cell>
                        <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                          {item?.min_run_time?.toFixed(1)} sec
                        </Table.Cell>
                        <Table.Cell className=" border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                          {item?.max_run_time?.toFixed(1)} sec
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                )}
              </Table.Root>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReports;
