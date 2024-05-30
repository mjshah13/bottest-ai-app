/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useContext, useEffect, useState } from "react";
import CustomSelect from "../../../elements/select";
import { GlobalStateType, Option } from "../../../utils/typesInterface";
import { GlobalStateContext } from "../../../globalState";
import { Box, Grid } from "@radix-ui/themes";
import useBots from "../../../hooks/useBots";
import useSuites from "../../../hooks/useSuites";
import useEnvironment from "../../../hooks/useEnvironment";
import * as Progress from "@radix-ui/react-progress";
import CustomButton from "../../../elements/button";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useSuccessChart from "../../../hooks/useSuccessChart";
import usePerformanceChart from "../../../hooks/usePerformanceChart";
import useUsageChart from "../../../hooks/useUsageChart";
import * as Tooltip from "@radix-ui/react-tooltip";
import dynamic from "next/dynamic";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";

const EvaluationPerformedChart = dynamic(
  () => import("../../components/successCharts/evaluationPerformChart"),
  { ssr: false }
);
const TestResultChart = dynamic(
  () => import("../../components/successCharts/testResultChart"),
  { ssr: false }
);
const EvaluationPassChart = dynamic(
  () => import("../../components/successCharts/evaluationPassChart"),
  { ssr: false }
);

const HighBoxPlotChart = dynamic(
  () => import("../../components/performanceChart/highBoxPlotChart"),
  { ssr: false }
);

const UsageEvaluationPerformedChart = dynamic(
  () => import("../../components/usageChart/evaluationPerformChart"),
  { ssr: false }
);

