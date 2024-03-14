/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import CustomSelect from "@/elements/CustomSelect";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import CustomButton from "@/elements/Button";
import { ReloadOutlined } from "@ant-design/icons";
import CustomInput from "@/elements/Input";
import BottestReport from "@/app/components/BottestReport/BottestReport";
import { Col, Row } from "antd";
import { useSession } from "@clerk/clerk-react";
import { useApi } from "@/hooks/useApi";
interface DashboardProps {}

interface Item {
  id: number;
  value: string;
  label: string;
}

interface UserResource {
  id: string;
}

const Dashboard = (props: DashboardProps) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { loading, error, request } = useApi();

  const Userbot = async (user: UserResource) => {
    try {
      const data = await request({
        url: `/v1/users/${user?.id}/bots`,
        method: "GET",
      });
      console.log({ data });
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    if (!user) return;
    Userbot(user);
  }, [user]);

  const initialBotsData = [
    {
      title: "My first test",
      olderText: "Older",
      newerText: "Newer",
      lastRunText: "Last 10 runs",
      progress: "Running",
      progressResult: "Test in progress",
      statuses: [
        "success",
        "failed",
        "success",
        "failed",
        "failed",
        "success",
        "success",
        "failed",
        "success",
        "success",
      ],
      isDisabledtestResult: false,
      svg: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.9997 1.71433C14.034 1.71433 16.0227 2.31758 17.7142 3.44778C19.4056 4.57799 20.724 6.18439 21.5025 8.06386C22.281 9.94332 22.4847 12.0114 22.0878 14.0067C21.6909 16.0019 20.7113 17.8346 19.2728 19.2731C17.8343 20.7116 16.0016 21.6912 14.0064 22.0881C12.0111 22.485 9.94303 22.2813 8.06357 21.5028C6.1841 20.7243 4.5777 19.4059 3.44749 17.7144C2.31728 16.023 1.71404 14.0343 1.71404 12"
            stroke="#E7C200"
            stroke-width="3.42856"
          />
        </svg>
      ),
    },
    {
      title: "My second test",
      olderText: "Older",
      newerText: "Newer",
      lastRunText: "Last 10 runs",
      progress: "Pass",
      progressResult: "View full result",
      statuses: [
        "success",
        "failed",
        "success",
        "failed",
        "failed",
        "success",
        "success",
        "failed",
        "success",
        "success",
      ],
      isDisabledtestResult: true,
      svg: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="12" fill="#54CA6E" />
          <path
            d="M17.3334 8L10.0001 15.3333L6.66675 12"
            stroke="white"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "My third test",
      olderText: "Older",
      newerText: "Newer",
      lastRunText: "Last 10 runs",
      progress: "Fail",
      progressResult: "View full result",
      isDisabledtestResult: false,
      statuses: [
        "success",
        "failed",
        "success",
        "failed",
        "failed",
        "success",
        "success",
        "failed",
        "success",
        "success",
      ],
      svg: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="12" fill="#E1654A" />
          <path
            d="M16 8L8 16"
            stroke="white"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 8L16 16"
            stroke="white"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
  ];

  const botsTest = [
    {
      key: 1,
      label: "View all",
      status: "View all",
    },
    {
      key: 2,
      label: "Failed",
      status: "Fail",
    },
    {
      key: 3,
      label: "Passed",
      status: "Pass",
    },
    {
      key: 4,
      label: "Mixed",
      status: "Mixed",
    },
    {
      key: 5,
      label: "Newly failed",
      status: "Newly failed",
    },
    {
      key: 6,
      label: "Newly passed",
      status: "Newly passed",
    },
    {
      key: 7,
      label: "Newly mixed",
      status: " Newly mixed",
    },
  ];

  const [selectedValues, setSelectedValues] = useState({
    bots: "",
    suites: "",
    environment: "",
  });
  console.log(selectedValues, "selectedValues");
  const [selectData, setselectData] = useState<Item[]>([
    {
      id: 1,
      value: "My first bot",
      label: "My first bot",
    },
    {
      id: 2,
      value: "My second bot",
      label: "My second bot",
    },
    {
      id: 3,
      value: "My third bot",
      label: "My third bot",
    },
    {
      id: 4,
      value: "My fourth bot",
      label: "My fourth bot",
    },
  ]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectSuite, setselectSuite] = useState<Item[]>([
    {
      id: 1,
      value: "Test suite 1",
      label: "Test suite 1",
    },
    {
      id: 2,
      value: "Test suite 1",
      label: "Test suite 1",
    },
    {
      id: 3,
      value: "Test suite 1",
      label: "Test suite 1",
    },
  ]);

  const [selectEnvironment, setselectEnvironment] = useState<Item[]>([
    {
      id: 1,
      value: "Example (www.example.bottest...)",
      label: "Example (www.example.bottest...)",
    },
    {
      id: 2,
      value: "Production (www.production.botte...)",
      label: "Production (www.production.botte...)",
    },
    {
      id: 3,
      value: "Staging (www.staging.bottest.ai/ch...)",
      label: "Staging (www.staging.bottest.ai/ch...)",
    },
    {
      id: 4,
      value: "Staging 2 (www.staging.bottest.ai/ch...)",
      label: "Staging 2 (www.staging.bottest.ai/ch...)",
    },
  ]);

  const [isData, setisData] = useState(false);
  const [Botsdata, setBotsdata] = useState(initialBotsData);
  const [filters, setFilters] = useState({
    tab: "View all",
  });

  // const handleSelect = (key: string, value: string) => {
  // console.log(`Selected ${value} for ${key}`);
  // };

  const handleChange = (key: string, value: string) => {
    setSelectedValues((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const filterData = (status: any) => {
    if (status === "View all") {
      return initialBotsData;
    }

    const filteredItems = initialBotsData.filter((item) => {
      return item.progress === status;
    });

    return filteredItems;
  };

  const handleButtonClick = (status: any) => {
    setFilters({
      ...filters,
      tab: status,
    });

    const filteredData = filterData(status);
    setBotsdata(filteredData);
  };

  return (
    <div className="h-[90vh]  gap-5 flex flex-col">
      <div className="h-[20%] border-2 rounded-lg border-[#f0f0f0] bg-white">
        <div className="py-5 px-4 border-b-2 border-[#f0f0f0]">
          <h1 className="font-semibold font-poppin text-3xl">Dashboard</h1>
        </div>
        <div className=" h-[100px] gap-7 px-4 flex justify-between items-center">
          <div className="w-full">
            <CustomSelect
              Btntext="Add / Modify Bots"
              selectData={selectData}
              // onClick={addBots}
              onChange={(value) => handleChange("bots", value)}
              // onSelectChange={(value) => handleSelect('bots', value)}
            />
          </div>
          <div className="w-full">
            <CustomSelect
              Btntext="Add/Modify Suites"
              selectData={selectSuite}
              // onClick={addBots}
              onChange={(value) => handleChange("suites", value)}
              // onSelectChange={(value) => handleSelect('suites', value)}
            />
          </div>
          <div className="w-full">
            <CustomSelect
              Btntext="Add / Modify environment"
              selectData={selectEnvironment}
              // onClick={addBots}
              onChange={(value) => handleChange("environment", value)}
              // onSelectChange={(value) => handleSelect('environment', value)}
            />
          </div>
        </div>
      </div>
      <div className="h-[80%] border-2 rounded-lg border-[#f0f0f0] bg-white">
        {isData ? (
          <>
            <div className="py-5 px-4 border-b-2 border-[#f0f0f0]">
              <h1 className="font-semibold font-poppin text-xl">Tests</h1>
              <p className="text-black text-md">
                Create a test and run it to see your results.
              </p>
            </div>
            <div className=" h-[87%] w-full flex justify-center items-center flex-col gap-3">
              <h1 className="font-normal font-poppin text-md">
                You have no tests, create one below!
              </h1>
              <CustomButton type="primary">Create new test</CustomButton>
            </div>
          </>
        ) : (
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
                  <span className="text-success font-medium">1 passed</span> and{" "}
                  <span className="text-danger font-medium">1 failed</span>
                </p>
              </div>
            </div>
            <div className=" py-5 px-4 border-b-2 border-[#f0f0f0]">
              <Row>
                <Col lg={19} md={20}>
                  <div className=" border-[#d9d9d9] border rounded-lg w-max ">
                    {botsTest?.map((item, i) => (
                      <button
                        key={item.key}
                        className={` cursor-pointer px-3.5 lg:py-1.5  text-black font-light text-base font-poppin border-r border-[#f0f0f0] ${
                          i === 0 ? "rounded-l-lg" : ""
                        } ${i === botsTest.length - 1 ? "border-r-0" : ""} ${
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
                    <CustomInput type="text" placeholder="Search for a test" />
                  </div>
                </Col>
              </Row>
            </div>

            <div className="px-5 py-6">
              {Botsdata?.map((item) => (
                <div className="mb-5" key={item?.title}>
                  <BottestReport
                    statuses={item?.statuses}
                    isDisabled={item?.isDisabledtestResult}
                    title={item?.title}
                    olderText={item?.olderText}
                    newerText={item?.newerText}
                    lastRunText={item?.lastRunText}
                    progress={item?.progress}
                    progressResult={item?.progressResult}
                    svg={item?.svg}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
