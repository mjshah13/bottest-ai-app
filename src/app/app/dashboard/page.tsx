/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { ReloadOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { useApi } from "../../../hooks/useApi";
import {
  UserResource,
  BotType,
  EnvironmentType,
  Option,
  SuiteType,
  TestType,
} from "../../../utils/typesInterface";
import TestRun from "../../components/testRun";
import CustomSelect from "../../../elements/select";
import CustomButton from "../../../elements/button";
import CustomInput from "../../../elements/input";
import { filterOptions } from "../../../utils/common";

interface DashboardProps {}

const Dashboard = (props: DashboardProps) => {
  const { user } = useUser();
  const { request } = useApi();
  const [botLists, setBotLists] = useState<BotType[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suiteLists, setSuiteLists] = useState<SuiteType[] | null>(null);
  const [environmentLists, setEnvironmentLists] = useState<
    EnvironmentType[] | null
  >(null);
  const [testData, setTestData] = useState<TestType[] | null>(null);
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

  const getBots = async (user: UserResource) => {
    try {
      const data = await request({
        url: `/v1/users/${user?.id}/bots`,
        method: "GET",
      });
      const formatedData = data?.data?.map((bots: BotType) => ({
        id: bots.id,
        name: bots.name,
      }));
      setBotLists(formatedData);
      if (data?.data?.length === 1) return handleSelect("bot", formatedData[0]);
    } catch (error) {
      console.error({ error });
    }
  };

  const getSuites = async (userBot: string) => {
    try {
      const data = await request({
        url: `/v1/bots/${userBot}/suites`,
        method: "GET",
      });

      const selectDataItems: SuiteType[] =
        data?.data?.map(({ id, name }: SuiteType) => ({
          id,
          name,
        })) || [];
      setSuiteLists(selectDataItems);
    } catch (error) {
      console.error({ error });
    }
  };

  const getEnvironment = async (userBot: string) => {
    try {
      const data = await request({
        url: `/v1/bots/${userBot}/environments`,
        method: "GET",
      });
      const selectDataItems: EnvironmentType[] =
        data?.data?.map(({ id, name }: EnvironmentType) => ({
          id,
          name,
        })) || [];
      setEnvironmentLists(selectDataItems);
    } catch (error) {
      console.error({ error });
    }
  };
  const enrichDataWithLastTests = async (dataArray: TestType[]) => {
    // Map over the array to convert it into an array of promises using the ids to call the API.
    const promises = dataArray.map(async (item: TestType) => {
      // Extract the id from the current item.
      const { id } = item;

      try {
        // Make the API call for the current id.
        const lastTestsData = await getTestDetails(
          id,
          selectedValues?.environment?.id
        );
        const lastTests = lastTestsData?.data?.sort(
          (a: TestType, b: TestType) => {
            const dateA = new Date(a?.created_at);
            const dateB = new Date(b?.created_at);

            const timeA = dateA.getHours() * 60 + dateA.getMinutes();
            const timeB = dateB.getHours() * 60 + dateB.getMinutes();

            return timeA - timeB;
          }
        );
        const status = lastTests[lastTests.length - 1]?.status;

        // Assign the API response to a new property `lastTests` in the current item.
        return { ...item, lastTests, status };
      } catch (error) {
        // Handle any possible errors. You could also choose to return the item without lastTests.
        console.error(`Failed to fetch lastTests for ID ${id}:`, error);
        return item; // Return the item without `lastTests`.
      }
    });

    // Wait for all promises to settle, then return the new data array with lastTests added to each item.
    return Promise.all(promises);
  };
  const getTests = async (suite: string) => {
    try {
      setIsLoading(true);
      const data = await request({
        url: `/v1/suites/${suite}/tests`,
        method: "GET",
      });
      const enhancedData = await enrichDataWithLastTests(data?.data);
      setTestData(enhancedData);
    } catch (error) {
      setIsLoading(false);
      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    getBots(user);
  }, [user]);

  useEffect(() => {
    if (!testData) return;
    setFilteredData(testData);
  }, [testData]);

  useEffect(() => {
    if (!selectedValues?.bot?.id) return;
    getSuites(selectedValues.bot.id);
    getEnvironment(selectedValues.bot.id);
  }, [selectedValues.bot.id]);

  useEffect(() => {
    if (suiteLists && suiteLists?.length === 1)
      handleSelect("suite", suiteLists[0]);
    if (environmentLists && environmentLists?.length === 1)
      return handleSelect("environment", environmentLists[0]);
  }, [suiteLists, environmentLists]);

  useEffect(() => {
    if (!selectedValues?.suite?.id || !selectedValues?.environment?.id) return;
    getTests(selectedValues?.suite?.id);
  }, [selectedValues?.suite?.id, selectedValues?.environment?.id]);

  const handleSelect = (key: string, selectedOption: Option) => {
    setSelectedValues({ ...selectedValues, [key]: selectedOption });
  };
  const getTestDetails = (testId: string, environmentId: string) => {
    try {
      let query = "";
      if (environmentId) {
        query = `?environment_id=${environmentId}`;
      }
      return request({
        url: `/v1/tests/${testId}/test_runs${query}`,
        method: "GET",
      });
    } catch (error) {
      console.error({ error });
    } finally {
    }
  };

  useEffect(() => {
    if (!testData) return;
    enrichDataWithLastTests(testData)
      .then((enhancedData) => {
        // console.log("Data with lastTests:", enhancedData);
      })
      .catch((error) => {
        // console.error("An error occurred:", error);
      });
  }, [testData]);




  const handleFilteredData = (value : string) =>{
    console.log(value)
    if (value.trim() === "") {
      setFilteredData(testData);
    } else {
      const filteredTest = testData?.filter((item) =>
        item?.name
          .toLowerCase()
          .includes(value.toLowerCase())
      );
      console.log(filteredTest)
      setFilteredData(filteredTest);
    
      
    }
  
  }

  return (
    <div className="h-full gap-5 flex flex-col">
      <div className="h-[23%] border-2 rounded-lg border-[#f0f0f0] bg-white mt-7">
        <div className="py-5 px-4 border-b-2 border-[#f0f0f0]">
          <h1 className="font-semibold font-poppin text-3xl">Dashboard</h1>
        </div>
        <div className=" h-[100px] gap-7 px-4 flex justify-between items-center">
          <div className="w-full">
            <CustomSelect
              // disabled={botLists?.length === 1 || !botLists}
              Btntext="Add / Modify Bots"
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
        className={` ${
          testData ? "h-[77%] " : "min-h-[300px] h-full flex flex-col "
        }  border-2 rounded-lg border-[#f0f0f0] bg-white`}
      >
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
                  <CustomButton type="primary" icon={<ReloadOutlined />}>
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
                            i === filterOptions.length - 1 ? "border-r-0" : ""
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
                       handleFilteredData(value)
                      }}
                      type="text"
                      placeholder="Search for a test"
                    />
                  </div>
                </Col>
              </Row>
            </div>

            <div className="px-5 py-6 h-[415px] overflow-y-scroll ">
              {filteredData &&
                filteredData?.map((item: TestType) => (
                  <div className="mb-5" key={item?.title}>
                    <TestRun
                      isDisabled={!item?.full_run_enabled}
                      title={item?.name}
                      lastTestRuns={item?.lastTests}
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
            <div className="min-h-[520px] h-full w-full flex justify-center items-center flex-col gap-3">
              <h1 className="font-normal font-poppin text-md">
                You have no tests, create one below!
              </h1>
              <CustomButton type="primary">Create new test</CustomButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
