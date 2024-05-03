/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

import { Checkbox, Dialog, Flex } from "@radix-ui/themes";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import CustomButton from "../../../elements/button";
import Chip from "../../../elements/chip";
import { Trash } from "lucide-react";
import {
  CustomizeTestData,
  GlobalStateType,
  TestType,
} from "../../../utils/typesInterface";
import useBaseline from "../../../hooks/useBaseline";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { TabBtn } from "../../../utils/common";
import useDeleteBaseline from "../../../hooks/useDeleteBaseline";
import useDeleteTest from "../../../hooks/useDeleteTest";
import { GlobalStateContext } from "../../../globalState";
import DeleteModal from "../deleteModal";
import { useApi } from "../../../hooks/useApi";
import useUpdateTest from "../../../hooks/useUpdateTest";
import { useAuth, useOrganization } from "@clerk/nextjs";

interface ModalProps {
  title?: string;
  specificTest: TestType;
  isCustomizeTestModal?: boolean;
  setIsCustomizeTestModal: (isCustomizeTestModa: boolean) => void;
}

const CustomizeTest: React.FC<ModalProps> = ({
  title,
  isCustomizeTestModal,
  setIsCustomizeTestModal,
  specificTest,
}: ModalProps) => {
  const { baselines, testData } = useContext(
    GlobalStateContext
  ) as GlobalStateType;

  const { fetchBaseline, isLoading } = useBaseline();
  const [successCriteriaTab, setSuccessCriteriaTab] = useState(0);
  const [numberOfVariantsTab, setNumberOfVariantsTab] = useState(0);
  const [numberOfIterationTab, setNumberOfIterationTab] = useState(0);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const { deleteBaseline } = useDeleteBaseline();
  const { deleteTest } = useDeleteTest();
  const { updateTest } = useUpdateTest();
  const { orgRole } = useAuth();
  const { organization } = useOrganization();

  const [isSuccessCriteriaTextDisabled, setIsSuccessCriteriaTextDisabled] =
    useState(true);
  const [isNumberOfVariantsInputDisabled, setIsNumberOfVariantsInputDisabled] =
    useState(true);
  const [
    isNumberOfIterationInputDisabled,
    setIsNumberOfIterationInputDisabled,
  ] = useState(true);

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

  const [customizeTestData, setCustomizeTestData] = useState<CustomizeTestData>(
    {
      success_criteria: "",
      variant_count: 0,
      iteration_count: 0,
      full_run_enabled: false,
    }
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCustomizeTestData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxChange = (isChecked: boolean | "indeterminate") => {
    setCustomizeTestData((prevState) => ({
      ...prevState,
      full_run_enabled:
        isChecked === "indeterminate" ? prevState.full_run_enabled : isChecked,
    }));
  };

  const downloadJson = (jsonData: any, fileName: string) => {
    const jsonString = JSON.stringify(jsonData);
    const blob = new Blob([jsonString], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${fileName}.json`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    if (!specificTest) return;
    fetchBaseline(specificTest.id);
  }, []);

  useEffect(() => {
    if (specificTest) {
      setCustomizeTestData({
        success_criteria: specificTest?.success_criteria,
        variant_count: specificTest?.variant_count,
        iteration_count: specificTest?.iteration_count,
        full_run_enabled: specificTest?.full_run_enabled,
      });
    }
  }, [specificTest]);

  return (
    <Dialog.Root
      open={isCustomizeTestModal}
      onOpenChange={setIsCustomizeTestModal}
    >
      <Dialog.Content maxWidth={"860px"}>
        <Dialog.Title>
          <div className="border-b border-[#f5f5f5] py-5 px-6 ">
            <p className=" text-black font-semibold text-base">{title}</p>
          </div>
        </Dialog.Title>
        <div>
          <div className="px-5 pt-2 pb-7">
            <h1 className="mb-2 text-sm ">Success criteria:</h1>
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
            w-full flex items-center justify-center rounded text-sm ${
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
              {isLoading ? (
                <div className="mt-1">
                  <Skeleton count={1} width={"100%"} height={80} />
                </div>
              ) : (
                <textarea
                  onChange={(e) => handleChange(e)}
                  name="success_criteria"
                  value={customizeTestData?.success_criteria}
                  disabled={isSuccessCriteriaTextDisabled}
                  className={`${
                    isSuccessCriteriaTextDisabled &&
                    "text-[#b8b8b8] bg-[#f5f5f5]"
                  } mt-2.5 w-full px-2 py-1.5 border border-[#d0d0d0] rounded-md font-normal text-sm h-[70px]`}
                  placeholder="Enter your custom success criteria here..."
                />
              )}

              <p className="text-[#909193] text-xs font-normal ">
                The default success criteria can be changed on a test suite
                level in the test suite settings.
              </p>
            </div>

            <div className="flex mt-6 gap-7 ">
              <div className=" w-full ">
                <h1 className="mb-2 text-sm ">Number of variants</h1>
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
             w-full flex items-center justify-center rounded text-sm ${
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
                  {isLoading ? (
                    <div className="mt-1">
                      <Skeleton count={1} width={"100%"} height={40} />
                    </div>
                  ) : (
                    <input
                      onChange={(e) => handleChange(e)}
                      name="variant_count"
                      value={customizeTestData?.variant_count}
                      disabled={isNumberOfVariantsInputDisabled}
                      className={`${
                        isNumberOfVariantsInputDisabled &&
                        "text-[#b8b8b8] bg-[#f5f5f5]"
                      } mt-2.5 w-full px-2 py-1.5 border border-[#d0d0d0] rounded font-normal text-sm`}
                      placeholder="Enter your custom variant count here..."
                    />
                  )}
                </div>
              </div>
              <div className="w-full ">
                <h1 className="mb-2 text-sm ">Number of iterations</h1>
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
            w-full flex items-center justify-center rounded text-sm ${
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
                  {isLoading ? (
                    <div className="mt-1">
                      <Skeleton count={1} width={"100%"} height={40} />
                    </div>
                  ) : (
                    <input
                      onChange={(e) => handleChange(e)}
                      name="iteration_count"
                      value={customizeTestData?.iteration_count}
                      disabled={isNumberOfIterationInputDisabled}
                      className={`${
                        isNumberOfIterationInputDisabled &&
                        "text-[#b8b8b8] bg-[#f5f5f5]"
                      } mt-2.5 w-full px-2 py-1.5 border border-[#d0d0d0] rounded font-normal text-sm`}
                      placeholder="Enter your custom iteration count here..."
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h1 className="text-sm ">Baseline conversations:</h1>
              <div className="mt-2 flex gap-3">
                {isLoading ? (
                  <div className="mt-1">
                    <Skeleton count={1} width={120} height={35} />
                  </div>
                ) : (
                  <>
                    {baselines?.map((item) => (
                      <div className="mr-1.5">
                        <Chip
                          key={item.id}
                          handleDelete={() =>
                            deleteBaseline(item?.id, baselines)
                          }
                          onClick={() =>
                            downloadJson(
                              item?.conversation_json,
                              item?.name || "Baseline"
                            )
                          }
                          isCancel={baselines?.length > 1}
                        >
                          {item?.name}
                        </Chip>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
            <div className="mt-6">
              <h1 className="text-sm mb-2">Full test runs:</h1>
              <div className="flex items-center gap-2">
                <Checkbox
                  variant="classic"
                  color="blue"
                  checked={customizeTestData?.full_run_enabled}
                  onCheckedChange={(isChecked) =>
                    handleCheckboxChange(isChecked)
                  }
                  disabled={organization !== null && orgRole === "org:viewer"}
                />
                <h1 className="text-sm">
                  {`Disable "${specificTest?.name}" from running in full test runs`}
                </h1>
              </div>
            </div>
            <div className="mt-6">
              <CustomButton
                variant="outline"
                color="red"
                svgIcon={<Trash size={17} />}
                isDanger
                onClick={() => {
                  setIsDeleteModal(true);
                }}
                disabled={organization !== null && orgRole === "org:viewer"}
                // disabled={true}
              >
                {` Delete ${specificTest?.name}`}
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
              <CustomButton
                onClick={() =>
                  updateTest(specificTest?.id, customizeTestData, testData)
                }
                color="blue"
                variant="solid"
                isPrimary
                disabled={organization !== null && orgRole === "org:viewer"}
              >
                Save changes
              </CustomButton>
            </Dialog.Close>
          </Flex>
        </div>
      </Dialog.Content>

      {isDeleteModal && (
        <DeleteModal
          onClick={() => {
            if (specificTest?.id) {
              deleteTest(specificTest?.id, testData);
              setIsDeleteModal(false);
            }
          }}
          description={`Are you sure you want to delete the ${specificTest?.name} Test? This action can not be undone.`}
          isDeleteModal={isDeleteModal}
          setIsDeleteModal={setIsDeleteModal}
          title={`Delete "${specificTest?.name}" Test`}
        />
      )}
    </Dialog.Root>
  );
};

export default CustomizeTest;
