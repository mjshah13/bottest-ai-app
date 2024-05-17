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
                <div className="px-4 py-4  ">
                  <UsageEvaluationPerformedChart />
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
