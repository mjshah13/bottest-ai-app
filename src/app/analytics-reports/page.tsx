"use client";

import { Box, Grid, Table } from "@radix-ui/themes";
import React, { RefObject, useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import useAnalyticsReport from "../../hooks/useAnalyticsReport";
import { useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import usePDF from "../../hooks/usePDF";
const PerformanceDistributionChart = dynamic(
  () => import("../components/PerformanceDistributionChart"),
  { ssr: false }
);

const OverViewResultChart = dynamic(
  () => import("../components/overViewResultChart"),
  { ssr: false }
);

const AnalyticsReports = () => {
  const [highlightTests, sethighlightTests] = useState<number | null>(null);
  const [highlightEvaluation, setHighlightEvaluation] = useState<number | null>(
    null
  );
  const router = useRouter();
  const { fetchAnalyticsReport, data, loading } = useAnalyticsReport();
  const { generatePDF } = usePDF();
  const searchParams = useSearchParams();
  const suiteRunID = searchParams && searchParams.get("suite_run_id");
  const isPdf = searchParams && searchParams.get("isPdf");
  const { user } = useUser();
  useEffect(() => {
    if (!suiteRunID) return;
    fetchAnalyticsReport(suiteRunID as string);
  }, [user?.id, suiteRunID]);

  useEffect(() => {
    if (isPdf) {
      if (!data) return;
      generatePDF(data);
    }
  }, [data]);
  return (
    <>
      <div
        className="w-[100%] h-[100%] p-[80px] font-poppin max-w-[1440px]   "
        style={{
          margin: "0 auto",
        }}
      >
        <div className=" ">
          <div className="flex h-16 shrink-0 items-center mb-3">
            <Image
              width={148}
              height={32}
              className="h-8 w-auto"
              src="/Assets/Logo.svg"
              alt="Your Company"
            />
          </div>

          <div className=" pb-20">
            <h1 className="text-[35px] font-poppin font-bold text-black">
              {`${data?.suite_name} Suite Run`} {""}
              <span className="text-intermediate font-bold text-[20px]">
                {`Executed on ${data?.suite_run_timestamp}`}
              </span>
            </h1>
            <h2 className="text-[24px] text-[#909193] font-semibold  font-poppins pb-8">
              {`Comparison Suite Run: ${data?.comparison_run_timestamp}`}
            </h2>
            <p className="text-[16px] text-black font-semibold font-poppin  pb-6">
              The following Tests were executed and evaluated in the Suite Run:
            </p>

            <Table.Root
              style={{
                borderLeft: "1px solid #f0f0f0",
                borderRight: "1px solid #f0f0f0",
                borderTop: "1px solid #f0f0f0",
              }}
              size={"2"}
            >
              <Table.Header
                style={{
                  backgroundColor: "#fdfcfa",
                }}
              >
                <Table.Row>
                  <Table.ColumnHeaderCell
                    style={{ width: "420px" }}
                    className="border-r border-tableCellBorder text-sm font-semibold dark:border-r dark:border-tableCellBorderDark dark:bg-tableCellBackgroundDark"
                  >
                    Test
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell
                    style={{ width: "172px" }}
                    className="border-r border-tableCellBorder text-sm font-semibold dark:border-r dark:border-tableCellBorderDark dark:bg-tableCellBackgroundDark"
                  >
                    Success Criteria
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell
                    style={{ width: "172px" }}
                    className="border-r border-tableCellBorder text-sm font-semibold dark:border-r dark:border-tableCellBorderDark dark:bg-tableCellBackgroundDark"
                  >
                    Baselines
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell
                    style={{ width: "172px" }}
                    className="border-r border-tableCellBorder text-sm font-semibold dark:border-r dark:border-tableCellBorderDark dark:bg-tableCellBackgroundDark"
                  >
                    Variants
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell
                    style={{ width: "172px" }}
                    className="border-r border-tableCellBorder text-sm font-semibold dark:border-r dark:border-tableCellBorderDark dark:bg-tableCellBackgroundDark"
                  >
                    Iterations
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell
                    style={{ width: "172px" }}
                    className=" text-sm font-semibold dark:border-r dark:border-tableCellBorderDark dark:bg-tableCellBackgroundDark"
                  >
                    Evaluations
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              {loading ? (
                <Table.Body>
                  {Array(5)
                    ?.fill(5)
                    .map((_, i) => (
                      <Table.Row key={i} className="align-middle">
                        <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                          <Skeleton count={1} width={200} height={30} />
                        </Table.Cell>
                        <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                          <Skeleton count={1} width={200} height={30} />
                        </Table.Cell>
                        <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                          <Skeleton count={1} width={200} height={30} />
                        </Table.Cell>
                        <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                          <Skeleton count={1} width={200} height={30} />
                        </Table.Cell>
                        <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                          <Skeleton count={1} width={200} height={30} />
                        </Table.Cell>
                        <Table.Cell className=" dark:border-tableCellBorderDark">
                          <Skeleton count={1} width={100} height={30} />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              ) : (
                <Table.Body>
                  {data?.tests?.map((item, i) => (
                    <Table.Row key={i} className="align-middle">
                      <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark ">
                        <button
                          className=" hover:underline"
                          onClick={() =>
                            router.push(
                              `/app/dashboard?test_id=${item?.test_id}`
                            )
                          }
                        >
                          {item.test_name}
                        </button>
                      </Table.Cell>
                      <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                        {item?.use_default_success_criteria === false ? (
                          <button className="w-[75px] rounded py-1 px-3  bg-primary text-[12px] flex items-center justify-center">
                            Default
                          </button>
                        ) : (
                          <button className="w-[75px] rounded py-1 px-3 bg-intermediate text-white text-[12px] flex items-center justify-center">
                            Custom
                          </button>
                        )}
                      </Table.Cell>
                      <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                        {item?.baseline_count}
                      </Table.Cell>
                      <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                        {item?.variant_count}
                      </Table.Cell>
                      <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                        {item?.iteration_count}
                      </Table.Cell>
                      <Table.Cell className=" dark:border-tableCellBorderDark">
                        {item?.evaluation_count}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              )}
            </Table.Root>
          </div>

          <div className="">
            <div className="bg-primary h-[78px] flex items-center  ps-4 rounded ">
              <h1 className="text-secondary font-poppin font-bold text-3xl ">
                Overview of Results
              </h1>
            </div>
            <div className="pt-6">
              <ul className="list-disc ps-6">
                <li className="text-[16px] text-black font-normal leading-6 font-poppin">
                  A total of {data?.overview?.total_test_count} Tests,{" "}
                  {data?.overview?.total_variant_count} Variants, and{" "}
                  {data?.overview?.total_evaluation_count} Evaluations were
                  included in this Suite run.
                </li>
                <li className="text-[16px] text-black font-normal leading-6 font-poppin">
                  <span className="text-success">
                    {data?.overview?.test_pass_rate !== undefined &&
                      (Math.round(data?.overview?.test_pass_rate) * 100) / 100}
                    % of Tests passed
                  </span>{" "}
                  fully (with no failures),
                  <span className="text-success"> up 4%</span> the{" "}
                  <span className="text-secondary">
                    26 Jan 2024 Production Run.
                  </span>
                </li>
              </ul>
            </div>

            <div className=" pt-6">
              <Grid columns={{ initial: "1", md: "2" }} gap="7" width="auto">
                <Box className="border rounded-2xl border-borderLightgrey">
                  <h1 className="h-[68px] flex items-center ps-6 border-b border-borderLightgrey text-[20px] font-poppins font-extrabold text-black">
                    Number Of Tests
                  </h1>
                  <div className="px-4 flex justify-center items-center h-[84%]">
                    {loading ? (
                      <Skeleton count={1} width={350} height={350} circle />
                    ) : (
                      data && (
                        <OverViewResultChart
                          list={data?.overview?.test_status_counts}
                          labelData={data?.overview?.run_statuses}
                          name="Tests"
                          id="test-chart"
                          onHover={(index) => sethighlightTests(index)}
                          highlightIndex={highlightTests}
                        />
                      )
                    )}
                  </div>
                </Box>
                <Box className="border rounded-2xl border-borderLightgrey">
                  <h1 className="h-[68px] flex items-center ps-6 border-b border-borderLightgrey text-[20px] font-poppins font-extrabold text-black">
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
                        id="test-chart"
                        onHover={(index) => sethighlightTests(index)}
                        highlightIndex={highlightTests}
                      />
                    )}
                  </div>
                </Box>
              </Grid>

              <div className="pt-14 pb-8">
                <ul className="list-disc ps-6">
                  <li className="text-[16px] text-black font-normal leading-6 font-poppin">
                    Out of the <span className="font-bold">110</span>{" "}
                    Evaluations performed,
                    <span className="text-success font-bold">
                      {" "}
                      {data?.overview?.total_evaluation_count} Evaluations{" "}
                      {`(${
                        data?.overview?.evaluation_pass_rate !== undefined &&
                        (Math.round(data?.overview?.evaluation_pass_rate) *
                          100) /
                          100
                      }%)`}{" "}
                      passed, up 1%{" "}
                    </span>
                    from the{" "}
                    <span className="text-secondary font-bold">
                      26 Jan 2024 Production Run.
                    </span>
                  </li>
                </ul>
              </div>
              <Grid columns={{ initial: "1", md: "2" }} gap="7" width="auto">
                <Box className="border rounded-2xl border-borderLightgrey">
                  <h1 className="h-[68px] flex items-center ps-6 border-b border-borderLightgrey text-[20px] font-poppins font-extrabold text-black">
                    Number Of Evaluations
                  </h1>
                  <div className="px-4 flex justify-center items-center h-[84%]">
                    {loading ? (
                      <Skeleton count={1} width={350} height={350} circle />
                    ) : (
                      data && (
                        <OverViewResultChart
                          list={data?.overview?.evaluation_status_counts}
                          labelData={data?.overview?.run_statuses}
                          name="Evaluations"
                          id="synced-charts"
                          onHover={(index) => setHighlightEvaluation(index)}
                          highlightIndex={highlightEvaluation}
                        />
                      )
                    )}
                  </div>
                </Box>
                <Box className="border rounded-2xl border-borderLightgrey">
                  <h1 className="h-[68px] flex items-center ps-6 border-b border-borderLightgrey text-[20px] font-poppins font-extrabold text-black">
                    Comparison
                  </h1>
                  <div className="px-4 flex justify-center items-center h-[84%]">
                    {loading ? (
                      <Skeleton count={1} width={350} height={350} circle />
                    ) : (
                      <OverViewResultChart
                        list={
                          data?.overview?.comparison_evaluation_status_counts
                        }
                        labelData={data?.overview?.run_statuses}
                        name="Evaluations"
                        id="synced-charts"
                        onHover={(index) => setHighlightEvaluation(index)}
                        highlightIndex={highlightEvaluation}
                      />
                    )}
                  </div>
                </Box>
              </Grid>
            </div>
            <div className="pt-20">
              <div className="bg-primary h-[78px] ps-4 flex items-center  rounded">
                <h1 className="text-secondary font-poppin font-bold text-[30px]">
                  Improvements
                </h1>
              </div>
              <div className="pt-6">
                <ul className="list-disc ps-6">
                  <li className="text-[16px] text-black font-normal leading-6 font-poppin">
                    The following Tests saw a
                    <span className="text-success"> higher pass rate</span> as
                    compared to the{" "}
                    <span className="text-secondary">
                      26 Jan 2024 Production Run:
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <Table.Root
                  style={{
                    borderLeft: "1px solid #f0f0f0",
                    borderRight: "1px solid #f0f0f0",
                    borderTop: "1px solid #f0f0f0",
                  }}
                  size={"2"}
                >
                  <Table.Header
                    style={{
                      backgroundColor: "#fdfcfa",
                    }}
                  >
                    <Table.Row>
                      <Table.ColumnHeaderCell
                        style={{ width: "420px" }}
                        className="border-r border-tableCellBorder text-sm font-semibold dark:border-r dark:border-tableCellBorderDark dark:bg-tableCellBackgroundDark"
                      >
                        Test
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell
                        style={{ width: "420px" }}
                        className="border-r border-tableCellBorder text-sm font-semibold dark:border-r dark:border-tableCellBorderDark dark:bg-tableCellBackgroundDark"
                      >
                        Pass Rate
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell
                        style={{ width: "420px" }}
                        className=" border-tableCellBorder text-sm font-semibold dark:border-r dark:border-tableCellBorderDark dark:bg-tableCellBackgroundDark"
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
                            <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                              <Skeleton count={1} width={200} height={30} />
                            </Table.Cell>
                            <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                              <Skeleton count={1} width={200} height={30} />
                            </Table.Cell>
                            <Table.Cell className=" border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                              <Skeleton count={1} width={200} height={30} />
                            </Table.Cell>
                          </Table.Row>
                        ))}
                    </Table.Body>
                  ) : (
                    <Table.Body>
                      {data?.improvements?.test_improvements?.map((item, i) => (
                        <Table.Row key={i} className="align-middle">
                          <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                            <button
                              className=" hover:underline"
                              onClick={() =>
                                router.push(
                                  `/app/dashboard?test_id=${item?.test_id}`
                                )
                              }
                            >
                              {item?.test_name}
                            </button>
                          </Table.Cell>

                          <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                            {(Math.round(item.pass_rate) * 100) / 100}%
                          </Table.Cell>
                          <Table.Cell className=" border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                            {(Math.round(item.comparison_pass_rate) * 100) /
                              100}
                            %
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  )}
                </Table.Root>
              </div>
            </div>
            <div className="pt-20">
              <div className="bg-primary h-[78px] flex items-center ps-4 rounded">
                <h1 className="text-secondary font-poppin font-bold text-[30px]">
                  Test Failure Details
                </h1>
              </div>
              <div className="pt-6">
                <ul className="list-disc ps-6">
                  <li className="text-[16px] text-black font-normal leading-6 font-poppin">
                    The following
                    <span className="text-danger"> failures</span> or{" "}
                    <span className="text-warning">mixed results</span> occurred
                    during the Suite run:
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <Table.Root
                  style={{
                    borderLeft: "1px solid #f0f0f0",
                    borderRight: "1px solid #f0f0f0",
                    borderTop: "1px solid #f0f0f0",
                  }}
                  size={"2"}
                >
                  <Table.Header
                    style={{
                      backgroundColor: "#fdfcfa",
                    }}
                  >
                    <Table.Row>
                      <Table.ColumnHeaderCell
                        style={{ width: "420px" }}
                        className="border-r border-tableCellBorder text-sm font-semibold dark:border-r dark:border-tableCellBorderDark dark:bg-tableCellBackgroundDark"
                      >
                        Test
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell
                        style={{ width: "200px" }}
                        className="border-r border-tableCellBorder text-sm font-semibold dark:border-r dark:border-tableCellBorderDark dark:bg-tableCellBackgroundDark"
                      >
                        Pass Rate
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell
                        style={{ width: "660px" }}
                        className=" border-tableCellBorder text-sm font-semibold dark:border-r dark:border-tableCellBorderDark dark:bg-tableCellBackgroundDark"
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
                            <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                              <Skeleton count={1} width={200} height={30} />
                            </Table.Cell>
                            <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                              <Skeleton count={1} width={200} height={30} />
                            </Table.Cell>
                            <Table.Cell className=" border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                              <Skeleton count={1} width={200} height={30} />
                            </Table.Cell>
                          </Table.Row>
                        ))}
                    </Table.Body>
                  ) : (
                    <Table.Body>
                      {data?.failures?.test_failures.map((item, i) => (
                        <Table.Row key={i} className="align-middle">
                          <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                            <button
                              className=" hover:underline"
                              onClick={() =>
                                router.push(
                                  `/app/dashboard?test_id=${item?.test_id}`
                                )
                              }
                            >
                              {item?.test_name}
                            </button>
                          </Table.Cell>

                          <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                            {Math.round((item?.pass_rate * 100) / 100)}%
                          </Table.Cell>
                          <Table.Cell className=" border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                            {item?.failure_summary}{" "}
                            <button
                              className=" hover:underline"
                              onClick={() =>
                                router.push(
                                  `/app/dashboard?test_run_id=${item?.test_run_id}`
                                )
                              }
                            >
                              (See Test Run)
                            </button>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  )}
                </Table.Root>
              </div>
            </div>
            <div className="pt-20">
              <div className="bg-primary h-[78px] flex items-center ps-4 rounded">
                <h1 className="text-secondary font-poppin font-bold text-[30px]">
                  Performance
                </h1>
              </div>
              <div className="pt-6">
                <ul className="list-disc ps-6">
                  <li className="text-[16px] text-black font-normal leading-6 font-poppin">
                    The average Test completion time was{" "}
                    <span className="font-black"> 50.6</span> seconds, which is
                    <span className="text-success"> 13% faster</span> as
                    compared to the 26 Jan 2024 Production Run
                  </li>
                </ul>
              </div>

              <div className=" mt-6 mb-10">
                <Grid columns={{ initial: "1", md: "2" }} gap="7" width="auto">
                  <Box className="border rounded-2xl border-borderLightgrey">
                    <h1 className="h-[68px] flex items-center ps-6 border-b border-borderLightgrey text-[20px] font-poppins font-extrabold text-black">
                      Performance Distribution
                    </h1>
                    <div className="px-4 flex justify-center items-center h-[84%]">
                      {loading ? (
                        <Skeleton count={1} width={400} height={400} />
                      ) : (
                        data && (
                          <PerformanceDistributionChart
                            categories={data?.performance?.buckets}
                            list={data?.performance?.values}
                          />
                        )
                      )}
                    </div>
                  </Box>
                  <Box className="border rounded-2xl border-borderLightgrey">
                    <h1 className="h-[68px] flex items-center ps-6 border-b border-borderLightgrey text-[20px] font-poppins font-extrabold text-black">
                      Comparison
                    </h1>
                    <div className="px-4 flex justify-center items-center h-[84%]">
                      {loading ? (
                        <Skeleton count={1} width={400} height={400} />
                      ) : (
                        data && (
                          <PerformanceDistributionChart
                            categories={data?.performance?.buckets || []}
                            list={data?.performance?.comparison_values || []}
                          />
                        )
                      )}
                    </div>
                  </Box>
                </Grid>
              </div>
              <div className="pt-6">
                <ul className="list-disc ps-6">
                  <li className="text-[16px] text-black font-normal leading-6 font-poppin">
                    The following Tests had an average run time that was{" "}
                    <span className="text-danger font-bold">
                      {">10% slower"}
                    </span>{" "}
                    compared to the{" "}
                    <span className="text-secondary font-bold">
                      26 Jan 2024 Production Run
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <Table.Root
                  style={{
                    // border: "1px solid #f0f0f0",
                    borderLeft: "1px solid #f0f0f0",
                    borderRight: "1px solid #f0f0f0",
                    borderTop: "1px solid #f0f0f0",
                  }}
                  size={"2"}
                >
                  <Table.Header
                    style={{
                      backgroundColor: "#fdfcfa",
                    }}
                  >
                    <Table.Row>
                      <Table.ColumnHeaderCell
                        style={{ width: "480px" }}
                        className="border-r border-tableCellBorder text-sm font-semibold dark:border-r dark:border-tableCellBorderDark dark:bg-tableCellBackgroundDark no-wrap"
                      >
                        Test
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell
                        style={{ width: "218px" }}
                        className="border-r border-tableCellBorder text-sm font-semibold dark:border-r dark:border-tableCellBorderDark dark:bg-tableCellBackgroundDark no-wrap"
                      >
                        Average Run Time
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell
                        style={{ width: "280px" }}
                        className="border-r border-tableCellBorder text-sm font-semibold dark:border-r dark:border-tableCellBorderDark dark:bg-tableCellBackgroundDark "
                      >
                        Comparison Average Run Time
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell
                        style={{ width: "100px" }}
                        className="border-r border-tableCellBorder text-sm font-semibold dark:border-r dark:border-tableCellBorderDark dark:bg-tableCellBackgroundDark"
                      >
                        % Slower
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell
                        style={{ width: "150px" }}
                        className="border-r border-tableCellBorder text-sm font-semibold dark:border-r dark:border-tableCellBorderDark dark:bg-tableCellBackgroundDark"
                      >
                        Min Run Time
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell
                        style={{ width: "150px" }}
                        className="border-tableCellBorder text-sm font-semibold dark:border-r dark:border-tableCellBorderDark dark:bg-tableCellBackgroundDark"
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
                            <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                              <Skeleton count={1} width={200} height={30} />
                            </Table.Cell>

                            <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                              <Skeleton count={1} width={200} height={30} />
                            </Table.Cell>
                            <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                              <Skeleton count={1} width={200} height={30} />
                            </Table.Cell>
                            <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                              <Skeleton count={1} width={200} height={30} />
                            </Table.Cell>
                            <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                              <Skeleton count={1} width={200} height={30} />
                            </Table.Cell>
                            <Table.Cell className=" border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                              <Skeleton count={1} width={100} height={30} />
                            </Table.Cell>
                          </Table.Row>
                        ))}
                    </Table.Body>
                  ) : (
                    <Table.Body>
                      {data?.performance?.test_performances?.map((item, i) => (
                        <Table.Row key={i} className="align-middle">
                          <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                            <button
                              className=" hover:underline"
                              onClick={() =>
                                router.push(
                                  `/app/dashboard?test_id=${item?.test_id}`
                                )
                              }
                            >
                              {item?.test_name}
                            </button>
                          </Table.Cell>

                          <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                            {item?.average_run_time?.toFixed(1)} sec
                          </Table.Cell>
                          <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                            {item?.comparison_average_run_time?.toFixed(1)} sec
                          </Table.Cell>
                          <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                            {(Math.round(item?.percent_slower) * 100) / 100}%
                          </Table.Cell>
                          <Table.Cell className="border-r border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
                            {item?.min_run_time?.toFixed(1)} sec
                          </Table.Cell>
                          <Table.Cell className=" border-tableCellBorder dark:border-r dark:border-tableCellBorderDark">
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
    </>
  );
};

export default AnalyticsReports;
