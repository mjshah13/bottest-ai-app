import { Box, Dialog, Flex, Grid } from "@radix-ui/themes";
import { Ban, ChevronsRight, X } from "lucide-react";
import CustomButton from "../../../elements/button";
import {
  ChevronUp,
  CircleAlert,
  Download,
  User,
  Bot,
  Shuffle,
  Check,
  UserCog,
  ChevronDown,
} from "lucide-react";
import { Disclosure } from "@headlessui/react";
import SaveBaselineModal from "../saveBaselineModal";
import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useApi } from "../../../hooks/useApi";

interface ModalProps {
  title?: string;
  isTestResultModal?: boolean;
  setIsTestResultModal: (isTestResultModal: boolean) => void;
  specificTestId?: string;
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className={classNames(
        " group flex h-[45px] flex-1 cursor-default items-center justify-between  px-5 text-[15px] leading-none  outline-none",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDown
        size={17}
        className="text-black  ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </Accordion.Trigger>
  </Accordion.Header>
));

const TestResult: React.FC<ModalProps> = ({
  title,
  isTestResultModal,
  setIsTestResultModal,
  specificTestId,
}: ModalProps) => {
  // console.log(specificTestId, "hhh");

  const { request } = useApi();

  const fetchTestRuns = async (test_Id: string) => {
    try {
      const data = await request({
        url: `/v1/test_runs/${test_Id}`,
        method: "GET",
      });

      console.log(data?.data);
    } catch (error: any) {
      console.error({ error });
    }
  };

  useEffect(() => {
    if (!specificTestId) return;
    fetchTestRuns("trn_zbqJjMfE7sBIxBOKvuydKeY9L32rU" as string);
  }, [specificTestId]);

  const data = [
    { id: 1, title: " Variant A", name: "Iteration 1", status: "Running" },
    { id: 2, title: " Variant B", name: "Iteration 2", status: "Pass" },
    { id: 3, title: " Variant C", name: "Iteration 3", status: "Fail" },
    { id: 4, title: " Variant D", name: "Iteration 4", status: "Mixed" },
    { id: 5, title: " Variant E", name: "Iteration 5", status: "Stopped" },
  ];

  const [isOpenSaveBaselineModal, setisOpenSaveBaselineModal] = useState(false);

  return (
    <Dialog.Root open={isTestResultModal} onOpenChange={setIsTestResultModal}>
      <Dialog.Content minWidth={"1088px"} style={{ minHeight: "738px" }}>
        <Grid columns="260px 1fr" className="min-h-[738px] h-full">
          <Box>
            <div
              className="bg-[#fdfcfa] h-full "
              style={{
                boxShadow:
                  "rgba(17, 17, 26, 0.1) 0px 4px 16px 0px inset, rgba(17, 17, 26, 0.05) 0px 8px 32px 0px ",
              }}
            >
              <div className=" py-3 px-4 ">
                <p className=" font-semibold text-xl text-black ">
                  Currently viewing
                </p>
              </div>

              <div className="mt-2">
                <Accordion.Root
                  className="w-full rounded-md "
                  type="single"
                  collapsible
                >
                  {data?.map((item, index) => {
                    const { icon } = statusHandleClass(item.status);

                    return (
                      <Accordion.AccordionItem value={`${item.id}`}>
                        <AccordionTrigger className="w-full px-4">
                          <div className="flex justify-between">
                            <div className="gap-3 flex items-center">
                              {icon}
                              <p className={`text-md font-normal`}>
                                {item.title}
                              </p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <Accordion.AccordionContent className="px-4 bg-[#f4f4f2] py-[0.2px]">
                          <div className="px-2 py-2.5 flex items-center gap-3 rounded-lg  my-2 hover:bg-primary">
                            <Check color="#54CA6E" size={19} />
                            <h3>{item.name}</h3>
                          </div>
                        </Accordion.AccordionContent>
                      </Accordion.AccordionItem>
                    );
                  })}
                </Accordion.Root>
              </div>
            </div>
          </Box>
          <Box className="relative h-full ">
            <Dialog.Title className="h-[6%]">
              <div className="border-b border-[#e9e5e5] py-4 px-4 ">
                <p className=" text-black m-0">{title}</p>
              </div>
            </Dialog.Title>
            <div className="px-5 py-3 h-[85%]   flex flex-col">
              <div className=" bg-successLight px-6  rounded-lg mb-5 flex items-center h-[14%] gap-3">
                <div className="mb-4">
                  <CircleAlert fill="#54CA6E" color="white" />
                </div>
                <div className="flex flex-col ">
                  <h1 className="text-black text-normal">Test Passed</h1>
                  <p className="text-black text-sm ">
                    The replayed conversation matches the content of “First
                  </p>
                </div>
              </div>
              <div className="w-full h-[7%]">
                <CustomButton
                  color="red"
                  variant="outline"
                  isWidth={true}
                  svgIcon={<UserCog size={19} />}
                  onClick={() => setisOpenSaveBaselineModal(true)}
                  isDanger
                >
                  Override fail and set replayed conversation as an additional
                  baseline.
                </CustomButton>
              </div>
              <div className="flex justify-between items-center w-full h-[6%] ">
                <div className="w-[45%]">
                  <CustomButton
                    color="gray"
                    variant="surface"
                    isWidth={true}
                    svgIcon={<Download size={19} />}
                  >
                    Variant A - Iteration 1
                  </CustomButton>
                </div>
                <hr className="h-[32px] w-[2px] border-none outline-none bg-[#d9d9d9] text-[#d9d9d9" />

                <div className="w-[45%]">
                  <CustomButton color="gray" variant="surface" isWidth={true}>
                    First Baseline
                  </CustomButton>
                </div>

                <button
                  className="border border-[#d8d8d8] px-2 py-1.5
                  rounded-lg"
                >
                  <Download size={19} />
                </button>
              </div>{" "}
              <div className="flex-1 px-4 py-2 bg-[#fdfcfa] border-2 border-[#f0eeef] rounded mt-5 overflow-auto">
                <div className="flex flex-col">
                  <div className="flex gap-4 items-end  ">
                    <div className=" p-2 mb-2 bg-[#f6f5f3] rounded-full ">
                      <User size={19} color="gray" />
                    </div>
                    <div className="w-full">
                      <textarea
                        value={
                          "Determine if each response to the user is similar to the baseline in intent, tone, length, and the factual information each response contains. If any response is different from its baseline in the above criteria, fail the test."
                        }
                        disabled={true}
                        className={`${
                          "" && "text-[#909193]"
                        } mt-2.5 w-full px-2 py-2 border border-[#d0d0d0] rounded resize-none h-[90px]`}
                        placeholder="Enter your custom success criteria here..."
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 items-end  ">
                    <div className=" p-2 mb-2 bg-[#388aeb] rounded-full ">
                      <Bot size={19} color="#ffff" />
                    </div>
                    <div className="w-full flex items-center gap-3">
                      <textarea
                        style={{ height: "180px", resize: "none" }}
                        value={
                          "Examining your schedule for next week, the optimal time to slot in your doctor's appointment would be at 10 AM on Monday. Given the traffic conditions from your office to the doctor's office, I'd recommend departing between 9:30 AM and 9:45 AM."
                        }
                        className={`${
                          "" && "text-[#909193]"
                        } mt-2.5 w-full px-2 py-2 border border-[#d0d0d0] rounded`} // Add margin for better spacing
                        placeholder="Enter your custom success criteria here..."
                      />
                      <hr className="h-[180px] mt-2.5 w-[3px] border-none outline-none bg-[#d9d9d9] text-[#d9d9d9" />
                      <textarea
                        style={{ height: "180px", resize: "none" }}
                        value={
                          "Looking at your schedule, it seems that it would be best to schedule your appointment at 10 AM on Monday. Estimating traffic from the office to the location of your doctor you will need to leave work at around 9:30-9:45 on that day. "
                        }
                        className={`${
                          "" && "text-[#909193]"
                        } mt-2.5 w-full px-2 py-2 border border-[#d0d0d0] rounded`} // Add margin for better spacing
                        placeholder="Enter your custom success criteria here..."
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 items-end  ">
                    <div className=" p-2 mb-2 bg-[#f6f5f3] rounded-full ">
                      <User size={19} color="gray" />
                    </div>
                    <div className="w-full">
                      <textarea
                        value={
                          "Okay, then please book a doctor's appointment for me at 10 AM on Monday."
                        }
                        disabled={true}
                        className={`${
                          "" && "text-[#909193]"
                        } mt-2.5 w-full px-2 py-2 border border-[#d0d0d0] rounded  resize-none max-h-[55px] h-full`} // Add margin for better spacing
                        placeholder="Enter your custom success criteria here..."
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 items-end  ">
                    <div className=" p-2 mb-2 bg-[#388aeb] rounded-full ">
                      <Bot size={19} color="#ffff" />
                    </div>
                    <div className="w-full flex items-center gap-3">
                      <textarea
                        style={{ height: "180px", resize: "none" }}
                        value={
                          "Examining your schedule for next week, the optimal time to slot in your doctor's appointment would be at 10 AM on Monday. Given the traffic conditions from your office to the doctor's office, I'd recommend departing between 9:30 AM and 9:45 AM."
                        }
                        className={`${
                          "" && "text-[#909193]"
                        } mt-2.5 w-full px-2 py-2 border border-[#d0d0d0] rounded`} // Add margin for better spacing
                        placeholder="Enter your custom success criteria here..."
                      />
                      <hr className="h-[180px] mt-2.5 w-[3px] border-none outline-none bg-[#d9d9d9] text-[#d9d9d9" />
                      <textarea
                        style={{ height: "180px", resize: "none" }}
                        value={
                          "Looking at your schedule, it seems that it would be best to schedule your appointment at 10 AM on Monday. Estimating traffic from the office to the location of your doctor you will need to leave work at around 9:30-9:45 on that day. "
                        }
                        className={`${
                          "" && "text-[#909193]"
                        } mt-2.5 w-full px-2 py-2 border border-[#d0d0d0] rounded`} // Add margin for better spacing
                        placeholder="Enter your custom success criteria here..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t px-3 py-0.5 border-[#e9e5e5] absolute bottom-0 right-0 w-full ">
              <Flex gap="3" justify="end">
                <div className="py-2">
                  <CustomButton variant="outline" color="gray">
                    Done
                  </CustomButton>
                </div>
              </Flex>
            </div>
          </Box>
        </Grid>
      </Dialog.Content>
      <SaveBaselineModal
        isOpenSaveBaselineModal={isOpenSaveBaselineModal}
        setisOpenSaveBaselineModal={setisOpenSaveBaselineModal}
        title="Test results: My third test"
      />
    </Dialog.Root>
  );
};

export default TestResult;

const statusHandleClass = (status: string) => {
  switch (status) {
    case "Running":
      return {
        backgroundColor: "bg-primary",
        text: "Test in progress",
        icon: <Shuffle color="#388aeb" size={15} />,
      };
    case "Pass":
      return {
        backgroundColor: "bg-successLight",
        text: "View full result",
        icon: <Check color="#54CA6E" size={15} />,
      };
    case "Fail":
      return {
        backgroundColor: "bg-dangerLight",
        text: "View full result",
        icon: <X color="#E1654A" size={15} />,
      };
    case "Error":
      return {
        backgroundColor: "bg-dangerLight",
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
        backgroundColor: "bg-warningLight",
        text: "View full result",
        icon: <Shuffle color="#E7C200" size={15} />,
      };
    case "Skipped":
      return {
        backgroundColor: "bg-[#f2f2f2]",
        text: "No result",
        icon: <Ban color="#212427" size={15} />,
      };
    case "Stopped":
      return {
        backgroundColor: "bg-[#f2f2f2]",
        text: "No result",
        icon: <ChevronsRight color="#212427" size={15} />,
      };
    default:
      return { backgroundColor: "", text: "" };
  }
};
