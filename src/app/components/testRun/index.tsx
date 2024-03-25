"use client";
import { Col, Row, Spin, Tooltip } from "antd";
import React, { PropsWithChildren } from "react";
import { Cog6ToothIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import { BottestReportProps } from "../../../utils/typesInterface";
import Skeleton from "react-loading-skeleton";
import { LoadingOutlined } from "@ant-design/icons";

const TestRun = ({
  isDisabled = false,
  title,
  lastTestRuns,
  status,
  loading,
}: BottestReportProps) => {
  const { backgroundColor, text, icon } = getBackgroundColorClass(status);

  function InlineWrapperWithMargin({ children }: PropsWithChildren<unknown>) {
    return <span style={{ marginRight: "0.5rem" }}>{children}</span>;
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
                  {lastTestRuns?.map((item, index) => (
                    <div
                      key={index}
                      className={`w-4 h-4 lg:w-3 lg:h-3 xl:h-4 xl:w-4 rounded-full 
                      ${
                        item?.status === "Pass"
                          ? "bg-success"
                          : item?.status === "Mixed"
                          ? "bg-[#E7C200]"
                          : item?.status === "Fail" || item?.status === "Error"
                          ? "bg-danger"
                          : item?.status === "Running"
                          ? "bg-[#388aeb]"
                          : item?.status === "Skipped"
                          ? "bg-[#212427]"
                          : item?.status === "Stopped"
                          ? "bg-[#212427]"
                          : ""
                      }`}
                    />
                  ))}
                </>
              )}
            </div>
            <div className="flex gap-12 xl:gap-14 lg:gap-10">
              {loading ? (
                <Skeleton
                  count={3}
                  wrapper={InlineWrapperWithMargin}
                  inline
                  width={78}
                />
              ) : (
                <>
                  <h3 className="text-[#909193] font-normal font-poppin">
                    {"Older"}
                  </h3>
                  <h1 className="font-medium  text-black font-poppin">
                    {`Last ${lastTestRuns?.length} runs`}
                  </h1>
                  <h3 className="text-[#909193] font-normal font-poppin">
                    {"Newer"}
                  </h3>
                </>
              )}
            </div>
          </div>
        </Col>
        <Col span={5}>
          <div className="h-full flex items-center justify-center">
            {loading ? (
              <Skeleton count={1} inline width={200} height={70} />
            ) : (
              <div
                className={`w-[192px] h-[68px] pl-5 rounded-lg flex items-center justify-start gap-4 ${backgroundColor}`}
              >
                {icon}
                <div className="flex flex-col justify-start">
                  <h1 className="text-black font-normal font-poppin text-md">
                    {status}
                  </h1>
                  <button
                    className={`text-[#909193] ${
                      text === "View full result" &&
                      "font-semibold text-black hover:underline "
                    }  font-poppin text-md`}
                  >
                    {text}
                  </button>
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

const getBackgroundColorClass = (status: string) => {
  switch (status) {
    case "Running":
      return {
        backgroundColor: "bg-primary",
        text: "Test in progress",
        icon: (
          <Spin
            indicator={
              <LoadingOutlined
                style={{ fontSize: 24 }}
                spin
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            }
          />
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
    case "Error":
      return {
        backgroundColor: "bg-dangerLight",
        text: "View error",
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
              d="M12.975 6.185L12.754 14.43H11.139L10.918 6.185H12.975ZM12.006 18.119C11.6547 18.119 11.36 18 11.122 17.762C10.884 17.524 10.765 17.2293 10.765 16.878C10.765 16.5267 10.884 16.232 11.122 15.994C11.36 15.756 11.6547 15.637 12.006 15.637C12.346 15.637 12.635 15.756 12.873 15.994C13.111 16.232 13.23 16.5267 13.23 16.878C13.23 17.2293 13.111 17.524 12.873 17.762C12.635 18 12.346 18.119 12.006 18.119Z"
              fill="white"
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
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g opacity="0.8">
              <rect width="24" height="24" rx="12" fill="#212427" />
              <g clip-path="url(#clip0_3009_5065)">
                <path
                  d="M11.9999 18.6667C15.6818 18.6667 18.6666 15.6819 18.6666 12C18.6666 8.31811 15.6818 5.33334 11.9999 5.33334C8.31802 5.33334 5.33325 8.31811 5.33325 12C5.33325 15.6819 8.31802 18.6667 11.9999 18.6667Z"
                  stroke="white"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.2666 7.26666L16.7333 16.7333"
                  stroke="white"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_3009_5065">
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
    default:
      return { backgroundColor: "", text: "" };
  }
};
