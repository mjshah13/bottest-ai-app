/* eslint-disable react/display-name */

import { Box, Dialog, Flex, Grid } from "@radix-ui/themes";
import { Ban, ChevronsRight, X } from "lucide-react";
import CustomButton from "../../../elements/button";
import {
  Download,
  User,
  Bot,
  Shuffle,
  Check,
  UserCog,
  ChevronDown,
} from "lucide-react";
import SaveBaselineModal from "../saveBaselineModal";
import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import React, { useContext, useEffect, useState } from "react";
import CustomSelect from "../../../elements/select";
import {
  AccordionTriggerProps,
  EvaluationType,
  GlobalStateType,
  Option,
} from "../../../utils/typesInterface";
import useBaseline from "../../../hooks/useBaseline";
import useTestRun from "../../../hooks/useTestRuns";
import Loader from "../loader";
import Image from "next/image";
import { GlobalStateContext } from "../../../globalState";
import { useAuth, useOrganization } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

interface ModalProps {
  title?: string;
  isTestResultModal?: boolean;
  setIsTestResultModal: (isTestResultModal: boolean) => void;
  specificTestRunId?: string;
  testId?: string;
  testName: string;
}

interface ConversationItem {
  author: string;
  message: string;
}

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className={classNames(
        " group flex h-[45px] flex-1  items-center justify-between   px-6 text-[15px] leading-none  cursor-pointer  outline-none",
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
  specificTestRunId,
  testId,
  testName,
}: ModalProps) => {
  const { orgRole } = useAuth();
  const { organization } = useOrganization();
  const [isOpenSaveBaselineModal, setisOpenSaveBaselineModal] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null);
  const [selectedBaseline, setSelectedBaseline] = useState<Option | null>(null);
  const { baselines } = useContext(GlobalStateContext) as GlobalStateType;
  const { fetchBaseline, isLoading: loading } = useBaseline();
  const { getTestRuns, fetchTestRuns, isLoading } = useTestRun();
  const [selectedVariantLetter, setSelectedVariantLetter] = useState("");
  const [selectedIteration, setSelectedIteration] = useState(0);
  const [variantLetters, setVariantLetters] = useState<string[]>([]);
  const [disabledEvalutions, setDisabledEvalutions] = useState<
    EvaluationType[]
  >([]);

  useEffect(() => {
    if (!specificTestRunId) return;
    fetchTestRuns(specificTestRunId);
  }, [specificTestRunId]);

  useEffect(() => {
    if (!testId) return;
    fetchBaseline(testId, setSelectedBaseline);
  }, [testId]);

  const getFormattedJson = (json: any) => {
    return Object.values(json || {});
  };

  useEffect(() => {
    if (getTestRuns) {
      const letters = getTestRuns.map((item, index) => getVariantLetter(index));
      setVariantLetters(letters);
    }
  }, [getTestRuns]);

  const getVariantLetter = (index: number) => {
    const baseCharCode = "A".charCodeAt(0);
    const variantLetter = String.fromCharCode(baseCharCode + index);
    return variantLetter;
  };

  const handleEvaluation = (
    evaluation: any,
    variantLetter: string,
    evalIndex: number
  ) => {
    setSelectedEvaluation({
      ...evaluation,
    });
    setSelectedVariantLetter(variantLetter);
    setSelectedIteration(evalIndex + 1);
  };

  const downloadJson = (jsonData: any, fileName: string) => {
    console.log(jsonData);
    const jsonString = JSON.stringify(jsonData);
    const blob = new Blob([jsonString], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${fileName}.json`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <Dialog.Root open={isTestResultModal} onOpenChange={setIsTestResultModal}>
        <Dialog.Content
          minWidth={"1088px"}
          className="min-h-[740px]"
          // style={{ minHeight: "890px", height: "100%" }}
        >
          <Grid columns="240px 1fr" className="min-h-[740px] h-full ">
            <Box>
              <div
                className="bg-[#fdfcfa] h-full "
                style={{
                  boxShadow:
                    "0px 9px 28px 8px rgba(0, 0, 0, 0.05) inset,  0px 3px 6px -4px rgba(0, 0, 0, 0.12) ",
                }}
              >
                <div className=" py-3 px-4 ">
                  <p className=" font-semibold text-lg text-black ">
                    Currently viewing
                  </p>
                </div>

                <div className="mt-2">
                  <Accordion.Root
                    className="w-full rounded-md "
                    type="single"
                    collapsible
                  >
                    {getTestRuns?.map((item, index) => {
                      const { icon } = statusHandleClass(item?.status);
                      const variantLetter = variantLetters[index];
                      return (
                        <>
                          <Accordion.AccordionItem value={`${item.id}`}>
                            <AccordionTrigger className="w-full ">
                              <div className="flex justify-between ">
                                <div className="gap-3 flex items-center">
                                  {icon}
                                  <p
                                    className={`text-base font-normal text-black`}
                                  >
                                    {`Variant ${variantLetter}`}
                                  </p>
                                </div>
                              </div>
                            </AccordionTrigger>

                            <Accordion.AccordionContent className="px-3 bg-[#f4f3f2] py-[5px] ">
                              {item.evaluations?.map(
                                (evaluation, evalIndex) => (
                                  <div
                                    key={evalIndex}
                                    className={`px-3 h-[40px] mb-[4px] flex  items-center gap-2.5 rounded-lg  hover:bg-primary hover:text-secondary cursor-pointer 
                                     ${
                                       selectedEvaluation?.id ===
                                         evaluation?.id && "bg-primary "
                                     }
                                    `}
                                    onClick={() => {
                                      handleEvaluation(
                                        evaluation,
                                        variantLetter,
                                        evalIndex
                                      );
                                    }}
                                  >
                                    {evaluation?.status === "Fail" ? (
                                      <X color="#E1654A" size={19} />
                                    ) : (
                                      <Check color="#54CA6E" size={19} />
                                    )}

                                    <h3 className="text-sm text-black font-normal">
                                      Iteration {`${evalIndex + 1}`}
                                    </h3>
                                  </div>
                                )
                              )}
                            </Accordion.AccordionContent>
                          </Accordion.AccordionItem>
                        </>
                      );
                    })}
                  </Accordion.Root>
                </div>
              </div>
            </Box>
            <Box className="relative h-[740px] right-box">
              <Dialog.Title className="h-[6%] ">
                <div className="border-b border-[#e9e5e5] py-4 px-4 ">
                  <p className=" text-black font-semibold text-lg m-0">
                    {title}
                  </p>
                </div>
              </Dialog.Title>

              {selectedEvaluation ? (
                <div className="px-5 py-5 h-[85%]  flex flex-col">
                  {selectedEvaluation?.status === "Fail" ? (
                    <div className=" bg-dangerLight px-6 py-5  rounded-lg mb-5 flex items-start   gap-4">
                      <div className="mt-0.5">
                        <div className="bg-[#E1654A] p-1 rounded-2xl flex items-center justify-center ">
                          <X color="#ffffff" size={14} />
                        </div>
                      </div>
                      <div className="flex flex-col ">
                        <h1 className="text-black text-base font-normal">
                          {selectedEvaluation?.status}
                        </h1>
                        <p className="text-black text-sm font-normal  ">
                          The replayed conversation does not match the tone of
                          any of the baselines. While the tone of all of the
                          baselines is polite and friendly, the tone in the
                          replayed conversation is sarcastic and unprofessional.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className=" bg-successLight px-6 py-3.5  rounded-lg mb-5 flex items-start   gap-3">
                      <div>
                        <div className="bg-[#54CA6E] p-1 rounded-2xl flex items-center justify-center ">
                          <Check color="#ffffff" size={14} />
                        </div>
                      </div>
                      <div className="flex flex-col ">
                        <h1 className="text-black text-normal">
                          {selectedEvaluation?.status}
                        </h1>
                        <p className="text-black text-sm ">
                          {selectedEvaluation?.status?.status_info
                            ? selectedEvaluation?.status?.status_info
                            : "  The replayed conversation matches the content of  “First Baseline”!"}
                        </p>
                      </div>
                    </div>
                  )}
                  {selectedEvaluation?.status === "Fail" && (
                    <div className="w-full h-[8.5%]">
                      <CustomButton
                        color="red"
                        variant="outline"
                        isWidth={true}
                        svgIcon={<UserCog size={16} />}
                        isDanger
                        onClick={() => {
                          setisOpenSaveBaselineModal(true);
                        }}
                        disabled={
                          (organization !== null && orgRole === "org:viewer") ||
                          disabledEvalutions?.includes(selectedEvaluation?.id)
                        }
                      >
                        Override fail and set replayed conversation as an
                        additional baseline.
                      </CustomButton>
                    </div>
                  )}
                  <div className="flex justify-between items-center w-full h-[6%] ">
                    <div className="w-[45%]">
                      <CustomButton
                        color="gray"
                        variant="surface"
                        isWidth={true}
                        svgIcon={<Download size={16} />}
                        onClick={() =>
                          downloadJson(
                            selectedEvaluation?.conversation_json,
                            `Variant ${selectedVariantLetter} - Iteration ${
                              selectedIteration || "Baseline"
                            }`
                          )
                        }
                      >
                        {`Variant ${selectedVariantLetter} - Iteration ${selectedIteration}`}
                      </CustomButton>
                    </div>
                    <hr className="h-[32px] w-[1px] border-none outline-none bg-[#d9d9d9] text-[#d9d9d9" />

                    <div className="w-[45%] pb-1">
                      <CustomSelect
                        placeholder="Select Baseline"
                        Btntext="Deleted Soon"
                        selectedValue={baselines?.find(
                          (baseline) => baseline?.id == selectedBaseline?.id
                        )}
                        options={baselines?.map((baseline) => ({
                          id: baseline?.id,
                          name: baseline?.name,
                        }))}
                        onSelectChange={(selectedOption) => {
                          setSelectedBaseline(selectedOption);
                        }}
                        isAddedBtn={false}
                      />
                    </div>

                    <button
                      className="border border-[#d8d8d8] px-2 py-1.5 rounded-lg hover:bg-[#FFFDFD] hover:border hover:border-[#d8d8d8]"
                      onClick={() =>
                        downloadJson(
                          baselines?.find(
                            (item) => item?.id === selectedBaseline?.id
                          )?.conversation_json,
                          selectedBaseline?.name || "Baseline"
                        )
                      }
                    >
                      <Download size={19} />
                    </button>
                  </div>{" "}
                  <div className="flex-1 px-4 pt-1 pb-4 bg-[#fdfcfa] border-2 border-[#f0eeef] rounded mt-5 overflow-auto">
                    <div className="flex flex-col">
                      {getFormattedJson(
                        selectedEvaluation?.conversation_json
                      )?.map((item: any, index: number) => {
                        const matchingBaseline = baselines?.find(
                          (baseline) => baseline?.id === selectedBaseline?.id
                        );
                        const baselineConversationJson: ConversationItem[] =
                          getFormattedJson(
                            matchingBaseline?.conversation_json
                          ) as ConversationItem[];

                        return (
                          <>
                            {item?.author === "user" && (
                              <div
                                className="flex gap-4 items-end mt-1"
                                key={item.id}
                              >
                                <div className="w-[40px] h-[38px] mb-1 bg-[#f6f5f3] flex items-center justify-center  rounded-full">
                                  <User size={23} color="gray" />
                                </div>
                                <div className="w-full">
                                  <textarea
                                    value={item.message}
                                    disabled={true}
                                    className={`
                                     mt-2.5 w-full px-2 py-2 text-sm font-normal border border-[#d0d0d0] rounded resize-none disabled:bg-[#fefefd]  disabled:text-[#8e8e8d] overflow-y-scroll  `}
                                  />
                                </div>
                              </div>
                            )}
                            {item?.author === "bot" && (
                              <div className="flex gap-4 items-end ">
                                <div className="w-[40px] h-[38px] bg-[#388aeb] rounded-full   flex items-center justify-center">
                                  <Bot size={23} color="#ffff" />
                                </div>
                                <div className="w-full flex items-center gap-3">
                                  <textarea
                                    value={item?.message}
                                    className={`mt-2.5 w-full px-2 py-2 border border-[#d0d0d0] rounded text-sm font-normal resize-none h-[180px] overflow-y-scroll bot_textarea`}
                                    placeholder=""
                                  />
                                  <hr className="h-[180px] mt-2.5 w-[3px] border-none outline-none bg-[#d9d9d9] text-[#d9d9d9] " />

                                  <textarea
                                    value={
                                      baselineConversationJson[index]
                                        ?.message || ""
                                    }
                                    className={`mt-2.5 w-full px-2 py-2 border border-[#d0d0d0] rounded text-sm font-normal resize-none h-[180px] overflow-y-scroll bot_textarea`}
                                    placeholder="Baseline message will appear here..."
                                  />
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-[85%] flex flex-col items-center justify-center">
                  <Image
                    width={184}
                    height={152}
                    src="/Assets/noData.svg"
                    alt=""
                  />
                  <h1 className="text-black font-semibold text-lg mt-2 ">
                    Please select the iteration from the dropdown.
                  </h1>
                </div>
              )}

              <div className="border-t px-3 py-0.5 border-[#e9e5e5] absolute bottom-0 right-0 w-full ">
                <Flex gap="3" justify="end">
                  <div className="py-2">
                    <Dialog.Close>
                      <CustomButton variant="outline" color="gray">
                        Done
                      </CustomButton>
                    </Dialog.Close>
                  </div>
                </Flex>
              </div>
            </Box>
          </Grid>
        </Dialog.Content>
        {isLoading && <Loader />}

        <SaveBaselineModal
          disabledEvalutions={disabledEvalutions}
          setDisabledEvalutions={setDisabledEvalutions}
          selectedEvaluation={selectedEvaluation}
          testName={testName}
          testId={testId}
          htmlBlob={selectedEvaluation?.html_blob}
          isOpenSaveBaselineModal={isOpenSaveBaselineModal}
          setisOpenSaveBaselineModal={setisOpenSaveBaselineModal}
          title={title}
        />
      </Dialog.Root>
    </>
  );
};

TestResult.displayName = "TestResult";

export default TestResult;

const statusHandleClass = (status: string) => {
  switch (status) {
    case "Running":
      return {
        backgroundColor: "bg-primary",
        text: "Test in progress",
        icon: <Shuffle color="#388aeb" size={16} />,
      };
    case "Pass":
      return {
        backgroundColor: "bg-successLight",
        text: "View full result",
        icon: <Check color="#54CA6E" size={16} />,
      };
    case "Fail":
      return {
        backgroundColor: "bg-dangerLight",
        text: "View full result",
        icon: <X color="#E1654A" size={16} />,
      };
    case "Error":
      return {
        backgroundColor: "bg-dangerLight",
        text: "View error",
        icon: (
          <svg
            width="16"
            height="16"
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
        icon: <Shuffle color="#E7C200" size={16} />,
      };
    case "Skipped":
      return {
        backgroundColor: "bg-[#f2f2f2]",
        text: "No result",
        icon: <Ban color="#212427" size={16} />,
      };
    case "Stopped":
      return {
        backgroundColor: "bg-[#f2f2f2]",
        text: "No result",
        icon: <ChevronsRight color="#212427" size={16} />,
      };
    default:
      return { backgroundColor: "", text: "" };
  }
};
