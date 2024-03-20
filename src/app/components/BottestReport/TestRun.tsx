"use client";

import { Col, Row, Tooltip } from "antd";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { Cog6ToothIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import { BottestReportProps } from "../../../utils/Interface";
import { useApi } from "../../../hooks/useApi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TestRun = ({
  isDisabled = false,
  title,
  testId,
  environmentId,
}: BottestReportProps) => {
  const { loading, error, request } = useApi();
  const [testDetails, setTestDetails] = useState<TestData[]>([]);
  const [recentTest, setRecentTest] = useState<TestData | null>(null);

  interface TestData {
    created_at: string;
    status: string;
  }

  const getTestDetails = async (testId: string, environmentId: string) => {
    try {
      let query = "";
      if (environmentId) {
        query = `?environment_id=${environmentId}`;
      }
      const data = await request({
        url: `/v1/tests/${testId}/test_runs${query}`,
        method: "GET",
      });

      const sorted = data?.data?.sort((a: TestData, b: TestData) => {
        const dateA = new Date(a?.created_at);
        const dateB = new Date(b?.created_at);

        const timeA = dateA.getHours() * 60 + dateA.getMinutes();
        const timeB = dateB.getHours() * 60 + dateB.getMinutes();

        return timeA - timeB;
      });

      setTestDetails(data?.data);

      setRecentTest(sorted[sorted.length - 1]);
    } catch (error) {
      console.error({ error });
    } finally {
    }
  };

  useEffect(() => {
    getTestDetails(testId, environmentId);
  }, [testId, environmentId]);

  const getBackgroundColorClass = () => {
    switch (recentTest?.status) {
      case "Running":
        return {
          backgroundColor: "bg-primary",
          text: "Test in progress",
          icon: (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.9997 1.71433C14.034 1.71433 16.0227 2.31758 17.7142 3.44778C19.4056 4.57799 20.724 6.18439 21.5025 8.06386C22.281 9.94332 22.4847 12.0114 22.0878 14.0067C21.6909 16.0019 20.7113 17.8346 19.2728 19.2731C17.8343 20.7116 16.0016 21.6912 14.0064 22.0881C12.0111 22.485 9.94303 22.2813 8.06357 21.5028C6.1841 20.7243 4.5777 19.4059 3.44749 17.7144C2.31728 16.023 1.71404 14.0343 1.71404 12"
                stroke="#388AEB"
                stroke-width="3.42856"
              />
            </svg>
          ),
        };
      case "Pass":
        return {
          backgroundColor: "bg-successLight",
          text: "View full result",
          icon: (
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
        };
      case "Fail":
      case "Error":
        return {
          backgroundColor: "bg-dangerLight",
          text: "View full result",
          icon: (
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
        };
      case "Mixed":
        return {
          backgroundColor: "bg-warningLight",
          text: "View full result",
          icon: (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" rx="12" fill="#E7C200" />
              <g clip-path="url(#clip0_2971_4445)">
                <path
                  d="M5.3335 16H6.26683C7.1335 16 7.9335 15.6 8.46683 14.8667L12.5335 9.13333C13.0002 8.4 13.8668 8 14.7335 8H18.6668"
                  stroke="white"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16 5.33331L18.6667 7.99998L16 10.6666"
                  stroke="white"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.3335 8H6.60016C7.60016 8 8.5335 8.6 9.00016 9.46667"
                  stroke="white"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.6669 16H14.7335C13.8669 16 13.0002 15.5333 12.5335 14.8L12.2002 14.2667"
                  stroke="white"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16 13.3333L18.6667 16L16 18.6666"
                  stroke="white"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2971_4445">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(4 4)"
                  />
                </clipPath>
              </defs>
            </svg>
          ),
        };
      case "Skipped":
        return {
          backgroundColor: "bg-[#f2f2f2]",
          text: "No result",
          icon: (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.8">
                <rect width="24" height="24" rx="12" fill="#212427" />
                <path
                  d="M8 15.3333L11.3333 12L8 8.66666"
                  stroke="white"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.6667 15.3333L16.0001 12L12.6667 8.66666"
                  stroke="white"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
          ),
        };
      case "Stopped":
        return {
          backgroundColor: "bg-[#f2f2f2]",
          text: "No result",
          icon: (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.8">
                <rect width="24" height="24" rx="12" fill="#212427" />
                <path
                  d="M8 15.3333L11.3333 12L8 8.66666"
                  stroke="white"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.6667 15.3333L16.0001 12L12.6667 8.66666"
                  stroke="white"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
          ),
        };
      default:
        return { backgroundColor: "", text: "" };
    }
  };

  const { backgroundColor, text, icon } = getBackgroundColorClass();

  function InlineWrapperWithMargin({ children }: PropsWithChildren<unknown>) {
    return <span style={{ marginRight: '0.5rem' }}>{children}</span>
}


  return (
    <div className="w-full h-[110px] border border-[#dcdcdc] rounded-lg">
      <Row className="h-full">
        <Col span={7}>
          <div className="h-full gap-2 flex flex-col justify-center px-5 ">
            <h1 className="text-black font-semibold text-lg font-poppin">
              {loading ? (
                <Skeleton count={1} inline width={200} height={40} />
              ) : (
                title
              )}
            </h1>
            {isDisabled ? (
              <div className=" bg-[#fafafa] flex justify-center rounded-md border border-[#dcdcdc] max-w-[170px] w-full  py-0.5  ">
                Disabled in full test runs
              </div>
            ) : null}
          </div>
        </Col>
        <Col span={8}>
          <div className="flex flex-col h-full justify-center items-center">
            <div className="flex  gap-3 mb-3 ">
              {loading ? (
                <Skeleton count={1} inline width={260} />
              ) : (
                <>
                  {testDetails?.map((item, index) => (
                    <div
                      key={index}
                      className={`w-4 h-4 lg:w-3 lg:h-3 xl:h-4 xl:w-4 rounded-full ${
                        item.status === "Pass"
                          ? "bg-success"
                          : item?.status === "Mixed"
                          ? "bg-[#E7C200]"
                          : item?.status === "Fail" || "Error"
                          ? "bg-danger"
                          : item?.status === "Running"
                          ? "bg-[#388aeb]"
                          : item?.status === "Skipped"
                          ? "bg-black"
                          : item?.status === "Stopped"
                          ? "bg-black"
                          : null
                      }`}
                    />
                  ))}
                </>
              )}
            </div>
            <div className="flex gap-12 xl:gap-14 lg:gap-10">
            {loading ? (
                <Skeleton count={3}
                wrapper={InlineWrapperWithMargin}
                inline
                width={78} />
              ) : <>
            
              <h3 className="text-[#909193] font-normal font-poppin">
                {"Older"}
              </h3>
              <h1 className="font-medium  text-black font-poppin">
                {`Last ${testDetails.length} runs`}
              </h1>
              <h3 className="text-[#909193] font-normal font-poppin">
                {"Newer"}
              </h3>
              </>
}
            </div>
          </div>
        </Col>
        <Col span={5}>
          <div className="h-full flex items-center justify-center">
            {loading ? (
              <Skeleton count={1} inline width={200} height={70} />
            ) : (
              <div
                className={`w-[192px] h-[68px] rounded-lg flex items-center justify-center gap-3 ${backgroundColor}`}
              >
                {icon}
                <div>
                  <h1 className="text-black font-normal font-poppin text-md">
                    {recentTest?.status}
                  </h1>
                  <p
                    className={`text-[#909193] ${
                      text === "View full result" && "font-semibold text-black"
                    }  font-poppin text-md`}
                  >
                    {text}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Col>
        <Col span={4}>
          <div className="h-full flex items-center justify-center   ">
            <div className=" w-full flex justify-center gap-7">
              <Tooltip title="Setting">
                <button className="outline-none border-none bg-transparent">
                  <Cog6ToothIcon className="h-9 w-9 text-black hover:text-[#388aeb]" />
                </button>
              </Tooltip>
              <Tooltip title="Run test">
                <button className="outline-none border-none bg-transparent">
                  <PlayCircleIcon className="h-9 w-9 text-black hover:text-[#388aeb]" />
                </button>
              </Tooltip>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TestRun;
