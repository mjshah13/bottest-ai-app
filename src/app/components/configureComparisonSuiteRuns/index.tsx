import { Dialog, Flex } from "@radix-ui/themes";
import React, { useContext, useEffect, useState } from "react";
import CustomButton from "../../../elements/button";
import * as RadioGroup from "@radix-ui/react-radio-group";
import CustomInput from "../../../elements/input";
import { CloudHail } from "lucide-react";
import CustomSelect from "../../../elements/select";
import { GlobalStateType, Option } from "../../../utils/typesInterface";
import { GlobalStateContext } from "../../../globalState";

interface ModalProps {
  title: string;
  isComparisonModalOpen?: boolean;
  setIsComparisonModalOpen: (isComparisonModalOpen: boolean) => void;
}

const ConfigureComparisonModal: React.FC<ModalProps> = ({
  title,
  isComparisonModalOpen,
  setIsComparisonModalOpen,
}: ModalProps) => {
  const [isDisabled, setIsDisabled] = useState({
    select: true,
    input: true,
  });

  const handleRadioButton = (value: string) => {
    setIsDisabled({
      select: value !== "radio2",
      input: value !== "radio3",
    });
  };

  return (
    <Dialog.Root
      open={isComparisonModalOpen}
      onOpenChange={setIsComparisonModalOpen}
    >
      <Dialog.Content maxWidth={"480px"}>
        <Dialog.Title>
          <div className="border-b border-[#f5f5f5] dark:border-b  dark:border-[#434447] py-5 px-6 ">
            <p className="font-poppin text-black text-base font-semibold dark:text-white ">
              {title}
            </p>
          </div>
        </Dialog.Title>
        <div>
          <div className="px-5 pt-3 pb-6">
            <RadioGroup.Root
              className="flex flex-col gap-5"
              onValueChange={(value) => handleRadioButton(value)}
            >
              <div className="flex gap-3">
                <div className="flex mt-0.5 items-start">
                  <RadioGroup.Item
                    className="bg-white w-[16px] h-[16px] border border-[#d9d9d9] rounded-full  hover:bg-[#f0f0f0]  focus:border-[#388aeb] outline-none cursor-default"
                    value="radio1"
                    id="r1"
                  >
                    <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-['']  after:w-[8px] after:h-[8px] after:rounded-full after:bg-[#388aeb]" />
                  </RadioGroup.Item>
                </div>
                <div className="flex flex-col">
                  <label
                    className="text-black font-poppin  text-sm font-normal"
                    // htmlFor="r1"
                  >
                    Most Recent on Same Environment
                  </label>
                  <p className="font-poppin mt-1.5 text-sm font-normal leading-[22px] text-[#909193]">
                    All Suite Runs for suite{" "}
                    <span className="font-semibold">My Suite</span> will be
                    compared to the most recent Suite Run with the same
                    Environment.
                  </p>
                </div>
              </div>

              <div className="flex  gap-3">
                <div className="flex items-start  mt-0.5">
                  <RadioGroup.Item
                    className="bg-white w-[16px] h-[16px] border border-[#d9d9d9] rounded-full  hover:bg-violet3  focus:border focus:border-[#388aeb] outline-none cursor-default"
                    value="radio2"
                    id="r2"
                  >
                    <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-['']  after:w-[8px] after:h-[8px] after:rounded-full after:bg-[#388aeb]" />
                  </RadioGroup.Item>
                </div>
                <div className="flex flex-col">
                  <label
                    className="text-black font-poppin  text-sm font-normal"
                    // htmlFor="r2"
                  >
                    Most Recent on Specific Environment
                  </label>
                  <p className="font-poppin my-2  text-sm font-normal leading-[22px] text-[#909193]">
                    All Suite Runs for suite{" "}
                    <span className="font-semibold">My Suite</span> will be
                    compared to the most recent Suite Run with the same
                    Environment.
                  </p>
                  <CustomSelect
                    isAddedBtn={false}
                    disabled={isDisabled?.select}
                    // disabled={environmentLists?.length === 1 || !environmentLists}
                    placeholder="Select Environment"
                    // selectedValue={environmentLists?.find(
                    //   (env) => env?.id === selectedEnvironment?.id
                    // )}
                    // options={environmentLists || []}
                    // onSelectChange={(selectedOption) => {
                    //   setSelectedEnvironment(selectedOption);
                    // }}
                  />
                </div>
              </div>

              <div className="flex  gap-3">
                <div className="flex items-start  mt-0.5">
                  <RadioGroup.Item
                    className="bg-white w-[16px] h-[16px] border border-[#d9d9d9] rounded-full  hover:bg-violet3  focus:border focus:border-[#388aeb] outline-none cursor-default"
                    value="radio3"
                    id="r3"
                  >
                    <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-['']  after:w-[8px] after:h-[8px] after:rounded-full after:bg-[#388aeb]" />
                  </RadioGroup.Item>
                </div>
                <div className="flex flex-col">
                  <label
                    className="text-black font-poppin  text-sm font-normal"
                    // htmlFor="r3"
                  >
                    Specific Suite Run
                  </label>
                  <p className="font-poppin my-2 text-sm font-normal leading-[22px] text-[#909193]">
                    All Suite Runs for suite{" "}
                    <span className="font-semibold">My Suite</span> will be
                    compared to a specific Suite Run.
                  </p>

                  <CustomInput
                    className={"dark:bg-transparent h-[32px] "}
                    // onChange={(value) => {
                    //   handleFilteredData(value);
                    // }}
                    type="text"
                    disabled={isDisabled?.input}
                    placeholder="Enter Suite Run ID"
                  />
                </div>
              </div>
            </RadioGroup.Root>
          </div>
        </div>

        <div className="border-t border-[#f5f5f5] dark:border-t  dark:border-[#434447]">
          <Flex gap="3" py={"3"} px={"3"} justify="end">
            <Dialog.Close>
              <CustomButton variant="outline" color="gray">
                Discard
              </CustomButton>
            </Dialog.Close>
            <Dialog.Close>
              <CustomButton
                color="blue"
                variant="solid"
                // disabled={organization !== null && orgRole === "org:viewer"}
                isPrimary
              >
                Save changes
              </CustomButton>
            </Dialog.Close>
          </Flex>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ConfigureComparisonModal;
