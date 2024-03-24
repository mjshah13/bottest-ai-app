/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Col, Row } from "antd";
import { useApi } from "../../../hooks/useApi";
import { Option, TestType } from "../../../utils/typesInterface";
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
import { useOrganization } from "@clerk/nextjs";

interface DashboardProps {}

interface Prop {}

export const ButtonIcon: React.FC<Prop> = ({}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M2 8C2 6.4087 2.63214 4.88258 3.75736 3.75736C4.88258 2.63214 6.4087 2 8 2C9.67737 2.00631 11.2874 2.66082 12.4933 3.82667L14 5.33333"
      stroke="#FDFCFA"
      stroke-width="1.33333"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14.0001 2V5.33333H10.6667"
      stroke="#FDFCFA"
      stroke-width="1.33333"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14 8C14 9.5913 13.3679 11.1174 12.2426 12.2426C11.1174 13.3679 9.5913 14 8 14C6.32263 13.9937 4.71265 13.3392 3.50667 12.1733L2 10.6667"
      stroke="#FDFCFA"
      stroke-width="1.33333"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M5.33333 10.6667H2V14"
      stroke="#FDFCFA"
      stroke-width="1.33333"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const Dashboard = (props: DashboardProps) => {
  const handleSelect = (key: string, selectedOption: Option) => {
    setSelectedValues({ ...selectedValues, [key]: selectedOption });
  };
  const { botLists } = useBots(handleSelect);
  const { suiteLists, fetchSuites } = useSuites();
  const { environmentLists, fetchEnvironment } = useEnvironment();
  const { testData, fetchTests, isLoading } = useTests();
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
    if (!selectedValues?.suite?.id || !selectedValues?.environment?.id) return;
    fetchTests(selectedValues?.suite?.id, selectedValues?.environment?.id);
  }, [selectedValues?.suite?.id, selectedValues?.environment?.id]);

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

  return (
    <div className=" h-[92vh] gap-5 flex flex-col">
      <div className="  border-2 rounded-lg border-[#f0f0f0] bg-white mt-12">
        <div className="py-5 px-4 border-b-2 border-[#f0f0f0]">
          <h1 className="font-semibold font-poppin text-3xl">Dashboard</h1>
        </div>
        <div className="gap-7 py-6 px-4 flex justify-between items-center">
          <div className="w-full">
            <CustomSelect
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

            <div className=" h-[370px] w-full flex justify-center items-center flex-col gap-3">
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
                      <CustomButton>Create new test</CustomButton>
                      <CustomButton type="primary" svgIcon={<ButtonIcon />}>
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
                  <Row>
                    <Col lg={19} md={20}>
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
                    </Col>
                    <Col lg={5} md={4}>
                      <div>
                        <CustomInput
                          onChange={(value) => {
                            handleFilteredData(value);
                          }}
                          type="text"
                          placeholder="Search for a test"
                        />
                      </div>
                    </Col>
                  </Row>
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
                  <CustomButton type="primary">Create new test</CustomButton>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
