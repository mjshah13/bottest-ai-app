/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  EnvironmentModaldata,
  ModifyModaldata,
  Option,
  TestType,
} from "../../../utils/typesInterface";
import TestRun from "../../components/testRun";
import CustomSelect from "../../../elements/select";
import CustomButton from "../../../elements/button";
import CustomInput from "../../../elements/input";
import { filterOptions } from "../../../utils/common";
import _ from "lodash";
import useBots from "../../../hooks/useBots";
import useSuites from "../../../hooks/useSuites";
import useEnvironment from "../../../hooks/useEnvironment";
import useTests from "../../../hooks/useTests";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { RefreshCw } from "lucide-react";
import { Box, Callout, Grid } from "@radix-ui/themes";
import CustomModal from "../../../elements/modal";
import { Table, TableColumnsType } from "antd";
import { CopyPlus, Trash } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { CircleAlert } from "lucide-react";

interface DashboardProps {}

const Dashboard = (props: DashboardProps) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const [filteredData, setFilteredData] = useState<
    TestType[] | null | undefined
  >(null);
  const [selectedValues, setSelectedValues] = useState({
    bot: { name: "", id: "" },
    suite: { name: "", id: "" },
    environment: { name: "", id: "" },
  });
  const [filters, setFilters] = useState({
    tab: "View all",
  });
  const handleSelect = (key: string, selectedOption: Option) => {
    setSelectedValues({ ...selectedValues, [key]: selectedOption });
  };
  const { botLists, botModaldata } = useBots(handleSelect);
  const { suiteLists, fetchSuites, suiteModaldata } = useSuites();
  const { environmentLists, fetchEnvironment, environmentModaldata } =
    useEnvironment();
  const { testData, fetchTests, isLoading } = useTests();

  const filterData = (status: string) => {
    if (status === "View all") {
      return testData;
    }
    const filteredItems = testData?.filter((item: TestType) => {
      return item.status === status;
    });
    return filteredItems;
  };
  const passedTests = filterData("Pass");
  const failedTests = filterData("Fail");

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
    if (!selectedValues?.bot?.id) return;
    fetchSuites(selectedValues.bot.id);
    fetchEnvironment(selectedValues.bot.id);
  }, [selectedValues.bot.id]);

  useEffect(() => {
    if (suiteLists && suiteLists?.length === 1)
      handleSelect("suite", suiteLists[0]);
    if (environmentLists && environmentLists?.length === 1)
      return handleSelect("environment", environmentLists[0]);
  }, [suiteLists, environmentLists]);

  useEffect(() => {
    if (
      !selectedValues?.suite?.id ||
      !selectedValues?.environment?.id ||
      !selectedValues?.bot?.id ||
      isLoading
    )
      return;
    fetchTests(selectedValues?.suite?.id, selectedValues?.environment?.id);
  }, [selectedValues]);

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
    [testData]
  );

  useEffect(() => {
    if (!testData) return;
    setFilters({ tab: "View all" });
  }, [testData]);

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

  // ################## Modal Content ########################

  const botsColumns: TableColumnsType<ModifyModaldata> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "info", key: "info" },
    {
      dataIndex: "",
      key: "x",
      render: () => (
        <div className="flex justify-center items-center gap-3">
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button className="outline-none border-none bg-transparent hover:text-[#388aeb]">
                  <CopyPlus size={18} />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="TooltipContent" sideOffset={5}>
                  Create a copy of bots and existing tests.
                  <Tooltip.Arrow className="TooltipArrow" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>

          <button>
            <Trash color="#E1654A" size={18} />
          </button>
        </div>
      ),
    },
  ];

  const suiteColumns: TableColumnsType<ModifyModaldata> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Default Success Criteria", dataIndex: "info", key: "info" },
    {
      dataIndex: "",
      key: "x",
      render: () => (
        <div className="flex justify-center items-center gap-3">
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button className="outline-none border-none bg-transparent hover:text-[#388aeb]">
                  <CopyPlus size={18} />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="TooltipContent" sideOffset={5}>
                  Create a copy of Suite and existing tests.
                  <Tooltip.Arrow className="TooltipArrow" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>

          <button>
            <Trash color="#E1654A" size={18} />
          </button>
        </div>
      ),
    },
  ];
  const environmentColumns: TableColumnsType<EnvironmentModaldata> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "URL", dataIndex: "url", key: "url" },
    {
      dataIndex: "",
      key: "x",
      render: () => (
        <div className="flex justify-center items-center gap-3">
          <button>
            <Trash color="#E1654A" size={18} />
          </button>
        </div>
      ),
    },
  ];

  // const botTableData: DataType[] = [
  //   {
  //     key: 1,
  //     name: "My first bot",
  //     info: "This is an example bot description.",
  //     description:
  //       "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  //   },
  //   {
  //     key: 2,
  //     name: "My second bot",
  //     info: "This is an example bot description.",
  //     description:
  //       "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
  //   },
  //   {
  //     key: 4,
  //     name: "My third bot",
  //     info: "This is an example bot description.",
  //     description:
  //       "My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.",
  //   },
  // ];

  // const suiteTableData: DataType[] = [
  //   {
  //     key: 1,
  //     name: "Test suite 1",
  //     info: "Determine if each response to the user is similar to the baseline in i...",
  //     description:
  //       "Determine if each response to the user is similar to the baseline in i...",
  //   },
  //   {
  //     key: 2,
  //     name: "Test suite 2",
  //     info: "Determine if each response to the user is similar to the baseline in i...",
  //     description:
  //       "Determine if each response to the user is similar to the baseline in i...",
  //   },
  //   {
  //     key: 4,
  //     name: "Test suite 3",
  //     info: "Determine if each response to the user is similar to the baseline in i...",
  //     description:
  //       "Determine if each response to the user is similar to the baseline in i...",
  //   },
  // ];
  // const environmentTableData: EnvironmentModaldata[] = [
  //   {
  //     id: 1,
  //     name: "Production",
  //     url: (
  //       <a href="https://www.example.bottest.ai/chatbot/version3">
  //         www.example.bottest.ai/chatbot/version3
  //       </a>
  //     ),
  //     description:
  //       "Determine if each response to the user is similar to the baseline in i...",
  //   },
  //   {
  //     id: 2,
  //     name: "Staging",
  //     url: (
  //       <a href="https://www.example.bottest.ai/chatbot/version3">
  //         www.example.bottest.ai/chatbot/version3
  //       </a>
  //     ),
  //     description:
  //       "Determine if each response to the user is similar to the baseline in i...",
  //   },
  // ];
  const [isBotsModalopen, setIsBotsModalopen] = useState(false);
  const [isSuiteModalopen, setIsSuiteModalopen] = useState(false);
  const [isEnvironmentModalopen, setIsEnvironmentModalopen] = useState(false);
  const [addBots, setAddbots] = useState<ModifyModaldata[]>(botModaldata);

  const handleDiscard = () => {
    setIsBotsModalopen(false);
    setIsSuiteModalopen(false);
    setIsEnvironmentModalopen(false);
  };

  const handleAddNewRow = () => {
    setAddbots([
      ...addBots,
      {
        id: addBots?.length + 1,
        name: "",
        info: "",
        description: "",
      },
    ]);
  };

  return (
    <div className=" h-[92vh] gap-5 flex flex-col">
      <div className="  border-2 rounded-lg border-[#f0f0f0] bg-white mt-12">
        <div className="py-5 px-4 border-b-2 border-[#f0f0f0]">
          <h1 className="font-semibold font-poppin text-3xl">Dashboard</h1>
        </div>
        <div className="gap-7 py-6 px-4 flex justify-between items-center">
          <div className="w-full">
            <CustomSelect
              onClick={() => setIsBotsModalopen(true)}
              // disabled={botLists?.length === 1 || !botLists}
              Btntext="Add / Modify Bots"
              Label={"Select Bot"}
              options={botLists || []}
              selectedValue={selectedValues?.bot?.name}
              placeholder="Select bots"
              // onChange={(value) => handleChange("bots", value)}
              onSelectChange={(selectedOption) => {
                handleSelect("bot", selectedOption);
              }}
            />
          </div>
          <div className="w-full">
            <CustomSelect
              onClick={() => setIsSuiteModalopen(true)}
              Label={"Select Suites"}
              disabled={suiteLists?.length === 1 || !suiteLists}
              Btntext="Add/Modify Suites"
              selectedValue={selectedValues?.suite?.name}
              placeholder="Select Suites"
              options={suiteLists || []}
              onSelectChange={(selectedOption) => {
                handleSelect("suite", selectedOption);
              }}
            />
          </div>
          <div className="w-full">
            <CustomSelect
              onClick={() => setIsEnvironmentModalopen(true)}
              Label={"Select Environment"}
              disabled={environmentLists?.length === 1 || !environmentLists}
              placeholder="Select environment"
              Btntext="Add / Modify environment"
              selectedValue={selectedValues?.environment?.name}
              options={environmentLists || []}
              onSelectChange={(selectedOption) =>
                handleSelect("environment", selectedOption)
              }
            />
          </div>
        </div>
      </div>

      <div
        className={`
        flex-1
        
        bg-white
        border-2 rounded-lg border-[#f0f0f0]
           `}
        id="flex-container"
      >
        {isLoading && !filteredData ? (
          <>
            <div className=" flex flex-col py-5 px-4 border-b-2 border-[#f0f0f0]">
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
            {filteredData ? (
              <>
                <div className="py-5 px-4 border-b-2 border-[#f0f0f0]">
                  <div className="flex justify-between">
                    <div>
                      <h1 className="font-semibold font-poppin text-xl">
                        Bot Tests
                      </h1>
                    </div>
                    <div className="gap-4 flex ">
                      <CustomButton variant="outline" color="gray">
                        Create new test
                      </CustomButton>
                      <CustomButton
                        color="blue"
                        variant="solid"
                        svgIcon={<RefreshCw size={17} />}
                      >
                        Run all tests
                      </CustomButton>
                    </div>
                  </div>
                  <div>
                    <p className="text-black">
                      In your most recent run of all your tests,{" "}
                      <span className="text-success font-medium">
                        {passedTests?.length} passed
                      </span>{" "}
                      and{" "}
                      <span className="text-danger font-medium">
                        {failedTests?.length} failed
                      </span>
                    </p>
                  </div>
                </div>
                <div className=" py-5 px-4 border-b-2 border-[#f0f0f0]">
                  <Grid
                    columns={{ lg: "3fr 1fr", md: "3fr 1fr" }}
                    gap="3"
                    width="auto"
                  >
                    <Box>
                      <div className=" border-[#d9d9d9] border rounded-lg w-max ">
                        {filterOptions &&
                          filterOptions?.map((item, i) => (
                            <button
                              key={item.key}
                              className={` cursor-pointer px-3.5 lg:py-1.5  text-black font-light text-base font-poppin border-r border-[#f0f0f0] ${
                                i === 0 ? "rounded-l-lg" : ""
                              } ${
                                i === filterOptions.length - 1
                                  ? "border-r-0"
                                  : ""
                              } ${
                                filters.tab === item.status
                                  ? "bg-[#f5f5f5] text-black "
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
                      <div>
                        <CustomInput
                          onChange={(value) => {
                            handleFilteredData(value);
                          }}
                          size="3"
                          type="text"
                          placeholder="Search for a test"
                        />
                      </div>
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
                    filteredData?.map((item: TestType) => (
                      <div className="mb-5" key={item?.title}>
                        <TestRun
                          isDisabled={!item?.full_run_enabled}
                          title={item?.name}
                          lastTestRuns={item?.recent_test_runs}
                          status={item?.status}
                          loading={isLoading}
                        />
                      </div>
                    ))}
                </div>
              </>
            ) : (
              <>
                <div className="py-5 px-4 border-b-2 border-[#f0f0f0]">
                  <h1 className="font-semibold font-poppin text-xl">Tests</h1>
                  <p className="text-black text-md">
                    Create a test and run it to see your results.
                  </p>
                </div>
                <div className=" w-full flex h-[85%] justify-center items-center flex-col gap-3">
                  <h1 className="font-normal font-poppin text-md">
                    You have no tests, create one below!
                  </h1>

                  <CustomButton color="blue" variant="solid">
                    Create new test
                  </CustomButton>
                </div>
              </>
            )}
          </>
        )}
      </div>

      <CustomModal
        isOpen={isBotsModalopen}
        title="Add / Modify Bots"
        handleDiscard={handleDiscard}
      >
        <>
          <div className="px-5 pt-4 pb-7">
            <Table
              bordered
              pagination={false}
              columns={botsColumns}
              expandable={{
                expandedRowRender: (record) => (
                  <p style={{ margin: 0 }}>{record?.description}</p>
                ),
              }}
              dataSource={botModaldata}
              footer={() => (
                <button
                  className="w-full text-[#388aeb]"
                  onClick={handleAddNewRow}
                >
                  + Add new blank Bot
                </button>
              )}
            />
          </div>
        </>
      </CustomModal>

      <CustomModal
        isOpen={isSuiteModalopen}
        title="Add / Modify Suites"
        handleDiscard={handleDiscard}
      >
        <>
          <div className="px-5 pt-4 pb-7">
            <Table
              bordered
              pagination={false}
              columns={suiteColumns}
              // expandable={{
              //   expandedRowRender: (record) => (
              //     <p style={{ margin: 0 }}>{record?.description}</p>
              //   ),
              // }}
              dataSource={suiteModaldata}
              footer={() => (
                <button
                  className="w-full text-[#388aeb]"
                  // onClick={handleAddNewRow}
                >
                  + Add new blank Suite
                </button>
              )}
            />
          </div>
        </>
      </CustomModal>

      <CustomModal
        isOpen={isEnvironmentModalopen}
        title="Add / Modify Environments for “Test suite 1”"
        handleDiscard={handleDiscard}
      >
        <>
          <div className="px-5 pt-4 pb-7">
            <div className="border border-warning bg-warningLight px-4 py-3 rounded-lg mb-5 flex gap-2">
              <div>
                <CircleAlert fill="#E7C200" color="white" />
              </div>
              <div className="flex flex-col ">
                <h1 className="text-black text-normal font-poppin">Note</h1>
                <p className="text-black text-sm font-poppin w-[80%]">
                  The UI of a different environment should match the UI of
                  original recorded tests. Attempting to run tests on
                  environments where the UI does not match may result in tests
                  failing due to inability to replay or capture data correctly!
                </p>
              </div>
            </div>

            <Table
              bordered
              pagination={false}
              columns={environmentColumns}
              // expandable={{
              //   expandedRowRender: (record) => (
              //     <p style={{ margin: 0 }}>{record?.description}</p>
              //   ),
              // }}
              dataSource={[
                ...environmentModaldata.map(({ url, ...rest }) => {
                  return {
                    ...rest,
                    url: (
                      <a href={`${url}`} target="_blank">
                        {url}
                      </a>
                    ),
                  };
                }),
              ]}
              footer={() => (
                <button
                  className="w-full text-[#388aeb]"
                  // onClick={handleAddNewRow}
                >
                  + Add new environment
                </button>
              )}
            />
          </div>
        </>
      </CustomModal>
    </div>
  );
};

export default Dashboard;
