import { Dialog, Flex } from "@radix-ui/themes";
import React, { useContext, useState } from "react";
import { Table, TableColumnsType } from "antd";
import CustomButton from "../../../elements/button";
import {
  BotAndSuiteModalType,
  GlobalStateType,
  Option,
} from "../../../utils/typesInterface";
import * as Tooltip from "@radix-ui/react-tooltip";
import { CopyPlus, Trash } from "lucide-react";
import useUpdateSuite from "../../../hooks/useUpdateSuite";
import useAddSuite from "../../../hooks/useAddSuite";
import { useApi } from "../../../hooks/useApi";
import { GlobalStateContext } from "../../../globalState";

interface ModalProps {
  title?: string;
  handleDiscard?: () => void;
  isSuiteModalOpen?: boolean;
  setIsSuiteModalOpen?: (isSuiteModalopen: boolean) => void;
  selectedBot?: Option | null;
  // handleSave?: () => void;
  // suiteModalData?: BotAndSuiteModalType[];
  handleAdd?: () => void;
  // setSuiteModalData: React.Dispatch<
  //   React.SetStateAction<BotAndSuiteModalType[]>
  // >;
}

const ModifySuite: React.FC<ModalProps> = ({
  title,
  handleDiscard,
  selectedBot,
  // handleSave,
  // suiteModalData,
  handleAdd,
  // setSuiteModalData,
  isSuiteModalOpen,
  setIsSuiteModalOpen,
}: ModalProps) => {
  const { suiteModalData, setSuiteModalData } = useContext(
    GlobalStateContext
  ) as GlobalStateType;

  const suiteColumns: TableColumnsType<BotAndSuiteModalType> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Default Success Criteria", dataIndex: "info", key: "info" },
    {
      dataIndex: "",
      key: "x",
      render: (record) => (
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

          <button onClick={() => deleteSuite(record?.id)}>
            <Trash color="#E1654A" size={18} />
          </button>
        </div>
      ),
    },
  ];

  const { request } = useApi();

  const { updateSuite } = useUpdateSuite();
  const { addSuite } = useAddSuite();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: React.Key
  ) => {
    const value = e.target.value;
    setSuiteModalData((prevData) =>
      prevData.map((suite) =>
        suite.id === id
          ? { ...suite, name: value, isEdit: suite?.isNew ? false : true }
          : suite
      )
    );
  };

  const deleteSuite = async (suiteId: string) => {
    try {
      const data = await request({
        url: `/v1/suites/${suiteId}`,
        method: "DELETE",
      });

      console.log(data?.data);
    } catch (error: any) {
      console.error({ error });
    }
  };

  const handleSave = () => {
    const filteredSuite = suiteModalData?.filter((suite) => suite?.isEdit);
    if (filteredSuite) {
      filteredSuite?.map((item) => {
        updateSuite(item?.id as string, item?.name as string);
      });
      // setIsSuiteModalopen?.(false);
    }
    const filteredNewSuite = suiteModalData?.filter((suite) => suite?.isNew);
    if (filteredNewSuite) {
      filteredNewSuite?.map((item) => {
        addSuite(item?.name as string, selectedBot?.id as string);
      });
      // setIsSuiteModalopen?.(false);
    }
  };

  return (
    <Dialog.Root open={isSuiteModalOpen} onOpenChange={setIsSuiteModalOpen}>
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
              dataSource={suiteModalData?.map((suite) => {
                return {
                  ...suite,
                  name: (
                    <>
                      <input
                        className=" py-2 pl-2 w-full outline-none "
                        type="text"
                        value={`${suite.name}` || ""}
                        onChange={(e) => handleChange(e, suite?.id)}
                      />
                    </>
                  ),
                };
              })}
              footer={() => (
                <button className="w-full text-[#388aeb]" onClick={handleAdd}>
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
