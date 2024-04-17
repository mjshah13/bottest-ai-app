import { Box, Dialog, Flex, Grid } from "@radix-ui/themes";
import React, { useState } from "react";
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
} from "lucide-react";
import { Disclosure } from "@headlessui/react";
import SaveBaselineModal from "../saveBaselineModal";

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
  const data = [
    { id: 1, title: "ha", name: "harim" },
    { id: 2, title: "ma", name: "maaz" },
    { id: 3, title: "az", name: "azeem" },
  ];

  const [isOpenSaveBaselineModal, setisOpenSaveBaselineModal] = useState(false);

  // const [activeDisclosurePanelIndex, setActiveDisclosurePanelIndex] =
  //   useState(null);

  // const togglePanels = (index: any) => {
  //   console.log(index);
  //   const disclosureButtons =
  //     document.getElementsByClassName("disclosure-button");

  //   for (let i = 0; i < disclosureButtons.length; i++) {
  //     const disclosureButton: any = disclosureButtons.item(i);

  //     disclosureButton.setAttribute("aria-expanded", "false"); // Assuming ARIA attribute is used
  //     // Alternatively, modify CSS classes as needed for visual representation

  //     // Set expanded state to true only for the clicked button
  //     if (i === index) {
  //       disclosureButton.setAttribute("aria-expanded", "true");
  //       // Alternatively, modify CSS classes as needed
  //     }
  //   }

  // };

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

              <div>
                {/* {data.map((item, index) => ( */}
                <Disclosure key={title}>
                  {({ open, close }) => (
                    <>
                      <Disclosure.Button
                        // onClick={() => togglePanels(index)}
                        className={`disclosure-button flex items-center justify-between w-full  px-6 py-2  text-sm `}
                      >
                        <div className="gap-3 flex items-center">
                          <Shuffle color="#E7C200" size={15} />
                          <p
                            className={`text-lg font-normal
                             
                             `}
                          >
                            Variant A
                          </p>
                        </div>

                        <ChevronUp
                          className={`${open ? "rotate-180 transform" : ""} 
                            
                              h-6 w-6 text-neutral`}
                        />
                      </Disclosure.Button>

                      <Disclosure.Panel className="mt-0  text-sm">
                        <div className="bg-[#F1f0ef] py-[1px]">
                          {Array(4)
                            ?.fill(4)
                            ?.map((item) => (
                              <div className="px-6 py-2.5 flex gap-3 mx-3 my-2   hover:bg-primary">
                                <Check color="#54CA6E" size={19} />
                                <h3>Iteration 1</h3>
                              </div>
                            ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                {/* ))} */}
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
