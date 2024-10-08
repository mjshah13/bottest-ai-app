/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  GlobalStateType,
  Option,
  TestType,
} from "../../../utils/typesInterface";
import TestRun from "../../components/testRun";
import { filterOptions, getStatuses } from "../../../utils/common";
import _ from "lodash";
import useBots from "../../../hooks/useBots";
import useSuites from "../../../hooks/useSuites";
import useEnvironment from "../../../hooks/useEnvironment";
import useTests from "../../../hooks/useTests";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { RefreshCw } from "lucide-react";
import { Box, Grid } from "@radix-ui/themes";
import ModifyBot from "../../components/modifyBot";
import ModifySuite from "../../components/modifySuite";
import ModifyEnvironment from "../../components/modifyEnvironment";
import { useAuth, useOrganization } from "@clerk/nextjs";
import useSuiteRuns from "../../../hooks/useSuiteRuns";
import { GlobalStateContext } from "../../../globalState";
import CustomSelect from "../../../elements/select";
import CustomButton from "../../../elements/button";
import CustomInput from "../../../elements/input";

interface DashboardProps {}

const Dashboard = (props: DashboardProps) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const [selectedSuite, setSelectedSuite] = useState<Option | null>(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState<Option | null>(
    null
  );
  const [selectedBot, setSelectedBot] = useState<Option | null>(null);

  const [filteredData, setFilteredData] = useState<
    TestType[] | null | undefined
  >(null);

  const { orgRole } = useAuth();
  const { organization } = useOrganization();
  const { botLists, suiteLists, environmentLists } = useContext(
    GlobalStateContext
  ) as GlobalStateType;

  
  // useBots(setSelectedBot);
  // const { fetchSuites } = useSuites(setSelectedSuite);
  // const { fetchEnvironment } = useEnvironment(setSelectedEnvironment);
  const { fetchTests, isLoading } = useTests();
  const { suiteTestRuns, fetchSuiteRuns, isLoading: loading } = useSuiteRuns();
  const { testData } = useContext(GlobalStateContext) as GlobalStateType;

  const [filters, setFilters] = useState({
    tab: "View all",
  });

  const filterData = (status: string) => {
    if (status === "View all") {
      return testData;
    }
    const filteredItems = testData?.filter((item: TestType) => {
      return item.status === status;
    });
    return filteredItems;
  };

  const handleButtonClick = (status: any) => {
    setFilters({
      ...filters,
      tab: status,
    });
    setFilteredData(filterData(status));
  };

  useEffect(() => {
    if (!testData) return;
    setFilteredData(testData);
  }, [testData]);

  useEffect(() => {
    setSelectedBot(null);
    setSelectedSuite(null);
    setSelectedEnvironment(null);
    setFilteredData(null);
  }, [organization?.id]);

  useEffect(() => {
    setSelectedBot(botLists[0])
    setSelectedSuite(suiteLists[0])
    setSelectedEnvironment(environmentLists[0])
  }, [botLists , suiteLists , environmentLists])
  

 
  // useEffect(() => {
  //   if (!selectedBot) return;
  //   fetchSuites(selectedBot?.id);
  //   fetchEnvironment(selectedBot.id);
  // }, [selectedBot]);

  useEffect(() => {
    if (!selectedBot || !selectedSuite || !selectedEnvironment || isLoading)
      return;
    fetchTests(selectedSuite?.id, selectedEnvironment?.id);
    fetchSuiteRuns(selectedSuite?.id, selectedEnvironment?.id);
  }, [selectedBot, selectedEnvironment, selectedSuite]);

  const handleFilteredData = useCallback(
    _.debounce((value: string) => {
      if (value.trim() === "") {
        setFilteredData(filterData(filters?.tab));
      } else {
        const filteredTest = testData?.filter((item) =>
          item?.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filteredTest);
      }
    }, 250),
    [testData, filters]
  );

  useEffect(() => {
    if (!testData) return;
    setFilters({ tab: "View all" });
  }, [testData]);

  useEffect(() => {
    const updateContainerHeight = () => {
      const container = document?.getElementById("flex-container");
      if (container) {
        const height = container?.offsetHeight;
        setContainerHeight(height);
      }
    };

    updateContainerHeight();
    window?.addEventListener("resize", updateContainerHeight);

    return () => {
      window?.removeEventListener("resize", updateContainerHeight);
    };
  }, []);

  // ################## Modal Content ########################

  const [isBotsModalOpen, setIsBotsModalOpen] = useState<boolean>(false);
  const [isSuiteModalOpen, setIsSuiteModalOpen] = useState<boolean>(false);
  const [isEnvironmentModalOpen, setIsEnvironmentModalOpen] =
    useState<boolean>(false);

  const countStatus = (status: string) => {
    return suiteTestRuns?.filter((test) => test?.status === status).length;
  };

  const generateStatusDisplayWithCommas = () => {
    const statusDisplays = getStatuses
      .filter((status) => countStatus(status) > 0)
      .map((status) => (
        <span
          key={status}
          className={`${
            status === "Pass"
              ? "text-success"
              : status === "Mixed"
              ? "text-[#E7C200]"
              : status === "Fail" || status === "Error"
              ? "text-danger"
              : status === "Running"
              ? "text-[#388aeb]"
              : status === "Skipped" || status === "Stopped"
              ? "text-[#212427]"
              : ""
          } font-medium font-poppin`}
        >
          {countStatus(status)} {status}
        </span>
      ));

    const displayWithCommas = statusDisplays.reduce(
      (acc: any, curr: any, index: any) => {
        const isSecondLastitem = index === statusDisplays.length - 2;
        const isLastitem = index === statusDisplays.length - 1;
        const separator = isSecondLastitem ? " and " : isLastitem ? "." : ", ";
        return acc.concat(curr, separator);
      },
      []
    );

    return displayWithCommas;
  };

  return (
    <div className="mainContainer gap-5 flex flex-col">
      <div className=" border-2 rounded-lg border-[#f0f0f0] dark:bg-[#212427] dark:border-none   bg-white mt-12">
        {" "}
        <div className="py-5 px-4 border-b-2 border-[#f0f0f0] dark:border-b  dark:border-[#434447]">
          <h1 className="font-semibold font-poppin text-3xl dark:text-white text-dark">
            Dashboard
          </h1>
        </div>
        <div className="gap-7 py-6 px-4 flex justify-between items-center">
          <div className="w-full">
            <CustomSelect
              onClick={() => setIsBotsModalOpen(true)}
              // disabled={botLists?.length === 1 || !botLists}
              Btntext="Add / Modify Bots"
              Label={"Select Bot"}
              options={botLists || []}
              selectedValue={botLists?.find(
                (bot) => bot?.id === selectedBot?.id
              )}
              placeholder="Select Bots"
              // onChange={(value) => handleChange("bots", value)}
              onSelectChange={(selectedOption) => {
                setSelectedBot(selectedOption);
              }}
            />
          </div>
          <div className="w-full">
            <CustomSelect
              onClick={() => setIsSuiteModalOpen(true)}
              Label={"Select Suites"}
              // disabled={suiteLists?.length === 1 || !suiteLists}
              Btntext="Add / Modify Suites"
              selectedValue={suiteLists?.find(
                (suite) => suite?.id === selectedSuite?.id
              )}
              placeholder="Select Suites"
              options={suiteLists || []}
              onSelectChange={(selectedOption) => {
                setSelectedSuite(selectedOption);
              }}
            />
          </div>
          <div className="w-full">
            <CustomSelect
              onClick={() => setIsEnvironmentModalOpen(true)}
              Label={"Select Environment"}
              // disabled={environmentLists?.length === 1 || !environmentLists}
              placeholder="Select Environment"
              Btntext="Add / Modify Environments"
              selectedValue={environmentLists?.find(
                (env) => env?.id === selectedEnvironment?.id
              )}
              options={environmentLists || []}
              onSelectChange={(selectedOption) => {
                setSelectedEnvironment(selectedOption);
              }}
            />
          </div>
        </div>
      </div>

      <div
        className={`
        flex-1
        bg-white dark:bg-[#212427]
        border-2 rounded-lg border-[#f0f0f0] dark:border-none dark:border dark:border-[#434447] mb-4
           `}
        id="flex-container"
      >
        {/* dark:border dark:border-[#434447] */}
        {isLoading && !filteredData ? (
          <>
            <div className=" flex flex-col py-5 px-4 border-b-2 border-[#f0f0f0] dark:border dark:border-[#434447] ">
              <Skeleton count={1} width={200} height={30} />
              <Skeleton count={1} width={350} height={30} />
            </div>

            <div className=" w-full h-[85%] flex justify-center items-center flex-col gap-3">
              <Skeleton count={1} width={200} height={30} />
              <Skeleton count={1} width={300} height={30} />
            </div>
          </>
        ) : (
          <>
            {!selectedSuite || !selectedEnvironment ? (
              <>
                <div className="py-7 px-4 border-b-2 border-[#f0f0f0] dark:border-b dark:border-[#434447]"></div>
                <div className=" w-full flex h-[80%] justify-center items-center flex-col gap-3">
                  <h1 className="font-normal font-poppin text-md text-black dark:text-white ">
                    Please select the suites and environment.
                  </h1>
                </div>
              </>
            ) : (
              <>
                {testData?.length === 0 ? (
                  <>
                    <div className="py-5 px-4 border-b-2 border-[#f0f0f0]">
                      <h1 className="font-semibold font-poppin text-xl">
                        {" "}
                        {`${selectedSuite?.name} - ${selectedEnvironment?.name}`}
                      </h1>
                      <p className="text-black text-md font-poppin">
                        Create a test and run it to see your results.
                      </p>
                    </div>
                    <div className=" w-full flex h-[80%] justify-center items-center flex-col gap-3">
                      <h1 className="font-normal font-poppin text-md ">
                        You have no tests, create one below!
                      </h1>
                      <CustomButton
                        color="blue"
                        variant="solid"
                        isPrimary
                        disabled={
                          organization !== null && orgRole === "org:viewer"
                        }
                        // onClick={() => setIsDeleteModal(true)}
                      >
                        Create new test
                      </CustomButton>
                    </div>
                  </>
                ) : (
                  <>
                    {testData && (
                      <>
                        <div className="py-5 px-4 border-b-2 border-[#f0f0f0] dark:border-b dark:border-[#434447] ">
                          <div className="flex justify-between">
                            <div>
                              <h1 className="font-semibold font-poppin text-xl">
                                {`${selectedSuite?.name} - ${selectedEnvironment?.name}`}
                              </h1>
                            </div>
                            <div className="gap-4 flex ">
                              <CustomButton
                                variant="outline"
                                color="gray"
                                disabled={
                                  organization !== null &&
                                  orgRole === "org:viewer"
                                }
                              >
                                Create new test
                              </CustomButton>
                              <CustomButton
                                color="blue"
                                variant="solid"
                                svgIcon={<RefreshCw size={17} />}
                                isPrimary
                                disabled={
                                  organization !== null &&
                                  orgRole === "org:viewer"
                                }
                              >
                                Run all tests
                              </CustomButton>
                            </div>
                          </div>
                          <div>
                            {suiteTestRuns?.length > 0 && !loading && (
                              <p className="text-black gap-2 font-poppin dark:text-white">
                                Most recent Suite Run results:{" "}
                                {generateStatusDisplayWithCommas()}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className=" py-5 px-4 border-b-2 border-[#f0f0f0] dark:border-b dark:border-[#434447] ">
                          <Grid
                            columns={{ lg: "3fr 1fr", md: "3fr 1fr" }}
                            gap="3"
                            width="auto"
                          >
                            <Box>
                              <div className=" border-[#d9d9d9] border dark:border dark:border-[#434447] rounded-lg w-max  ">
                                {filterOptions &&
                                  filterOptions?.map((item, i) => (
                                    <button
                                      key={i}
                                      className={`px-3.5 lg:py-1.5  text-black dark:text-white font-light text-base font-poppin border-r  border-[#f0f0f0] dark:border-r dark:border-[#434447] ${
                                        i === 0 ? "rounded-l-lg" : ""
                                      } ${
                                        i === filterOptions.length - 1
                                          ? "border-r-0"
                                          : ""
                                      } ${
                                        filters.tab === item.status
                                          ? "bg-[#f5f5f5] text-black dark:bg-[#2A2D30] dark:text-white "
                                          : ""
                                      }`}
                                      onClick={() => {
                                        handleButtonClick(item.status);
                                      }}
                                    >
                                      {item.label}
                                    </button>
                                  ))}
                              </div>
                            </Box>
                            <Box>
                              <CustomInput
                                size="2"
                                className={
                                  "dark:bg-transparent h-[38px] rounded-lg"
                                }
                                onChange={(value) => {
                                  handleFilteredData(value);
                                }}
                                type="text"
                                placeholder="Search for a test"
                              />
                            </Box>
                          </Grid>
                        </div>

                        <div
                          className="px-5 py-6  "
                          style={{
                            maxHeight: `${containerHeight - 200}px`,
                            overflowY: "auto",
                          }}
                        >
                          {filteredData &&
                            filteredData?.map(
                              ({ recent_test_runs, ...item }: TestType) => (
                                <div className="mb-5" key={item?.name}>
                                  <TestRun
                                    specificTest={item}
                                    isDisabled={!item?.full_run_enabled}
                                    lastTestRuns={recent_test_runs}
                                    loading={isLoading}
                                    stubbed={false}
                                  />
                                </div>
                              )
                            )}
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>

      {isBotsModalOpen && (
        <ModifyBot
          isBotsModalOpen={isBotsModalOpen}
          setIsBotsModalOpen={setIsBotsModalOpen}
          title="Add / Modify Bots"
        />
      )}

      {isSuiteModalOpen && (
        <ModifySuite
          isSuiteModalOpen={isSuiteModalOpen}
          setIsSuiteModalOpen={setIsSuiteModalOpen}
          selectedBot={selectedBot}
          title={`Add / Modify Suites for ${selectedBot?.name}`}
        />
      )}

      {isEnvironmentModalOpen && (
        <ModifyEnvironment
          selectedBot={selectedBot}
          setIsEnvironmentModalOpen={setIsEnvironmentModalOpen}
          isEnvironmentModalOpen={isEnvironmentModalOpen}
          title={`Add / Modify Environments for ${selectedSuite?.name}`}
        />
      )}
    </div>
  );
};

export default Dashboard;
