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
import { useApi } from "../../../hooks/useApi";

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
    const timer = setTimeout(() => setProgress(80), 500); // Adjusted to represent 6.66% of 10,000
    return () => clearTimeout(timer);
  }, []);

  const { request } = useApi();

  const fetchAnalyticsSuccess = async (
    suite_id: string,
    environment_id: string
  ) => {
    try {
      const data = await request({
        url: `/v1/analytics/trending/success`,
        method: "POST",
        data: {
          suite_id,
          environment_id,
        },
      });

      console.log(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedSuite?.id && selectedEnvironment?.id) {
      fetchAnalyticsSuccess(selectedSuite?.id, selectedEnvironment?.id);
    }
  }, [selectedSuite, selectedEnvironment]);

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
              Btntext="Add / Modify Bots"
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
              Btntext="Add / Modify Suites"
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
              Btntext="Add / Modify Environments"
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
              <div className="px-4 py-5">
                <EvaluationPerformedChart />
                <TestResultChart />
                <EvaluationPassChart />
              </div>
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
                  <HighBoxPlotChart />
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
                  <UsageEvaluationPerformedChart />
                  <div className="border-2 rounded-lg border-[#f0f0f0] h-[240px]">
                    <div className="p-4">
                      <div className="flex justify-between">
                        <h3 className="font-poppin font-semibold text-base">
                          Plan: Tier 1
                        </h3>
                        <div className=" border border-[#d5d5d5] dark:border dark:border-[#434447] dark:text-white dark:bg-transparent  text-black text-sm font-normal font-poppin bg-[#fafafa] flex justify-center rounded-md  max-w-[89px] w-full py-0.5  ">
                          $20 Monthly
                        </div>
                      </div>
                      <div className="mt-3">
                        <ul className="list-disc pl-5 font-poppin text-md font-normal">
                          <li>1,000 Evaluations per month</li>
                          <li>4 additional team members</li>
                          <li>Unlimited Tests</li>
                        </ul>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <Progress.Root
                          className="bg-[#f0f0f0] relative overflow-hidden  rounded-full w-[300px] h-[8px]"
                          style={{
                            // Fix overflow clipping in Safari
                            transform: "translateZ(0)",
                          }}
                          value={progress}
                        >
                          <Progress.Indicator
                            className="bg-[#388aeb]  h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
                            style={{
                              transform: `translateX(-${100 - progress}%)`,
                            }}
                          />
                        </Progress.Root>
                        <div className="text-black font-poppin text-sm font-normal">
                          {progress} of 10,000 Evaluations
                        </div>
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
