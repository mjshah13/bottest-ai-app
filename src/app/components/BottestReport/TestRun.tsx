"use client";

import { Col, Row, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { Cog6ToothIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import { BottestReportProps } from "@/utils/Interface";
import { useApi } from "@/hooks/useApi";

const TestRun = ({
  isDisabled = false,
  title,
  olderText,
  lastRunText,
  newerText,
  progress,
  progressResult,
  svg,
  statuses,
  testId,
  environmentId,
}: BottestReportProps) => {
  const { loading, error, request } = useApi();
  const [testDetails, setTestDetails] = useState(null);

  const getTestDetails = async (testId: string, environmentId: string) => {
    try {
      let query = "";
      if (environmentId) {
        query = `?environment_id=${environmentId}`;
      }
      const data = await request({
        url: `/v1/test/${testId}/test_runs${query}

`,
        method: "GET",
      });

      setTestDetails(data.data);
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    getTestDetails(testId, environmentId);
  }, [testId, environmentId]);

  const getBackgroundColorClass = () => {
    switch (progress) {
      case "Running":
        return "bg-warningLight";
      case "Pass":
        return "bg-successLight";
      case "Fail":
        return "bg-dangerLight";
      default:
        return "";
    }
  };

  // Get the background color class

  return (
    <div className="w-full h-[110px] border border-[#dcdcdc] rounded-lg">
      <Row className="h-full">
        <Col span={7}>
          <div className="h-full gap-2 flex flex-col justify-center px-5 ">
            <h1 className="text-black font-semibold text-lg font-poppin">
              {title}
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
              {statuses?.map((status, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 lg:w-3 lg:h-3 xl:h-4 xl:w-4 rounded-full ${
                    status === "success"
                      ? "bg-success"
                      : status === "failed"
                      ? "bg-danger"
                      : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-12 xl:gap-14 lg:gap-10">
              <h3 className="text-[#909193] font-normal font-poppin">
                {olderText}
              </h3>
              <h1 className="font-medium  text-black font-poppin">
                {lastRunText}
              </h1>
              <h3 className="text-[#909193] font-normal font-poppin">
                {newerText}
              </h3>
            </div>
          </div>
        </Col>
        <Col span={5}>
          <div className="h-full flex items-center justify-center">
            <div
              className={`w-[192px] h-[68px] rounded-lg flex items-center justify-center gap-3 ${getBackgroundColorClass()}`}
            >
              {svg}
              <div>
                <h1 className="text-black font-normal font-poppin text-md">
                  {progress}
                </h1>
                <p className="text-[#909193] font-poppin text-md">
                  {progressResult}
                </p>
              </div>
            </div>
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
