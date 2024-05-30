"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GlobalStateType, Option } from "../../../utils/typesInterface";
import { GlobalStateContext } from "../../../globalState";
import { Grid, Table } from "@radix-ui/themes";
import {
  CalendarCheck2,
  ChevronLeft,
  ChevronRight,
  Cog,
  Copy,
  Download,
  FileBarChart2,
  NotebookText,
} from "lucide-react";
import useBots from "../../../hooks/useBots";
import useSuites from "../../../hooks/useSuites";
import useEnvironment from "../../../hooks/useEnvironment";
import useSuiteRuns from "../../../hooks/useSuiteRuns";
import ConfigureComparisonModal from "../../components/ configureComparisonModal ";
import * as Tooltip from "@radix-ui/react-tooltip";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import CustomSelect from "../../../elements/select";

const Reports = () => {
  const { organization } = useOrganization();
  const router = useRouter();
  const [containerHeight, setContainerHeight] = useState(0);
  const maxPagesToShow = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
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
  const {
    fetchSuiteRuns,
    totalPages,
    suitesData,
    isLoading: loading,
  } = useSuiteRuns();

  useEffect(() => {
    if (!selectedBot) return;
    fetchSuites(selectedBot?.id);
    fetchEnvironment(selectedBot.id);
  }, [selectedBot]);

  useEffect(() => {
    if (!selectedBot || !selectedSuite) return;
    fetchSuiteRuns(selectedSuite?.id, null, currentPage, 10);
  }, [selectedBot, selectedSuite, currentPage]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {});
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getVisiblePages = () => {
    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  useEffect(() => {
    const updateContainerHeight = () => {
      const container = document?.getElementById("flex-container");
      if (container) {
        const height = container?.offsetHeight;
        setContainerHeight(height);
      }
    };

    updateContainerHeight();
    window && window?.addEventListener("resize", updateContainerHeight);

    return () => {
      window && window?.removeEventListener("resize", updateContainerHeight);
    };
  }, []);

  useEffect(() => {
    setSelectedBot(null);
    setSelectedSuite(null);
    setSelectedEnvironment(null);
  }, [organization?.id]);

  return (
    <div className="h-[95vh] flex flex-col">
      <div className=" border-2 border-b-0  rounded-lg rounded-bl-none rounded-br-none border-[#f0f0f0] dark:bg-[#212427] dark:border-none   bg-white mt-12 ">
        <div className="py-5 px-4 border-b border-[#f0f0f0] dark:border-b  dark:border-[#434447]">
          <h1 className="font-semibold font-poppin text-3xl dark:text-white text-dark">
            Suite Run Reports
          </h1>
        </div>
        <div className="py-4 px-5  ">
          <Grid columns="1fr 1fr 1fr" gap="18px">
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
              />
            </div>
            <div></div>
          </Grid>
          <div className="mt-5 flex flex-col">
            <h3 className="text-black text-sm font-poppin font-normal">
              Comparison Suite Run:{" "}
            </h3>
            <div className="flex gap-2 items-center  mt-1.5">
              <p className="text-black font-poppin text-sm font-semibold">
                Most Recent on Same Environment (default)
              </p>
              <button
                onClick={() => setIsComparisonModalOpen(true)}
                className="outline-none text-sm border-none text-[#388AEB] font-semibold cursor-pointer font-poppin"
              >
                Configure
              </button>
            </div>
            <p className="text-[#909193] text-sm font-poppin font-normal mt-1.5 w-[704px] leading-[22px] ">
              Configure the Comparison Suite Run for all “Test suite 3” reports.
              Note that updating this configuration will update each interactive
              report for this Suite.
            </p>
          </div>
        </div>
      </div>

      <div
        className={`
      flex-1
      mb-4
      bg-white dark:bg-[#212427] border-t-0
      border-2 rounded-lg rounded-tl-none rounded-tr-none border-[#f0f0f0] dark:border-none dark:border dark:border-[#434447]
         `}
        id="flex-container"
      >
        {!selectedSuite ? (
          <div className=" h-full flex items-center justify-center flex-col">
            <Image width={184} height={152} src="/Assets/noData.svg" alt="" />
            <h1 className="text-black font-semibold text-lg mt-2 ">
              Please select the suites to see the suite runs.{" "}
            </h1>
          </div>
        ) : (
          <>
            <div
              className="px-5 py-2  "
              style={{
                maxHeight: `${containerHeight - 50}px`,
                overflowY: "auto",
              }}
            >
              <Table.Root variant="surface" size={"2"}>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30] text-sm font-semibold">
                      <div className="w-[150px]">Timestamp</div>{" "}
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30] text-sm font-semibold">
                      <div className="w-[160px]">Suite Run ID</div>{" "}
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30] text-sm font-semibold">
                      <div className="w-[150px]">Environment</div>{" "}
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30] text-sm font-semibold">
                      <div className="w-[150px]">Initiated By</div>{" "}
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30] text-sm font-semibold">
                      <div className="w-[205px]">Link</div>{" "}
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="border-[#d2cdcd] dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30] text-sm font-semibold ">
                      <div className="w-[45px] flex justify-center">PDF</div>{" "}
                    </Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                {loading ? (
                  <Table.Body>
                    {Array(5)
                      .fill(5)
                      .map((_, i) => (
                        <Table.Row key={i} className="align-middle">
                          <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                            <Skeleton count={1} width={150} height={25} />
                          </Table.Cell>
                          <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                            <Skeleton count={1} width={150} height={25} />
                          </Table.Cell>
                          <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                            <Skeleton count={1} width={150} height={25} />
                          </Table.Cell>
                          <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                            <Skeleton count={1} width={150} height={25} />
                          </Table.Cell>
                          <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                            <Skeleton count={1} width={150} height={25} />
                          </Table.Cell>
                          <Table.Cell className=" dark:border-[#373a3b]">
                            <Skeleton count={1} width={45} height={25} />
                          </Table.Cell>
                        </Table.Row>
                      ))}
                  </Table.Body>
                ) : (
                  <Table.Body>
                    {suitesData.map((data, i) => (
                      <Table.Row key={i} className="h-[47px] align-middle">
                        <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                          <div className="w-[150px] ">
                            <p className=" overflow-hidden text-ellipsis whitespace-nowrap">
                              {typeof data?.completed_at === "string"
                                ? moment(data.completed_at).format(
                                    "M/D/YY h:mm:ss A"
                                  )
                                : ""}
                            </p>
                          </div>
                        </Table.Cell>
                        <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                          <div className="flex items-center w-[160px]">
                            <p className=" overflow-hidden text-ellipsis whitespace-nowrap ">
                              {data?.id}
                            </p>
                            <Tooltip.Provider skipDelayDuration={100}>
                              <Tooltip.Root delayDuration={100}>
                                <Tooltip.Trigger asChild>
                                  <button
                                    onClick={() => copyToClipboard(data?.id)}
                                    className="outline-none border-none bg-transparent hover:text-[#388aeb] disabled:hover:text-[#adb1bd] disabled:cursor-not-allowed"
                                  >
                                    <Copy size={16} className="ms-2" />
                                  </button>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Content className="TooltipContent dark:bg-white dark:text-black">
                                    Copy suite id
                                    <Tooltip.Arrow className="TooltipArrow dark:fill-[#e4e5e5]" />
                                  </Tooltip.Content>
                                </Tooltip.Portal>
                              </Tooltip.Root>
                            </Tooltip.Provider>
                          </div>
                        </Table.Cell>
                        <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                          <div className=" w-[150px]">
                            <p className=" overflow-hidden text-ellipsis whitespace-nowrap ">
                              {
                                environmentLists?.find(
                                  (item) => item?.id === data?.environment_id
                                )?.name
                              }
                            </p>
                          </div>
                        </Table.Cell>
                        <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                          <div className=" w-[150px]">
                            <p className=" flex gap-2 items-center">
                              {data.initiation_type &&
                                renderInitiationIcon(data.initiation_type)}
                              {data?.initiation_type}
                            </p>
                          </div>
                        </Table.Cell>
                        <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                          <div className=" min-w-[205px] w-full">
                            <button
                              className="text-[#388AEB] font-normal text-sm flex items-center gap-3  w-full"
                              onClick={() =>
                                router.push(
                                  `/analytics-reports?suite_run_id=${data?.id}`
                                )
                              }
                            >
                              <FileBarChart2 size={16} />
                              Interactive Report
                            </button>
                          </div>
                        </Table.Cell>
                        <Table.Cell className="border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                          <div className="flex justify-center w-[48px]">
                            <button
                              onClick={() =>
                                router.push(
                                  `/analytics-reports?suite_run_id=${
                                    data?.id
                                  }&isPdf=${true}`
                                )
                              }
                            >
                              <Download
                                size={16}
                                className="ms-1 hover:text-[#adb1bd]"
                              />
                            </button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                )}
              </Table.Root>
            </div>
            <div className="w-full flex justify-end items-center">
              {suitesData?.length !== 0 && (
                <nav className="flex items-center justify-end px-3 h-[64px] w-[292px]">
                  <div className=" ">
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className="flex items-center  border-transparent pr-1 disabled:text-[#bfbfbf] text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                      <ChevronLeft
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  <div className="hidden md:flex gap-2 mx-1.5">
                    {getVisiblePages().map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`flex justify-center items-center border-2 px-4 w-[32px] h-[34px] rounded-md text-sm font-normal font-poppin ${
                          currentPage === page
                            ? "text-[#388AEB] font-semibold border-1 border-[#388AEB]"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <div className="">
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="flex items-center  border-transparent pl-1 disabled:text-[#bfbfbf] text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                      <ChevronRight
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </nav>
              )}
            </div>
          </>
        )}
      </div>

      {isComparisonModalOpen && (
        <ConfigureComparisonModal
          title="Configure Comparison Suite Run"
          isComparisonModalOpen={isComparisonModalOpen}
          setIsComparisonModalOpen={setIsComparisonModalOpen}
          setSelectedEnvironment={setSelectedEnvironment}
          selectedEnvironment={selectedEnvironment}
          selectedSuite={selectedSuite}
          setSelectedSuite={setSelectedSuite}
        />
      )}
    </div>
  );
};

export default Reports;

const renderInitiationIcon = (initiationType: string) => {
  switch (initiationType) {
    case "Manual":
      return <NotebookText size={16} />;
    case "Automated":
      return <Cog size={16} />;
    case "Scheduled":
      return <CalendarCheck2 size={16} />;
    default:
      return null;
  }
};
