"use client";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { Cog6ToothIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import { BottestReportProps } from "../../../utils/typesInterface";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Box, Grid } from "@radix-ui/themes";
import * as Tooltip from "@radix-ui/react-tooltip";
import LoadingSpin from "react-loading-spin";
import { Ban, Check, ChevronsRight, Shuffle, X } from "lucide-react";
import TestResult from "../testResult";
import CustomizeTest from "../customizeTest";
import { useSearchParams } from "next/navigation";

const TestRun = ({
  isDisabled = false,
  lastTestRuns,
  loading,
  specificTest,
}: BottestReportProps) => {
  const { backgroundColor, text, icon } = getBackgroundColorClass(
    specificTest?.status
  );

  function InlineWrapperWithMargin({ children }: PropsWithChildren<unknown>) {
    return <span style={{ marginRight: "0.5rem" }}>{children}</span>;
  }
  const [id, setId] = useState<string | undefined>(undefined);

  const [isTestResultModal, setIsTestResultModal] = useState<boolean>(false);
  const [isCustomizeTestModal, setIsCustomizeTestModal] = useState(false);

  const searchParams = useSearchParams();
  const testRunId = searchParams?.get("test_run_id");
  const testId = searchParams?.get("test_id");

  useEffect(() => {
    if (!testRunId) return;

    const foundTestRun = lastTestRuns?.find((item) => item?.id === testRunId);
    if (foundTestRun) {
      setId(foundTestRun.id);
      setIsTestResultModal(true);
    }
  }, [testRunId]);

  useEffect(() => {
    if (!testId) return;

    const foundTestRun = specificTest?.id.includes(testId);
    if (foundTestRun) {
      setIsCustomizeTestModal(true);
    }
  }, [testId]);

  return (
    <div className="w-full h-[110px] border border-[#dcdcdc] dark:border dark:border-[#434447] rounded-lg ">
      <Grid columns="7fr 8fr 5fr 4fr" gap="16px" className="h-full">
        <Box>
          <div className="h-full gap-2 flex flex-col justify-center px-5 ">
            <h1 className="text-black font-semibold text-lg font-poppin dark:text-white">
              {loading ? (
                <Skeleton count={1} inline width={200} height={40} />
              ) : (
                specificTest?.name
              )}
            </h1>
            {isDisabled ? (
              <div className=" border border-[#d5d5d5] dark:border dark:border-[#434447] dark:text-white dark:bg-transparent  text-black text-sm font-normal font-poppin bg-[#fafafa] flex justify-center rounded-md  max-w-[190px] w-full py-0.5  ">
                Disabled in full test runs
              </div>
            ) : null}
          </div>
        </Box>
        <Box>
          <div className="flex flex-col h-full justify-center items-center">
            <div className="flex  gap-3 mb-3 ">
              {loading ? (
                <Skeleton count={1} inline width={260} />
              ) : (
                <>
                  {lastTestRuns?.map((item, index) => (
                    <>
                      <Tooltip.Provider skipDelayDuration={100}>
                        <Tooltip.Root delayDuration={100}>
                          <Tooltip.Trigger asChild>
                            <div
                              onClick={() => {
                                setId(item?.id), setIsTestResultModal(true);
                              }}
                              key={index}
                              className={`w-4 h-4 lg:w-3 lg:h-3 xl:h-4 xl:w-4 rounded-full font-poppin cursor-pointer hover:border hover:border-[#388aeb]
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
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              className="TooltipContent dark:bg-white dark:text-black"
                              sideOffset={5}
                            >
                              {item?.status}
                              <Tooltip.Arrow className="TooltipArrow dark:fill-[#e4e5e5]" />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </Tooltip.Provider>
                    </>
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
                  <h3 className="text-[#909193] font-normal   font-poppin">
                    {"Older"}
                  </h3>
                  <h1 className="font-medium  text-black dark:text-white  font-poppin">
                    {`Last ${lastTestRuns?.length} runs`}
                  </h1>
                  <h3 className="text-[#909193] font-normal  font-poppin">
                    {"Newer"}
                  </h3>
                </>
              )}
            </div>
          </div>
        </Box>
        <Box>
          <div className="h-full flex items-center justify-center">
            {loading ? (
              <Skeleton count={1} inline width={200} height={70} />
            ) : (
              <div
                className={`w-[192px] h-[68px] pl-5 rounded-lg flex items-center justify-start gap-4 ${backgroundColor}`}
              >
                {icon}
                <div className="flex flex-col justify-start">
                  <h1 className="text-black font-normal font-poppin text-sm dark:text-white">
                    {specificTest?.status}
                  </h1>
                  <h1
                    className={`text-[#909193] ${
                      text === "View full result" &&
                      "font-semibold text-black hover:underline dark:hover:underline dark:text-white "
                    }  font-poppin text-sm`}
                  >
                    <button
                      onClick={() => {
                        setId(specificTest?.testRunId),
                          setIsTestResultModal(true);
                      }}
                    >
                      {text}
                    </button>
                  </h1>
                </div>
              </div>
            )}
          </div>
        </Box>
        <Box>
          <div className="h-full flex items-center justify-center   ">
            <div className=" w-full flex justify-center gap-7">
              <Tooltip.Provider skipDelayDuration={100}>
                <Tooltip.Root delayDuration={100}>
                  <Tooltip.Trigger asChild>
                    <button className="outline-none border-none bg-transparent">
                      <Cog6ToothIcon
                        className="h-9 w-9 text-black hover:text-[#388aeb] dark:hover:text-[#388aeb] dark:text-white"
                        onClick={() => setIsCustomizeTestModal(true)}
                      />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content className="TooltipContent dark:bg-white dark:text-black">
                      Modify Test
                      <Tooltip.Arrow className="TooltipArrow dark:fill-[#e4e5e5]" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>

              <Tooltip.Provider skipDelayDuration={100}>
                <Tooltip.Root delayDuration={100}>
                  <Tooltip.Trigger asChild>
                    <button className="outline-none border-none bg-transparent">
                      <PlayCircleIcon className="h-9 w-9 text-black hover:text-[#388aeb] dark:hover:text-[#388aeb] dark:text-white" />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content className="TooltipContent dark:bg-white dark:text-black">
                      Run Test
                      <Tooltip.Arrow className="TooltipArrow dark:fill-[#e4e5e5]" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
          </div>
        </Box>
      </Grid>
      {isTestResultModal && (
        <TestResult
          testId={specificTest?.id}
          testName={specificTest?.name}
          specificTestRunId={id}
          title={`Test results: ${specificTest?.name}`}
          isTestResultModal={isTestResultModal}
          setIsTestResultModal={setIsTestResultModal}
        />
      )}
      {isCustomizeTestModal && (
        <CustomizeTest
          title={`Customize test: ${specificTest?.name}`}
          isCustomizeTestModal={isCustomizeTestModal}
          setIsCustomizeTestModal={setIsCustomizeTestModal}
          specificTest={specificTest}
        />
      )}
    </div>
  );
};

export default TestRun;

const getBackgroundColorClass = (status: string) => {
  switch (status) {
    case "Running":
      return {
        backgroundColor: "bg-primary dark:bg-[#232e3b] ",
        text: "Test in progress",
        icon: (
          <LoadingSpin
            size="27px"
            primaryColor="#388aeb"
            secondaryColor="#dde4ee"
            width={"3px"}
          />
        ),
      };
    case "Pass":
      return {
        backgroundColor: "bg-successLight dark:bg-[#26342e]",
        text: "View full result",
        icon: (
          <div className="bg-[#54CA6E] p-1.5 rounded-2xl flex items-center justify-center ">
            <Check color="#ffffff" size={15} />
          </div>
        ),
      };
    case "Fail":
      return {
        backgroundColor: "bg-dangerLight dark:bg-[#342929]",
        text: "View full result",
        icon: (
          <div className="bg-[#E1654A] p-1.5 rounded-2xl flex items-center justify-center ">
            <X color="#ffffff" size={15} />
          </div>
        ),
      };
    case "Error":
      return {
        backgroundColor: "bg-dangerLight dark:bg-[#342929]",
        text: "View error",
        icon: (
          <svg
            width="26"
            height="26"
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
        backgroundColor: "bg-warningLight dark:bg-[#363423]",
        text: "View full result",
        icon: (
          <div className="bg-[#E7C200] p-1.5 rounded-2xl flex items-center justify-center ">
            <Shuffle color="#ffffff" size={15} />
          </div>
        ),
      };
    case "Skipped":
      return {
        backgroundColor: "bg-[#f2f2f2] dark:bg-[#2e3135]",
        text: "No result",
        icon: (
          <div className="bg-[#212427] p-1.5 rounded-2xl flex items-center justify-center ">
            <Ban color="#ffffff" size={15} />
          </div>
        ),
      };
    case "Stopped":
      return {
        backgroundColor: "bg-[#f2f2f2] dark:bg-[#2e3135]",
        text: "No result",
        icon: (
          <div className="bg-[#212427] p-1.5 rounded-2xl flex items-center justify-center ">
            <ChevronsRight color="#ffffff" size={15} />
          </div>
        ),
      };
    default:
      return { backgroundColor: "", text: "" };
  }
};
