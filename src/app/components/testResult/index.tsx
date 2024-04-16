import { Box, Dialog, Flex, Grid } from "@radix-ui/themes";
import React, { useState } from "react";
import CustomButton from "../../../elements/button";
import {
  ChevronUp,
  ChevronDown,
  CircleAlert,
  Download,
  User,
  Bot,
} from "lucide-react";

interface ModalProps {
  title?: string;
  isTestResultModal?: boolean;
  setIsTestResultModal: (isTestResultModal: boolean) => void;
}

const TestResult: React.FC<ModalProps> = ({
  title,
  isTestResultModal,
  setIsTestResultModal,
}: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

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
              <div className="">
                <div className="flex justify-between px-4">
                  <h1 className="px-4  w-full bg-blue-500 text-black">
                    Details
                  </h1>
                  <button onClick={toggleCollapse}>
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                  </button>
                </div>

                <div
                  className={`mt-2 p-4 border rounded ${
                    isOpen ? "" : "hidden"
                  }`}
                >
                  <div>
                    <p>Here is some collapsible content!</p>
                    <p>Here is some collapsible content!</p>
                    <p>Here is some collapsible content!</p>
                    <p>Here is some collapsible content!</p>
                  </div>
                </div>
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
    </Dialog.Root>
  );
};

export default TestResult;
