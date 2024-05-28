"use client";

import React, { useContext, useEffect, useState } from "react";
import CustomSelect from "../../../elements/select";
import { GlobalStateType, Option } from "../../../utils/typesInterface";
import { GlobalStateContext } from "../../../globalState";
import { Box, Grid } from "@radix-ui/themes";
import EvaluationPerformedChart from "../../components/successCharts/evaluationPerformChart";
import TestResultChart from "../../components/successCharts/testResultChart";
import EvaluationPassChart from "../../components/successCharts/evaluationPassChart";
import HighBoxPlotChart from "../../components/performanceChart/highBoxPlotChart";
import useBots from "../../../hooks/useBots";
import useSuites from "../../../hooks/useSuites";
import useEnvironment from "../../../hooks/useEnvironment";
import UsageEvaluationPerformedChart from "../../components/usageChart/evaluationPerformChart";
import * as Progress from "@radix-ui/react-progress";
import CustomButton from "../../../elements/button";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useSuccessChart from "../../../hooks/useSuccessChart";
import usePerformanceChart from "../../../hooks/usePerformanceChart";
import useUsageChart from "../../../hooks/useUsageChart";
import * as Tooltip from "@radix-ui/react-tooltip";

const Analytics = () => {
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
  const { fetchSuites } = useSuites(setSelectedSuite);
  const { fetchEnvironment } = useEnvironment(setSelectedEnvironment);
  const {
    fetchAnalyticsSuccess,
    successChartdata,
    isLoading: successLoading,
  } = useSuccessChart();
  const {
    fetchAnalyticsPerformance,
    performanceChartData,
    isLoading: performanceLoading,
  } = usePerformanceChart();
  const {
    fetchAnalyticsUsage,
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
      const container = document.getElementById("flex-container");
      if (container) {
        const height = container.offsetHeight;
        setContainerHeight(height);
      }
    };

    updateContainerHeight();
    window.addEventListener("resize", updateContainerHeight);

    return () => {
      window.removeEventListener("resize", updateContainerHeight);
    };
  }, []);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalUsed = usageChartData?.total_used || 0;
    const totalAvailable = usageChartData?.total_available || 1;
    const progressPercentage = Math.round((totalUsed / totalAvailable) * 100); // Rounding off the progress percentage
    setProgress(progressPercentage);
  }, [usageChartData]);

  useEffect(() => {
    if (!selectedSuite?.id || !selectedEnvironment?.id) return;
    fetchAnalyticsSuccess(selectedSuite?.id, selectedEnvironment?.id);
    fetchAnalyticsPerformance(selectedSuite?.id, selectedEnvironment?.id);
    fetchAnalyticsUsage(selectedSuite?.id, selectedEnvironment?.id);
  }, [selectedSuite, selectedEnvironment]);

  // const router = useRouter();

  // const handleButtonClick = () => {
  //   if (selectedSuite) {
  //     router.push(
  //       `/app/dashboard?test_run_id=${"trn_6UBTkOZKRJKycFGGtYGgPvTQ1CG8d"}`
  //     );
  //   }
  // };

  return (
    <div className=" h-[92vh] gap-5 flex flex-col">
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
        <div className="gap-7 py-5 px-4 flex justify-between items-center">
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
      
      flex-1 
      dark:bg-[#212427]
    rounded-lg dark:border-none dark:border dark:border-[#434447]
         `}
        id="flex-container"
      >
        <div
          className=" pr-1.5 "
          style={{
            maxHeight: `${containerHeight}px`,
            overflowY: "auto",
          }}
        >
          <Grid columns="1fr 1fr" gap="25px">
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
                <div className=" flex flex-col gap-2 px-4 border-[#f0f0f0] dark:border dark:border-[#434447] ">
                  <Skeleton count={1} height={260} />
                  <Skeleton count={1} height={260} />
                  <Skeleton count={1} height={260} />
                </div>
              ) : (
                <div className="px-4 py-5">
                  <EvaluationPerformedChart
                    suiteRun={successChartdata?.suite_run_ids || []}
                    evaluationsPerformed={
                      successChartdata?.evaluations_performed || []
                    }
                    suiteRunNames={successChartdata?.suite_run_names || []}
                  />
                  <TestResultChart
                    suiteRunNames={successChartdata?.suite_run_names || []}
                    testStatuses={successChartdata?.test_statuses || []}
                  />
                  <EvaluationPassChart
                    suiteRun={successChartdata?.suite_run_ids || []}
                    evaluationPassRates={
                      successChartdata?.evaluation_pass_rates || []
                    }
                    suiteRunNames={successChartdata?.suite_run_names || []}
                  />

                  {/* <CustomButton onClick={handleButtonClick}>hello</CustomButton> */}
                </div>
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

                <div className="px-4 mt-1.5 ">
                  {performanceLoading ? (
                    <Skeleton count={1} height={260} />
                  ) : (
                    <HighBoxPlotChart
                      highBoxPlotData={performanceChartData?.boxes || []}
                    />
                  )}
                </div>
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

                <div className="px-4 py-4">
                  {usageLoading ? (
                    <div className="mb-2">
                      <Skeleton count={1} height={210} />
                    </div>
                  ) : (
                    <UsageEvaluationPerformedChart
                      suiteRunNames={usageChartData?.suite_run_names || []}
                      usageChartData={
                        usageChartData?.evaluations_performed || []
                      }
                    />
                  )}

                  <div className="border-2 rounded-lg border-[#f0f0f0] h-[240px]">
                    <div className="p-4">
                      {usageLoading ? (
                        <div className="flex justify-between">
                          <Skeleton count={1} width={100} height={30} />
                          <Skeleton count={1} width={100} height={30} />
                        </div>
                      ) : (
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
                      )}

                      <div className="mt-3">
                        {usageLoading ? (
                          <Skeleton count={3} width={300} height={20} />
                        ) : (
                          <ul className="list-disc pl-5 font-poppin text-md font-normal">
                            <li>1,000 Evaluations per month</li>
                            <li>4 additional team members</li>
                            <li>Unlimited Tests</li>
                          </ul>
                        )}
                      </div>
                      <div className="flex justify-between items-center mt-3">
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
                        {usageLoading ? (
                          <Skeleton count={1} width={50} height={10} />
                        ) : (
                          usageChartData && (
                            <div className="text-black font-poppin text-sm font-normal">
                              <>
                                {usageChartData.total_used} of{" "}
                                {usageChartData.total_available}
                              </>
                            </div>
                          )
                        )}
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
            </Box>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
