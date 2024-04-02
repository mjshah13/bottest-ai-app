import { Dialog, Flex } from "@radix-ui/themes";
import React, { useState } from "react";
import { Table, TableColumnsType } from "antd";
import CustomButton from "../../../elements/button";
import { BotandSuiteModalType } from "../../../utils/typesInterface";
import * as Tooltip from "@radix-ui/react-tooltip";
import { CopyPlus, Trash } from "lucide-react";
import { useApi } from "../../../hooks/useApi";
import useSuites from "../../../hooks/useSuites";

interface ModalProps {
  title?: string;
  handleDiscard?: () => void;
  isSuiteModalopen?: boolean;
  setIsSuiteModalopen?: (isSuiteModalopen: boolean) => void;
  // handleSave?: () => void;
  // isOpen?: boolean;
  // setIsOpen?: (isOpen: boolean) => void;
  suiteModaldata?: BotandSuiteModalType[];
  handleAddBlankRow?: () => void;
  // selectedValue?: string | undefined;
  setSuiteModalData: React.Dispatch<
    React.SetStateAction<BotandSuiteModalType[]>
  >;
}

const ModifySuite: React.FC<ModalProps> = ({
  title,
  handleDiscard,
  // handleSave,
  // isOpen,
  // setIsOpen,
  suiteModaldata,
  handleAddBlankRow,
  setSuiteModalData,
  // selectedValue,
  isSuiteModalopen,
  setIsSuiteModalopen,
}: ModalProps) => {
  const suiteColumns: TableColumnsType<BotandSuiteModalType> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Default Success Criteria", dataIndex: "info", key: "info" },
    {
      dataIndex: "",
      key: "x",
      render: () => (
        <div className="flex justify-center items-center gap-3">
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button className="outline-none border-none bg-transparent hover:text-[#388aeb]">
                  <CopyPlus size={18} />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="TooltipContent" sideOffset={5}>
                  Create a copy of Suite and existing tests.
                  <Tooltip.Arrow className="TooltipArrow" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>

          <button>
            <Trash color="#E1654A" size={18} />
          </button>
        </div>
      ),
    },
  ];

  const { request } = useApi();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: React.Key
  ) => {
    const value = e.target.value;
    setSuiteModalData((prevData) =>
      prevData.map((suite) =>
        suite.id === id ? { ...suite, name: value, isEdit: true } : suite
      )
    );
  };

  const updateSuite = async (suiteID: string, name: string) => {
    try {
      const data = await request({
        url: `/v1/suites/${suiteID}`,
        method: "PATCH",
        data: {
          name: name,
        },
      });

      console.log(data?.data);
    } catch (error: any) {
      console.error({ error });
    }
  };

  const handleSave = () => {
    const filteredSuite = suiteModaldata?.filter((suite) => suite?.isEdit);
    if (filteredSuite) {
      filteredSuite?.map((item) => {
        updateSuite(item?.id as string, item?.name as string);
      });
      // setIsSuiteModalopen?.(false);
    }
  };

  return (
    <Dialog.Root open={isSuiteModalopen} onOpenChange={setIsSuiteModalopen}>
      <Dialog.Content maxWidth={"860px"}>
        <Dialog.Title>
          <div className="border-b border-[#f5f5f5] py-5 px-6 ">
            <p className="font-poppin text-black ">{title}</p>
          </div>
        </Dialog.Title>
        <div>
          <div className="px-5 pt-4 pb-7">
            <Table
              bordered
              pagination={false}
              columns={suiteColumns}
              dataSource={suiteModaldata?.map((suite) => {
                return {
                  ...suite,
                  name: (
                    <>
                      <input
                        className=" py-2 pl-2 w-full "
                        type="text"
                        value={`${suite.name}` || ""}
                        onChange={(e) => handleChange(e, suite?.id)}
                      />
                    </>
                  ),
                };
              })}
              footer={() => (
                <button
                  className="w-full text-[#388aeb]"
                  onClick={handleAddBlankRow}
                >
                  + Add new blank Suite
                </button>
              )}
            />
          </div>
        </div>

        <div className="border-t border-[#f5f5f5]">
          <Flex gap="3" py={"3"} px={"3"} justify="end">
            <Dialog.Close>
              <CustomButton
                onClick={handleDiscard}
                variant="outline"
                color="gray"
              >
                Discard
              </CustomButton>
            </Dialog.Close>
            <Dialog.Close>
              <CustomButton onClick={handleSave} color="blue" variant="solid">
                Save changes
              </CustomButton>
            </Dialog.Close>
          </Flex>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ModifySuite;
