import { Dialog, Flex } from "@radix-ui/themes";
import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import CustomButton from "../../../elements/button";
import * as RadioGroup from "@radix-ui/react-radio-group";
import CustomInput from "../../../elements/input";
import CustomSelect from "../../../elements/select";
import { GlobalStateType, Option } from "../../../utils/typesInterface";
import { GlobalStateContext } from "../../../globalState";
import useUpdateSuite from "../../../hooks/useUpdateSuite";
import _ from "lodash";
import useSpecificSuiteRun from "../../../hooks/useSpecificSuiteRuns";

import useSpecificSuite from "../../../hooks/useSpecificSuite";
import { configOption } from "../../../utils/common";

interface ModalProps {
  title: string;
  isComparisonModalOpen?: boolean;
  setIsComparisonModalOpen: (isComparisonModalOpen: boolean) => void;
  setSelectedEnvironment: (environment: Option | null) => void;
  selectedEnvironment: Option | null;
  setSelectedSuite: (suite: Option | null) => void;
  selectedSuite: Option | null;
}

const ConfigureComparisonModal: React.FC<ModalProps> = ({
  title,
  isComparisonModalOpen,
  setIsComparisonModalOpen,
  selectedEnvironment,
  setSelectedEnvironment,
  selectedSuite,
  setSelectedSuite,
}: ModalProps) => {
  const { environmentLists, suiteLists } = useContext(
    GlobalStateContext
  ) as GlobalStateType;
  const { updateSuite } = useUpdateSuite();
  const { fetchSpecificSuiteRuns, error, setError, isLoading, success } =
    useSpecificSuiteRun();
  const { fetchSpecificSuite, setSpecificSuiteData, specificSuiteData } =
    useSpecificSuite();

  const handleRadioButton = (value: string) => {
    setSpecificSuiteData((prevState) => ({
      ...prevState,
      reporting_comparison_configuration: value,
    }));
  };

  const handleSave = () => {
    let updateData = {};
    switch (specificSuiteData?.reporting_comparison_configuration) {
      case "most_recent_same_environment":
        updateData = {
          reporting_comparison_configuration:
            specificSuiteData?.reporting_comparison_configuration,
        };
        break;
      case "most_recent_different_environment":
        updateData = {
          reporting_comparison_environment_id: selectedEnvironment?.id,
          reporting_comparison_configuration:
            "most_recent_different_environment",
        };
        break;
      case "specific_suite_run":
        updateData = {
          reporting_comparison_suite_run_id:
            specificSuiteData?.reporting_comparison_suite_run_id,
          reporting_comparison_configuration: "specific_suite_run",
        };
        break;
    }

    if (selectedSuite?.id) {
      updateSuite(selectedSuite.id, updateData, suiteLists);
    }
  };

  const handleChange = useCallback(
    _.debounce((val: string) => {
      if (val === "") {
        setError(false);
        return;
      }
      fetchSpecificSuiteRuns(val);
    }, 500),
    []
  );

  useEffect(() => {
    if (!selectedSuite?.id) return;
    fetchSpecificSuite(selectedSuite?.id);
  }, [selectedSuite]);

  const handleInputChange = (val: string) => {
    handleChange(val);
    setSpecificSuiteData((prevState) => ({
      ...prevState,
      reporting_comparison_suite_run_id: val,
    }));
  };

  useEffect(() => {
    setSelectedEnvironment(
      environmentLists.find(
        (env) =>
          env.id === specificSuiteData?.reporting_comparison_environment_id
      ) || null
    );
  }, [specificSuiteData]);

  return (
    <Dialog.Root
      open={isComparisonModalOpen}
      onOpenChange={setIsComparisonModalOpen}
    >
      <Dialog.Content maxWidth={"480px"} className="max-h-[525px]">
        <Dialog.Title>
          <div className="border-b border-[#f5f5f5] dark:border-b  dark:border-[#434447] py-5 px-6 ">
            <p className="font-poppin text-black text-base font-semibold dark:text-white ">
              {title}
            </p>
          </div>
        </Dialog.Title>
        <div>
          <div className="px-5 pt-2 pb-6">
            <RadioGroup.Root
              className="flex flex-col gap-5"
              onValueChange={(value) => handleRadioButton(value)}
              value={specificSuiteData?.reporting_comparison_configuration}
            >
              <div className="flex gap-3">
                <div className="flex mt-0.5 items-start">
                  <RadioGroup.Item
                    className="bg-white w-[16px] h-[16px] border border-[#d9d9d9] rounded-full  hover:bg-[#f0f0f0]  focus:border-[#388aeb] outline-none cursor-default"
                    value={configOption?.most_recent_same_environment}
                    id="r1"
                  >
                    <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative  after:w-[8px] after:h-[8px] after:rounded-full after:bg-[#388aeb]" />
                  </RadioGroup.Item>
                </div>
                <div className="flex flex-col">
                  <label
                    className="text-black font-poppin  text-sm font-normal"
                    htmlFor="r1"
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
                    value={configOption?.most_recent_different_environment}
                    id="r2"
                  >
                    <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-['']  after:w-[8px] after:h-[8px] after:rounded-full after:bg-[#388aeb]" />
                  </RadioGroup.Item>
                </div>
                <div className="flex flex-col">
                  <label
                    className="text-black font-poppin  text-sm font-normal"
                    htmlFor="r2"
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
                    disabled={
                      specificSuiteData?.reporting_comparison_configuration !==
                      "most_recent_different_environment"
                    }
                    placeholder="Select Environment"
                    selectedValue={environmentLists?.find(
                      (env) => env?.id === selectedEnvironment?.id
                    )}
                    options={environmentLists || []}
                    onSelectChange={(selectedOption) => {
                      setSelectedEnvironment(selectedOption);
                    }}
                  />
                </div>
              </div>

              <div className="flex  gap-3">
                <div className="flex items-start  mt-0.5">
                  <RadioGroup.Item
                    className="bg-white w-[16px] h-[16px] border border-[#d9d9d9] rounded-full  hover:bg-violet3  focus:border focus:border-[#388aeb] outline-none cursor-default"
                    value={configOption?.specific_suite_run}
                    id="r3"
                  >
                    <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-['']  after:w-[8px] after:h-[8px] after:rounded-full after:bg-[#388aeb]" />
                  </RadioGroup.Item>
                </div>
                <div className="flex flex-col">
                  <label
                    className="text-black font-poppin  text-sm font-normal"
                    htmlFor="r3"
                  >
                    Specific Suite Run
                  </label>
                  <p className="font-poppin my-2 text-sm font-normal leading-[22px] text-[#909193]">
                    All Suite Runs for suite{" "}
                    <span className="font-semibold">My Suite</span> will be
                    compared to a specific Suite Run.
                  </p>

                  <CustomInput
                    isLoader={isLoading}
                    value={specificSuiteData?.reporting_comparison_suite_run_id}
                    className={`dark:bg-transparent h-[32px] ${
                      error
                        ? " outline-none focus:border-none border border-danger text-danger"
                        : null
                    } ${
                      success
                        ? " outline-none border border-success focus:border-none  "
                        : null
                    } `}
                    onChange={(val) => {
                      handleInputChange(val);
                    }}
                    type="text"
                    disabled={
                      specificSuiteData?.reporting_comparison_configuration !==
                      "specific_suite_run"
                    }
                    placeholder="Enter Suite Run ID"
                  />
                  <span className={`text-xs mt-0.5  ${error && "text-danger"}`}>
                    {error && "Suite Run ID is not valid"}
                  </span>
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
                onClick={handleSave}
                color="blue"
                variant="solid"
                isPrimary
                disabled={error}
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