const Analytics = () => {
  const [progress, setProgress] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [selectedSuite, setSelectedSuite] = useState<Option | null>(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState<Option | null>(
    null
  );
  const [selectedBot, setSelectedBot] = useState<Option | null>(null);
  const { botLists, suiteLists, environmentLists } = useContext(
    GlobalStateContext
  ) as GlobalStateType;

  useBots(setSelectedBot);
  const { organization } = useOrganization();

  const { fetchSuites } = useSuites(setSelectedSuite);
  const { fetchEnvironment } = useEnvironment(setSelectedEnvironment);
  const {
    fetchSuccessChart,
    successChartData,
    isLoading: successLoading,
  } = useSuccessChart();
  const {
    fetchPerformanceChart,
    performanceChartData,
    isLoading: performanceLoading,
  } = usePerformanceChart();
  const {
    fetchUsageChart,
    usageChartData,
    isLoading: usageLoading,
  } = useUsageChart();

  useEffect(() => {
    if (!selectedBot) return;
    fetchSuites(selectedBot?.id);
    fetchEnvironment(selectedBot.id);
  }, [selectedBot]);

  useEffect(() => {
    const updateContainerHeight = () => {
      const container = document?.getElementById("flex-container");
      if (container) {
        const height = container?.offsetHeight;
        setContainerHeight(height);
      }
    };

    updateContainerHeight();
    window && window?.addEventListener("resize", updateContainerHeight);

    return () => {
      window && window?.removeEventListener("resize", updateContainerHeight);
    };
  }, []);

  useEffect(() => {
    const totalUsed = usageChartData?.total_used || 0;
    const totalAvailable = usageChartData?.total_available || 1;
    const progressPercentage = Math.round((totalUsed / totalAvailable) * 100); // Rounding off the progress percentage
    setProgress(progressPercentage);
  }, [usageChartData]);

  useEffect(() => {
    if (!selectedSuite?.id || !selectedEnvironment?.id) return;
    fetchSuccessChart(selectedSuite?.id, selectedEnvironment?.id);
    fetchPerformanceChart(selectedSuite?.id, selectedEnvironment?.id);
    fetchUsageChart(selectedSuite?.id, selectedEnvironment?.id);
  }, [selectedSuite, selectedEnvironment]);

  useEffect(() => {
    setSelectedBot(null);
    setSelectedSuite(null);
    setSelectedEnvironment(null);
  }, [organization?.id]);

  return (
    <div className=" z-0 h-full gap-5 flex flex-col">
      <div className=" border-2 rounded-lg border-[#f0f0f0] dark:bg-[#212427] dark:border-none   bg-white mt-12">
        <div className="py-4 px-4 border-b-2  border-[#f0f0f0] dark:border-b  dark:border-[#434447]">
          <h1 className="font-semibold font-poppin text-3xl dark:text-white text-dark">
            Trending Analytics
          </h1>
          <p className="text-[#9e9fa0] font-poppin text-base font-normal mt-2 ">
            Analytics will only show data gathered from full test runs.
            Individual runs of a singular tests will not be included.
          </p>
        </div>
        <div className="gap-7 py-5 px-4 flex justify-between items-center -z-0">
          <div className="w-full">
            <CustomSelect
              Label={"Select Bot"}
              options={botLists || []}
              selectedValue={botLists?.find(
                (bot) => bot?.id === selectedBot?.id
              )}
              placeholder="Select Bots"
              onSelectChange={(selectedOption) => {
                setSelectedBot(selectedOption);
              }}
              isAddedBtn={false}
            />
          </div>
          <div className="w-full">
            <CustomSelect
              Label={"Select Suites"}
              selectedValue={suiteLists?.find(
                (suite) => suite?.id === selectedSuite?.id
              )}
              placeholder="Select Suites"
              options={suiteLists || []}
              onSelectChange={(selectedOption) => {
                setSelectedSuite(selectedOption);
              }}
              isAddedBtn={false}
            />
          </div>
          <div className="w-full">
            <CustomSelect
              Label={"Select Environment"}
              placeholder="Select Environment"
              selectedValue={environmentLists?.find(
                (env) => env?.id === selectedEnvironment?.id
              )}
              options={environmentLists || []}
              onSelectChange={(selectedOption) => {
                setSelectedEnvironment(selectedOption);
              }}
              isAddedBtn={false}
            />
          </div>
        </div>
      </div>

      <div
        className={`

      flex-1 mb-4
      dark:bg-[#212427]
    rounded-lg dark:border-none dark:border dark:border-[#434447]
         `}
        // id="flex-container"
      >
        <div
        // className=" pr-1.5 "
        // style={{
        //   maxHeight: `${containerHeight}px`,
        //   overflowY: "auto",
        // }}
        >
          <Grid
            columns={{ initial: "2", md: "1", lg: "2", sm: "1" }}
            gap="22px"
          >
            <Box className="border-2 rounded-lg h-full bg-white border-[#f0f0f0] ">
              <header className="px-4 h-[96px] rounded-t-lg flex flex-col justify-center bg-white  border-b-2 border-[#f0f0f0] dark:border-b dark:border-[#434447]">
                <h1 className="font-semibold font-poppin text-xl dark:text-white text-dark">
                  Success
                </h1>
                <p className="text-[#9e9fa0] font-poppin text-base font-normal mt-1 ">
                  How your chatbot is trending over time with Pass/Fail rates.
                </p>
              </header>
              {successLoading ? (
                <div className=" flex flex-col gap-2 px-4 py-2 border-[#f0f0f0] dark:border dark:border-[#434447] ">
                  <Skeleton count={1} height={260} />
                  <Skeleton count={1} height={260} />
                  <Skeleton count={1} height={260} />
                </div>
              ) : (
                <>
                  {!selectedSuite || !selectedEnvironment ? (
                    <div className="h-[90%]  flex items-center justify-center flex-col">
                      <Image
                        width={184}
                        height={152}
                        src="/Assets/noData.svg"
                        alt=""
                      />
                      <h1>
                        Select the suites and environment to view the success
                        chart.{" "}
                      </h1>
                    </div>
                  ) : (
                    <div className="px-4 py-5">
                      <div>
                        <EvaluationPerformedChart
                          suiteRun={successChartData?.suite_run_ids || []}
                          evaluationsPerformed={
                            successChartData?.evaluations_performed || []
                          }
                          suiteRunNames={
                            successChartData?.suite_run_names || []
                          }
                        />

                        <TestResultChart
                          suiteRunNames={
                            successChartData?.suite_run_names || []
                          }
                          testStatuses={successChartData?.test_statuses || []}
                        />

                        <EvaluationPassChart
                          suiteRun={successChartData?.suite_run_ids || []}
                          evaluationPassRates={
                            successChartData?.evaluation_pass_rates || []
                          }
                          suiteRunNames={
                            successChartData?.suite_run_names || []
                          }
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </Box>
            <Box className="flex flex-col gap-7">
              <div className="h-[410px] bg-white border-2 rounded-lg border-[#f0f0f0]">
                <header className="px-4 h-[110px] rounded-t-lg flex flex-col justify-center bg-white  border-b-2 border-[#f0f0f0] dark:border-b dark:border-[#434447]">
                  <h1 className="font-semibold font-poppin text-xl dark:text-white text-dark">
                    Performance
                  </h1>
                  <p className="text-[#9e9fa0] font-poppin text-base font-normal mt-1 ">
                    How your chatbot is trending over time with response and
                    conversation times.
                  </p>
                </header>
                {performanceLoading ? (
                  <div className="px-4 py-2">
                    <Skeleton count={1} height={260} />
                  </div>
                ) : !selectedSuite || !selectedEnvironment ? (
                  <div className="h-[72%] flex items-center justify-center flex-col">
                    <Image
                      width={184}
                      height={152}
                      src="/Assets/noData.svg"
                      alt=""
                    />
                    <h1>
                      Select the suites and environment to view the performance
                      chart.{" "}
                    </h1>
                  </div>
                ) : (
                  <div className="px-4 py-2">
                    <HighBoxPlotChart
                      highBoxPlotData={performanceChartData?.boxes || []}
                    />
                  </div>
                )}
              </div>
              <div className="h-[630px] bg-white border-2 rounded-lg border-[#f0f0f0]">
                <header className="px-4 h-[110px] rounded-t-lg flex flex-col justify-center bg-white  border-b-2 border-[#f0f0f0] dark:border-b dark:border-[#434447]">
                  <h1 className="font-semibold font-poppin text-xl dark:text-white text-dark">
                    Usage
                  </h1>
                  <p className="text-[#9e9fa0] font-poppin text-base font-normal mt-1 ">
                    How usage of the bottest.ai platform is trending over time
                    with the number of evaluations performed each day.
                  </p>
                </header>

                {usageLoading ? (
                  <div className="mb-2 px-3 py-2">
                    <Skeleton count={1} height={210} />
                    <div className="border-2 rounded-lg border-[#f0f0f0] flex-col h-[240px] mt-3 px-2 py-2">
                      <div className="flex justify-between">
                        <Skeleton count={1} width={100} height={30} />
                        <Skeleton count={1} width={100} height={30} />
                      </div>
                      <div>
                        <Skeleton count={3} width={300} height={20} />
                      </div>
                      <div className="mt-2">
                        <Skeleton count={1} width={50} height={20} />
                      </div>
                    </div>
                  </div>
                ) : !selectedSuite || !selectedEnvironment ? (
                  <div className="h-[72%] flex items-center justify-center flex-col">
                    <Image
                      width={184}
                      height={152}
                      src="/Assets/noData.svg"
                      alt=""
                    />
                    <h1>
                      Select the suites and environment to view the Usage chart.{" "}
                    </h1>
                  </div>
                ) : (
                  <>
                    <div className="px-4 py-4">
                      <UsageEvaluationPerformedChart
                        suiteRunNames={usageChartData?.suite_run_names || []}
                        usageChartData={
                          usageChartData?.evaluations_performed || []
                        }
                      />
                      <div className="w-full flex justify-center">
                        <div className="border-2 rounded-lg border-[#f0f0f0] min-h-[245px] h-full max-w-[540px]">
                          <div className="p-4 ">
                            {/* {usageLoading ? (
                          <div className="flex justify-between">
                            <Skeleton count={1} width={100} height={30} />
                            <Skeleton count={1} width={100} height={30} />
                          </div>
                        ) : ( */}
                            <div className="flex justify-between">
                              <h3 className="font-poppin font-semibold text-base">
                                {` Plan: ${
                                  usageChartData?.billing_tier?.name || ""
                                } `}
                              </h3>
                              <div className="border border-[#d5d5d5] dark:border dark:border-[#434447] dark:text-white dark:bg-transparent text-black text-sm font-normal font-poppin bg-[#fafafa] flex justify-center rounded-md max-w-[95px] w-full py-0.5">
                                {`$${
                                  usageChartData?.billing_tier?.price || 0
                                } Monthly`}
                              </div>
                            </div>
                            {/* )} */}

                            <div className="mt-3">
                              {/* {usageLoading ? (
                            <Skeleton count={3} width={300} height={20} />
                          ) : ( */}
                              <ul className="list-disc pl-5 font-poppin text-md font-normal">
                                <li>
                                  {usageChartData?.total_available} Evaluations
                                  per month
                                </li>
                                <li>4 additional team members</li>
                                <li>Unlimited Tests</li>
                              </ul>
                              {/* )} */}
                            </div>
                            <div className="flex justify-between gap-1 items-center mt-3">
                              <Tooltip.Provider skipDelayDuration={100}>
                                <Tooltip.Root delayDuration={100}>
                                  <Tooltip.Trigger asChild>
                                    <Progress.Root
                                      className="bg-[#f0f0f0] relative overflow-hidden  rounded-full w-[300px] h-[8px]"
                                      style={{
                                        // Fix overflow clipping in Safari
                                        transform: "translateZ(0)",
                                      }}
                                      value={progress}
                                    >
                                      <Progress.Indicator
                                        className="bg-[#388aeb] h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
                                        style={{
                                          transform: `translateX(-${
                                            100 - progress
                                          }%)`,
                                        }}
                                      />
                                    </Progress.Root>
                                  </Tooltip.Trigger>
                                  <Tooltip.Portal>
                                    <Tooltip.Content className="TooltipContent dark:bg-white dark:text-black">
                                      {`${progress}%`}
                                      <Tooltip.Arrow className="TooltipArrow dark:fill-[#e4e5e5]" />
                                    </Tooltip.Content>
                                  </Tooltip.Portal>
                                </Tooltip.Root>
                              </Tooltip.Provider>
                              {/* {usageLoading ? (
                            <Skeleton count={1} width={50} height={10} />
                          ) : ( */}
                              <div className="text-black font-poppin text-sm font-normal">
                                <div>
                                  {usageChartData?.total_used} of{" "}
                                  {usageChartData?.total_available}
                                </div>
                              </div>
                              {/* )} */}
                            </div>
                          </div>
                          <div className="border-t-2 border-[#f0f0f0] h-[59px] flex items-center">
                            <div className="flex gap-2  w-full justify-end px-2 ">
                              <CustomButton
                                variant="outline"
                                color="red"
                                isDanger
                                // disabled={
                                //   organization !== null && orgRole === "org:viewer"
                                // }
                                // disabled={true}
                              >
                                Cancel subscription
                              </CustomButton>
                              <CustomButton
                                color="blue"
                                variant="solid"
                                isPrimary
                                // disabled={
                                //   organization !== null && orgRole === "org:viewer"
                                // }
                              >
                                Upgrade plan
                              </CustomButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Box>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

// "use client";
// import React from "react";

// const Analytics = () => {
//   return <div>Analytics</div>;
// };

// export default Analytics;
