import { Checkbox, Dialog, Flex } from "@radix-ui/themes";
import React, { useContext, useState } from "react";
import CustomButton from "../../../elements/button";

import Chip from "../../../elements/chip";
import { Trash } from "lucide-react";

interface ModalProps {
  title?: string;
  isCustomizeTestModal?: boolean;
  setIsCustomizeTestModal: (isCustomizeTestModa: boolean) => void;
}

const CustomizeTest: React.FC<ModalProps> = ({
  title,
  isCustomizeTestModal,
  setIsCustomizeTestModal,
}: ModalProps) => {
  const [successCriteriaTab, setSuccessCriteriaTab] = useState(0);
  const [numberOfVariantsTab, setNumberOfVariantsTab] = useState(0);
  const [numberOfIterationTab, setNumberOfIterationTab] = useState(0);

  const [isSuccessCriteriaTextDisabled, setIsSuccessCriteriaTextDisabled] =
    useState(true);
  const [isNumberOfVariantsInputDisabled, setIsNumberOfVariantsInputDisabled] =
    useState(true);
  const [
    isNumberOfIterationInputDisabled,
    setIsNumberOfIterationInputDisabled,
  ] = useState(true);

  const TabBtn = ["Suite’s default", "Custom"]; // Array for button labels

  const handleSuccessCriteriaClick = (index: number) => {
    setSuccessCriteriaTab(index);
    setIsSuccessCriteriaTextDisabled(index === 0);
  };

  const handleNumberOfVariantsClick = (index: number) => {
    setNumberOfVariantsTab(index);
    setIsNumberOfVariantsInputDisabled(index === 0);
  };

  const handleNumberOfIterationClick = (index: number) => {
    setNumberOfIterationTab(index);
    setIsNumberOfIterationInputDisabled(index === 0);
  };

  return (
    <Dialog.Root
      open={isCustomizeTestModal}
      onOpenChange={setIsCustomizeTestModal}
    >
      <Dialog.Content maxWidth={"860px"}>
        <Dialog.Title>
          <div className="border-b border-[#f5f5f5] py-5 px-6 ">
            <p className=" text-black ">{title}</p>
          </div>
        </Dialog.Title>
        <div>
          <div className="px-5 pt-2 pb-7">
            <h1 className="mb-2">Success criteria:</h1>
            <div className="flex border border-[#d9d9d9] rounded w-full h-[34px]  ">
              {TabBtn.map((title, index) => (
                <button
                  key={index}
                  className={`
            ${
              successCriteriaTab === index
                ? "bg-[#388aeb] text-white"
                : "bg-gray-300 text-gray-800"
            }
            w-full flex items-center justify-center rounded ${
              index === 0 ? "rounded-l" : ""
            } ${index === title.length - 1 ? "rounded-r" : ""}
          `}
                  onClick={() => handleSuccessCriteriaClick(index)}
                >
                  {title}
                </button>
              ))}
            </div>
            <div>
              <textarea
                value={
                  "Determine if each response to the user is similar to the baseline in intent, tone, length, and the factual information each response contains. If any response is different from its baseline in the above criteria, fail the test."
                }
                disabled={isSuccessCriteriaTextDisabled} // Directly control textarea disability with state
                className={`${
                  isSuccessCriteriaTextDisabled && "text-[#909193]"
                } mt-2.5 w-full px-2 py-1.5 border border-[#d0d0d0] rounded`} // Add margin for better spacing
                placeholder="Enter your custom success criteria here..."
              />
              <p className="text-[#909193] font-medium ">
                The default success criteria can be changed on a test suite
                level in the test suite settings.
              </p>
            </div>

            {/*  */}
            <div className="flex mt-6 gap-7 ">
              <div className=" w-full ">
                <h1 className="mb-2">Number of variants</h1>
                <div className="flex border border-[#d9d9d9] rounded w-full h-[34px]  ">
                  {TabBtn.map((title, index) => (
                    <button
                      key={index}
                      className={`
            ${
              numberOfVariantsTab === index
                ? "bg-[#388aeb] text-white"
                : "bg-gray-300 text-gray-800"
            }
            w-full flex items-center justify-center rounded ${
              index === 0 ? "rounded-l" : ""
            } ${index === title.length - 1 ? "rounded-r" : ""}
          `}
                      onClick={() => handleNumberOfVariantsClick(index)}
                    >
                      {title}
                    </button>
                  ))}
                </div>
                <div>
                  <input
                    value={"3"}
                    disabled={isNumberOfVariantsInputDisabled} // Directly control textarea disability with state
                    className={`${
                      isNumberOfVariantsInputDisabled && "text-[#909193]"
                    } mt-2.5 w-full px-2 py-1.5 border border-[#d0d0d0] rounded`} // Add margin for better spacing
                    placeholder="Enter your custom success criteria here..."
                  />
                </div>
              </div>
              <div className="w-full ">
                <h1 className="mb-2">Number of iterations</h1>
                <div className="flex border border-[#d9d9d9] rounded w-full h-[34px]  ">
                  {TabBtn.map((title, index) => (
                    <button
                      key={index}
                      className={`
            ${
              numberOfIterationTab === index
                ? "bg-[#388aeb] text-white"
                : "bg-gray-300 text-gray-800"
            }
            w-full flex items-center justify-center rounded ${
              index === 0 ? "rounded-l" : ""
            } ${index === title.length - 1 ? "rounded-r" : ""}
          `}
                      onClick={() => handleNumberOfIterationClick(index)}
                    >
                      {title}
                    </button>
                  ))}
                </div>
                <div>
                  <input
                    value={"10"}
                    disabled={isNumberOfIterationInputDisabled} // Directly control textarea disability with state
                    className={`${
                      isNumberOfIterationInputDisabled && "text-[#909193]"
                    } mt-2.5 w-full px-2 py-1.5 border border-[#d0d0d0] rounded`} // Add margin for better spacing
                    placeholder="Enter your custom success criteria here..."
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h1>Baseline conversations:</h1>
              <div className="mt-2">
                <Chip isCancel={true}>Original Baseline</Chip>
              </div>
            </div>
            <div className="mt-6">
              <h1>Full test runs:</h1>
              <div className="flex items-center gap-2">
                <Checkbox variant="classic" color="blue" />
                Disable “My second test” from running in full test runs
              </div>
            </div>
            <div className="mt-6">
              <CustomButton
                variant="outline"
                color="red"
                svgIcon={<Trash size={17} />}
              >
                Delete “My second test”
              </CustomButton>
            </div>
          </div>
        </div>

        <div className="border-t border-[#f5f5f5]">
          <Flex gap="3" py={"3"} px={"3"} justify="end">
            <Dialog.Close>
              <CustomButton onClick={() => {}} variant="outline" color="gray">
                Discard
              </CustomButton>
            </Dialog.Close>
            <Dialog.Close>
              <CustomButton onClick={() => {}} color="blue" variant="solid">
                Save changes
              </CustomButton>
            </Dialog.Close>
          </Flex>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CustomizeTest;
