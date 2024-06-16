"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, Table } from "@radix-ui/themes";
import { Trash } from "lucide-react";
import CustomInput from "../../../elements/input";
import CustomButton from "../../../elements/button";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Progress from "@radix-ui/react-progress";
import Link from "next/link";
import CustomSelect from "../../../elements/select";
import { Option } from "../../../utils/typesInterface";

const Organization = () => {
  // const [containerHeight, setContainerHeight] = useState(0);
  // useEffect(() => {
  //   const updateContainerHeight = () => {
  //     const container = document?.getElementById("flex-container");
  //     if (container) {
  //       const height = container?.offsetHeight;
  //       setContainerHeight(height);
  //     }
  //   };

  //   updateContainerHeight();
  //   window?.addEventListener("resize", updateContainerHeight);

  //   return () => {
  //     window?.removeEventListener("resize", updateContainerHeight);
  //   };
  // }, []);

  const data = [
    {
      name: "John Smith",
      email: "john.smith@org.com",
      access: "All (Owner)",
    },
    {
      name: "Adam Appleseed",
      email: "adam.appleseed@org.com",
      access: "All (Administrator)",
    },
    {
      name: "Pending",
      email: "carol.smith@gmail.com",
      access: "Edit access",
      isPending: true,
    },
  ];

  const accessOptions = [
    {
      id: "1",
      name: "All (Administrator)",
    },
    {
      id: "2",
      name: "All (Owner)",
    },
  ];

  const [selectedAcccessOption, setSelectedAccessOption] =
    useState<Option | null>(null);

  return (
    <>
      <div className=" mainContainer gap-5 flex flex-col ">
        <div className=" border-2 rounded-lg border-[#f0f0f0] dark:bg-[#212427] dark:border-none  bg-white mt-12 h-[388px] ">
          {" "}
          <div className="px-4 border-b-2 border-[#f0f0f0] dark:border-b  dark:border-[#434447] h-[78px] flex items-center">
            <h1 className="font-semibold font-poppin text-3xl dark:text-white text-dark">
              Organization
            </h1>
          </div>
          <div className="px-4 h-[220px]  flex items-center ">
            <Table.Root variant="surface" size={"2"} className="w-full">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell
                    style={{ width: "320px" }}
                    className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30] text-sm font-semibold"
                  >
                    <div className="">Name</div>{" "}
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell
                    style={{ width: "320px" }}
                    className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30] text-sm font-semibold"
                  >
                    <div className="">Email</div>{" "}
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell
                    style={{ width: "320px" }}
                    className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30] text-sm font-semibold"
                  >
                    <div className="">Access</div>{" "}
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell
                    style={{ width: "48px" }}
                    className="border-[#d2cdcd] dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30] text-sm font-semibold "
                  ></Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data?.map((item, index) => (
                  <Table.Row className="h-[47px] align-middle">
                    <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                      <div className="w-[320px] ">
                        <div className="w-full">
                          {item?.isPending ? (
                            <p>
                              {item.name},{" "}
                              <a
                                href="#"
                                className="text-intermediate underline"
                              >
                                Resend invitation
                              </a>
                            </p>
                          ) : (
                            <p>{item?.name}</p>
                          )}
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                      <div className="flex items-center w-[320px]">
                        <p className=" overflow-hidden text-ellipsis whitespace-nowrap ">
                          {item?.email}
                        </p>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                      <div className="w-[320px]">
                        <div className=" w-[120px]">
                          {item?.access === "All (Owner)" ? (
                            <p>{item?.access}</p>
                          ) : (
                            <CustomSelect
                              isBorderless={true}
                              placeholder="Select Options"
                              isAddedBtn={false}
                              selectedValue={accessOptions?.find(
                                (item) => item?.id === selectedAcccessOption?.id
                              )}
                              options={accessOptions || []}
                              onSelectChange={(selectedOption) => {
                                setSelectedAccessOption(selectedOption);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center justify-center gap-1.2 h-full">
                        <button
                          className="outline-none border-none bg-transparent  disabled:cursor-not-allowed"
                          onClick={() => {}}
                        >
                          <Trash color="#E1654A" size={18} />
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </div>
          <div className="h-[88px]  w-full flex items-center px-4 ">
            <Grid
              columns={{ lg: "1fr 4fr 4fr 1fr", md: "2fr 4fr 4fr 2fr" }}
              gap="3"
              width="auto"
            >
              <Box>
                <h1 className="font-poppin text-base font-semibold">
                  Invite a user
                </h1>
              </Box>

              <Box>
                <CustomInput
                  className={"dark:bg-transparent h-[32px] w-full  rounded-lg"}
                  onChange={(value) => {}}
                  type="email"
                  placeholder="Enter email address"
                />
              </Box>

              <Box>
                <div className="w-full ">
                  <CustomSelect
                    placeholder="Select Options"
                    isAddedBtn={false}
                    selectedValue={accessOptions?.find(
                      (item) => item?.id === selectedAcccessOption?.id
                    )}
                    options={accessOptions || []}
                    onSelectChange={(selectedOption) => {
                      setSelectedAccessOption(selectedOption);
                    }}
                  />
                </div>
              </Box>
              <Box>
                <CustomButton
                  color="blue"
                  variant="solid"
                  isPrimary

                  // onClick={() => setIsDeleteModal(true)}
                >
                  Send invite
                </CustomButton>
              </Box>
            </Grid>
          </div>
        </div>

        <div
          className={`
       max-h-[376px]  
        bg-white dark:bg-[#212427]
        border-2 rounded-lg border-[#f0f0f0] dark:border-none dark:border dark:border-[#434447] mb-4
           `}
          // id="flex-container"
        >
          <div
          // className="px-5 py-6  "
          // style={{
          //   maxHeight: `${containerHeight - 200}px`,
          //   overflowY: "auto",
          // }}
          >
            <div className="px-4 border-b-2 border-[#f0f0f0] dark:border-b  dark:border-[#434447] h-[96px] flex flex-col justify-center">
              <h1 className="font-semibold font-poppin text-xl dark:text-white text-black">
                Billing
              </h1>
              <p className="text-base font-poppin text-black font-normal">
                You’ll be billed at the end of each calendar month for the plan
                you have selected.
              </p>
            </div>

            <div className=" flex items-center h-[280px] px-2">
              <div className="flex w-full gap-3 items-start justify-center ">
                <div className="border-2 rounded-lg border-[#f0f0f0] min-h-[245px] max-h-full max-w-[524px] ">
                  <div className="p-4 ">
                    <div className="flex justify-between">
                      <h3 className="font-poppin font-semibold text-base">
                        {/* {` Plan: ${usageChartData?.billing_tier?.name || ""} `} */}
                        Plan: Tier 1
                      </h3>
                      <div className="border border-[#d5d5d5] dark:border dark:border-[#434447] dark:text-white dark:bg-transparent text-black text-sm font-normal font-poppin bg-[#fafafa] flex justify-center rounded-md max-w-[95px] w-full py-0.5">
                        {/* {`$${usageChartData?.billing_tier?.price || 0} Monthly`} */}
                        $20 Monthly
                      </div>
                    </div>
                    {/* )} */}

                    <div className="mt-3">
                      <ul className="list-disc pl-5 font-poppin text-md font-normal">
                        <li>
                          {/* {usageChartData?.total_available} Evaluations per
                          month */}
                          1,000 Evaluations per month
                        </li>
                        <li>4 additional team members</li>
                        <li>Unlimited Tests</li>
                      </ul>
                    </div>
                    <div className="flex  gap-1 items-center mt-3">
                      <Tooltip.Provider skipDelayDuration={100}>
                        <Tooltip.Root delayDuration={100}>
                          <Tooltip.Trigger asChild>
                            <Progress.Root
                              className="bg-[#f0f0f0] relative overflow-hidden  rounded-full w-[300px] h-[8px]"
                              style={{
                                // Fix overflow clipping in Safari
                                transform: "translateZ(0)",
                              }}
                              // value={progress}
                              value={100}
                            >
                              <Progress.Indicator
                                className="bg-[#388aeb] h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
                                style={{
                                  // transform: `translateX(-${100 - progress}%)`,
                                  transform: `translateX(-${100 - 100}%)`,
                                }}
                              />
                            </Progress.Root>
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content className="TooltipContent dark:bg-white dark:text-black">
                              {/* {`${progress}%`} */}
                              100
                              <Tooltip.Arrow className="TooltipArrow dark:fill-[#e4e5e5]" />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </Tooltip.Provider>

                      <div className="text-black font-poppin text-sm font-normal">
                        <div>
                          {/* {usageChartData?.total_used} of{" "}
                          {usageChartData?.total_available} */}
                          100 of 1,000 Evaluations
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t-2 border-[#f0f0f0] h-[59px] flex items-center">
                    <div className="flex gap-2  w-full justify-end px-2 ">
                      <CustomButton
                        variant="outline"
                        color="red"
                        isDanger
                        // disabled={
                        //   organization !== null && orgRole === "org:viewer"
                        // }
                      >
                        Cancel subscription
                      </CustomButton>
                      <CustomButton
                        color="blue"
                        variant="solid"
                        isPrimary
                        // disabled={
                        //   organization !== null && orgRole === "org:viewer"
                        // }
                      >
                        Upgrade plan
                      </CustomButton>
                    </div>
                  </div>
                </div>
                <div className=" border-2 rounded-lg border-[#f0f0f0] min-h-[216px] max-h-full w-[524px] ">
                  <div className="p-4 ">
                    <div className="flex justify-between">
                      <h3 className="font-poppin font-semibold text-base">
                        Payment method
                      </h3>
                    </div>

                    <div className="mt-3">
                      <div className="border-2 rounded-lg border-[#f0f0f0] h-[80px] flex items-center px-4 gap-4">
                        <div className="border-2 rounded-lg border-[#f0f0f0] flex items-center justify-center w-[70px] h-[48px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="49"
                            height="16"
                            viewBox="0 0 49 16"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M12.6232 15.7165H8.48003L5.37317 3.58476C5.22571 3.0267 4.9126 2.53335 4.45202 2.30082C3.3026 1.71648 2.03602 1.25142 0.654297 1.01688V0.549805H7.3286C8.24975 0.549805 8.94061 1.25142 9.05575 2.06627L10.6678 10.8173L14.8089 0.549805H18.8369L12.6232 15.7165ZM21.1398 15.7165H17.2269L20.4489 0.549805H24.3618L21.1398 15.7165ZM29.4241 4.75144C29.5392 3.93457 30.2301 3.4675 31.0361 3.4675C32.3027 3.35022 33.6824 3.58477 34.8338 4.16709L35.5247 0.901632C34.3733 0.434559 33.1067 0.200012 31.9573 0.200012C28.1595 0.200012 25.3961 2.30083 25.3961 5.21649C25.3961 7.43458 27.3535 8.59923 28.7353 9.30085C30.2301 10.0004 30.8058 10.4675 30.6907 11.1671C30.6907 12.2165 29.5392 12.6836 28.3898 12.6836C27.0081 12.6836 25.6264 12.3338 24.3618 11.7494L23.6709 15.0169C25.0527 15.5992 26.5475 15.8338 27.9292 15.8338C32.1875 15.949 34.8338 13.8503 34.8338 10.7C34.8338 6.73296 29.4241 6.50043 29.4241 4.75144ZM48.5279 15.7165L45.421 0.549805H42.0838C41.393 0.549805 40.7021 1.01688 40.4718 1.71648L34.7187 15.7165H38.7467L39.5507 13.5004H44.4998L44.9604 15.7165H48.5279ZM42.6596 4.63418L43.809 10.3503H40.587L42.6596 4.63418Z"
                              fill="#172B85"
                            />
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <h3 className="font-poppin text-base text-black font-normal">
                            Visa ending in 1234
                          </h3>
                          <p className="font-poppin text-sm text-[#909193] font-normal">
                            Expiry 06/2024
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t-2 border-[#f0f0f0] h-[59px] flex items-center">
                    <div className="flex gap-2  w-full justify-end px-2 ">
                      <CustomButton variant="outline" color="gray">
                        Edit payment method
                      </CustomButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Organization;
