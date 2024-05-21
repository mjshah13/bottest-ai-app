"use client";
import React, { useContext, useEffect, useState } from "react";
import CustomSelect from "../../../elements/select";
import { GlobalStateType, Option } from "../../../utils/typesInterface";
import { GlobalStateContext } from "../../../globalState";
import { Grid, Table } from "@radix-ui/themes";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  ArrowBigRight,
  ArrowBigRightIcon,
  ChevronLeft,
  ChevronRight,
  Copy,
  CopyPlus,
  Download,
  FileBarChart2,
  RefreshCw,
  Trash,
} from "lucide-react";
import CustomButton from "../../../Elements/button";

const Reports = () => {
  const [selectedSuite, setSelectedSuite] = useState<Option | null>(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState<Option | null>(
    null
  );
  const [containerHeight, setContainerHeight] = useState(0);
  const [selectedBot, setSelectedBot] = useState<Option | null>(null);
  const { botLists, suiteLists, environmentLists } = useContext(
    GlobalStateContext
  ) as GlobalStateType;
  const botData = [
    {
      Timestamp: "2/25/24 10:23:04 AM",
      suiteRunId: "srn_23492347923",
      environment: "Production",
      initiatedBy: "John Smith",
      link: "Interactive Report",
    },
    {
      Timestamp: "2/25/24 10:23:04 AM",
      suiteRunId: "srn_23492347923",
      environment: "Production",
      initiatedBy: "John Smith",
      link: "Interactive Report",
    },
    {
      Timestamp: "2/25/24 10:23:04 AM",
      suiteRunId: "srn_23492347923",
      environment: "Production",
      initiatedBy: "John Smith",
      link: "Interactive Report",
    },
    {
      Timestamp: "2/25/24 10:23:04 AM",
      suiteRunId: "srn_23492347923",
      environment: "Production",
      initiatedBy: "John Smith",
      link: "Interactive Report",
    },
    {
      Timestamp: "2/25/24 10:23:04 AM",
      suiteRunId: "srn_23492347923",
      environment: "Production",
      initiatedBy: "John Smith",
      link: "Interactive Report",
    },
    {
      Timestamp: "2/25/24 10:23:04 AM",
      suiteRunId: "srn_23492347923",
      environment: "Production",
      initiatedBy: "John Smith",
      link: "Interactive Report",
    },
    {
      Timestamp: "2/25/24 10:23:04 AM",
      suiteRunId: "srn_23492347923",
      environment: "Production",
      initiatedBy: "John Smith",
      link: "Interactive Report",
    },
    {
      Timestamp: "2/25/24 10:23:04 AM",
      suiteRunId: "srn_23492347923",
      environment: "Production",
      initiatedBy: "John Smith",
      link: "Interactive Report",
    },
    {
      Timestamp: "2/25/24 10:23:04 AM",
      suiteRunId: "srn_23492347923",
      environment: "Production",
      initiatedBy: "John Smith",
      link: "Interactive Report",
    },
    {
      Timestamp: "2/25/24 10:23:04 AM",
      suiteRunId: "srn_23492347923",
      environment: "Production",
      initiatedBy: "John Smith",
      link: "Interactive Report",
    },
    {
      Timestamp: "2/25/24 10:23:04 AM",
      suiteRunId: "srn_23492347923",
      environment: "Production",
      initiatedBy: "John Smith",
      link: "Interactive Report",
    },
    {
      Timestamp: "2/25/24 10:23:04 AM",
      suiteRunId: "srn_23492347923",
      environment: "Production",
      initiatedBy: "John Smith",
      link: "Interactive Report",
    },
    {
      Timestamp: "2/25/24 10:23:04 AM",
      suiteRunId: "srn_23492347923",
      environment: "Production",
      initiatedBy: "John Smith",
      link: "Interactive Report",
    },
    ,
    {
      Timestamp: "2/25/24 10:23:04 AM",
      suiteRunId: "srn_23492347923",
      environment: "Production",
      initiatedBy: "John Smith",
      link: "Interactive Report",
    },
    {
      Timestamp: "2/25/24 10:23:04 AM",
      suiteRunId: "srn_23492347923",
      environment: "Production",
      initiatedBy: "John Smith",
      link: "Interactive Report",
    },
    {
      Timestamp: "2/25/24 10:23:04 AM",
      suiteRunId: "srn_23492347923",
      environment: "Production",
      initiatedBy: "John Smith",
      link: "Interactive Report",
    },
    {
      Timestamp: "2/25/24 10:23:04 AM",
      suiteRunId: "srn_23492347923",
      environment: "Production",
      initiatedBy: "John Smith",
      link: "Interactive Report",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  // Ensure that botData is an array
  const data = Array.isArray(botData) ? botData : [];

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);

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
  console.log(currentRows);
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
    <>
      <div className="h-[92vh]  gap-5 flex flex-col   overflow-hidden relative">
        <div className="flex-1 bg-white mt-12 border-2 rounded-lg border-[#f0f0f0] h-[92vh] overflow-hidden ">
          <div className="rounded-t-lg  dark:bg-[#212427] dark:border-none   bg-white h-[92vh] ">
            <div className="py-5 px-4 border-b-2 border-[#f0f0f0] dark:border-b  dark:border-[#434447] ">
              <h1 className="font-semibold font-poppin text-3xl dark:text-white text-dark">
                Suite Run Reports
              </h1>
            </div>
            <div className="py-4 px-5  h-[100%] bg-[red] ">
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
                <div className="flex gap-2 items-center mt-1.5">
                  <p className="text-black font-poppin text-sm font-semibold">
                    Most Recent on Same Environment (default)
                  </p>
                  <button className="outline-none text-sm border-none text-[#388AEB] font-semibold cursor-pointer">
                    Configure
                  </button>
                </div>
                <p className="text-[#909193] text-sm font-poppin font-normal mt-1.5 w-[704px] leading-[22px] ">
                  Configure the Comparison Suite Run for all “Test suite 3”
                  reports. Note that updating this configuration will update
                  each interactive report for this Suite.
                </p>
              </div>
              <div className="bg-[green] min-h-[350px] overflow-auto flex-1">
                <div className="px-0 pt-4    min-h-[57%] h-[57%]  "  style={{
                            maxHeight: `${containerHeight - 200}px`,
                            overflowY: "auto",
                          }}>
                  <Table.Root variant="surface" size={"2"}>
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeaderCell
                          style={{ width: "207px" }}
                          className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30] text-sm font-semibold"
                        >
                          Timestamp
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell
                          style={{ width: "207px" }}
                          className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30] text-sm font-semibold"
                        >
                          Suite Run ID
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell
                          style={{ width: "207px" }}
                          className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30] text-sm font-semibold"
                        >
                          Environment
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell
                          style={{ width: "207px" }}
                          className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30] text-sm font-semibold"
                        >
                          Initiated By
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell
                          style={{ width: "207px" }}
                          className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30] text-sm font-semibold"
                        >
                          Link
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell
                          style={{ width: "2%" }}
                          className="border-[#d2cdcd] dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30] text-sm font-semibold"
                        >
                          PDF
                        </Table.ColumnHeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {currentRows.map((bot, i) => (
                        <Table.Row key={i} className="h-[47px] align-middle">
                          <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                            {bot?.Timestamp}
                          </Table.Cell>
                          <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                            {bot?.suiteRunId}
                            <Copy
                              stroke="#222437"
                              size={16}
                              className="inline-block ms-2"
                            />
                          </Table.Cell>
                          <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                            <img
                              className="inline-block h-5 w-5 rounded-full me-3"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                            {bot?.environment}
                          </Table.Cell>
                          <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                            {bot?.initiatedBy}
                          </Table.Cell>
                          <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                            <button className="text-[#388AEB] flex items-center gap-3">
                              <FileBarChart2 size={16} />
                              {bot?.link}
                            </button>
                          </Table.Cell>
                          <Table.Cell className="border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                            <Download size={16} className="ms-1" />
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                </div>
              </div>
             
            </div>
            <nav className="flex items-center h-[64px]  w-[300px] float-right  sm:px-0 absolute bottom-0 right-[20px]">
                <div className="-mt-px flex w-0 flex-1">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="inline-flex items-center border-t-2 border-transparent pr-1  text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    <ChevronLeft
                      className="mr-3 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <div className="hidden md:-mt-px md:flex">
                  {/* Render page numbers */}
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`inline-flex items-center border-2 px-4 h-[38px] rounded  text-sm font-medium ${
                        currentPage === index + 1
                          ? "border-indigo-500 text-indigo-600 text-[#388AEB]"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <div className="-mt-px flex w-0 flex-1 justify-end">
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center border-t-2 border-transparent pl-1  text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    <ChevronRight
                      className="ml-3 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
