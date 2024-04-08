import { Dialog, Flex, Table } from "@radix-ui/themes";
import React, { useContext, useEffect, useState } from "react";
import CustomButton from "../../../elements/button";
import {
  BotAndSuiteModalType,
  GlobalStateType,
  Option,
  SuiteType,
} from "../../../utils/typesInterface";
import * as Tooltip from "@radix-ui/react-tooltip";
import { CopyPlus, Trash } from "lucide-react";
import useUpdateSuite from "../../../hooks/useUpdateSuite";
import useAddSuite from "../../../hooks/useAddSuite";
import { useApi } from "../../../hooks/useApi";
import { GlobalStateContext } from "../../../globalState";
import { v4 as uuidv4 } from "uuid";

interface ModalProps {
  title?: string;
  isSuiteModalOpen?: boolean;
  setIsSuiteModalOpen: (isSuiteModalopen: boolean) => void;
  selectedBot?: Option | null;
}

const ModifySuite: React.FC<ModalProps> = ({
  title,
  selectedBot,
  isSuiteModalOpen,
  setIsSuiteModalOpen,
}: ModalProps) => {
  // const suiteColumns: TableColumnsType<BotAndSuiteModalType> = [
  //   { title: "Name", dataIndex: "name", key: "name" },
  //   { title: "Default Success Criteria", dataIndex: "info", key: "info" },
  //   {
  //     dataIndex: "",
  //     key: "x",
  //     render: (record) => (
  //       <div className="flex justify-center items-center gap-3">
  //         <Tooltip.Provider>
  //           <Tooltip.Root>
  //             <Tooltip.Trigger asChild>
  //               <button className="outline-none border-none bg-transparent hover:text-[#388aeb]">
  //                 <CopyPlus size={18} />
  //               </button>
  //             </Tooltip.Trigger>
  //             <Tooltip.Portal>
  //               <Tooltip.Content className="TooltipContent" sideOffset={5}>
  //                 Create a copy of Suite and existing tests.
  //                 <Tooltip.Arrow className="TooltipArrow" />
  //               </Tooltip.Content>
  //             </Tooltip.Portal>
  //           </Tooltip.Root>
  //         </Tooltip.Provider>

  //         <button onClick={() => deleteSuite(record?.id)}>
  //           <Trash color="#E1654A" size={18} />
  //         </button>
  //       </div>
  //     ),
  //   },
  // ];

  const { request } = useApi();

  const { suiteLists, deleteSuiteRow } = useContext(
    GlobalStateContext
  ) as GlobalStateType;

  const { updateSuite } = useUpdateSuite();
  const { addSuite } = useAddSuite();
  const [suiteData, setSuiteData] = useState<BotAndSuiteModalType[]>([]);

  useEffect(() => {
    setSuiteData(
      suiteLists?.map((suite: SuiteType) => ({
        id: suite.id,
        name: suite.name,
        info: `this is ${suite.name}`,
        description: `this is ${suite.name}`,
      }))
    );
  }, [suiteLists]);

  const handleDiscard = () => {
    setSuiteData([]);
    setIsSuiteModalOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: React.Key
  ) => {
    const value = e.target.value;
    setSuiteData(
      (prevData) =>
        prevData &&
        prevData.map((suite) =>
          suite.id === id
            ? { ...suite, name: value, isEdit: suite?.isNew ? false : true }
            : suite
        )
    );
  };

  const addBlankSuite = () => {
    const newSuite = {
      id: uuidv4(),
      name: "",
      info: "",
      description: "",
      isNew: true,
    };
    setSuiteData([...suiteData, newSuite]);
  };

  const deleteSuite = async (suiteId: string) => {
    try {
      const data = await request({
        url: `/v1/suites/${suiteId}`,
        method: "DELETE",
      });
      deleteSuiteRow(suiteId, suiteLists);
    } catch (error: any) {
      console.error({ error });
    }
  };

  const handleSave = () => {
    const filteredSuite = suiteData?.filter((suite) => suite?.isEdit);
    if (filteredSuite) {
      filteredSuite?.map((item) => {
        updateSuite(item?.id as string, item?.name as string, suiteLists);
      });
    }
    const filteredNewSuite = suiteData?.filter((suite) => suite?.isNew);
    if (filteredNewSuite) {
      filteredNewSuite?.map((item) => {
        addSuite(item?.name as string, selectedBot?.id as string, suiteLists);
      });
    }
  };

  return (
    <Dialog.Root open={isSuiteModalOpen} onOpenChange={setIsSuiteModalOpen}>
      <Dialog.Content maxWidth={"870px"}>
        <Dialog.Title>
          <div className="border-b border-[#f5f5f5] py-5 px-6 ">
            <p className="font-poppin text-black ">{title}</p>
          </div>
        </Dialog.Title>
        <div>
          <div className="px-5 pt-4 pb-7">
            {/* <Table
              bordered
              pagination={false}
              columns={suiteColumns}
              dataSource={suiteData?.map((suite) => {
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
                <button
                  className="w-full text-[#388aeb]"
                  onClick={addBlankSuite}
                >
                  + Add new blank Suite
                </button>
              )}
            /> */}

            <Table.Root variant="surface" size={"2"}>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell
                    style={{ width: "180px" }}
                    className="border-r border-[#d2cdcd]"
                  >
                    Name
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell
                    style={{ width: "270px" }}
                    className="border-r border-[#d2cdcd]"
                  >
                    Default Success Criteria
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell
                    style={{ width: "150px" }}
                    className="border-r border-[#d2cdcd]"
                  >
                    Default Variants
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell
                    style={{ width: "160px" }}
                    className="border-r border-[#d2cdcd]"
                  >
                    Default Iterations
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {suiteData.map((suite) => (
                  <Table.Row key={suite.id}>
                    <Table.Cell className="border-r border-[#d2cdcd]">
                      {" "}
                      <input
                        className=" py-2  w-[90%] outline-none  "
                        type="text"
                        value={`${suite.name}` || ""}
                        onChange={(e) => handleChange(e, suite?.id)}
                      />
                    </Table.Cell>
                    <Table.Cell className="border-r border-[#d2cdcd] ">
                      <div className="flex items-center h-full    max-w-[240px]">
                        <div className="whitespace-nowrap overflow-hidden overflow-ellipsis  ">
                          {suite?.info}
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="border-r border-[#d2cdcd]">
                      <div className="flex items-center h-full">
                        {suite.info}
                      </div>
                    </Table.Cell>
                    <Table.Cell className="border-r border-[#d2cdcd]">
                      <div className="flex items-center h-full">
                        {suite.info}
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center justify-center gap-1.2 h-full">
                        <Tooltip.Provider>
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <button className="outline-none border-none bg-transparent hover:text-[#388aeb]">
                                <CopyPlus size={18} />
                              </button>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                              <Tooltip.Content
                                className="TooltipContent"
                                sideOffset={5}
                              >
                                Create a copy of bots and existing tests.
                                <Tooltip.Arrow className="TooltipArrow" />
                              </Tooltip.Content>
                            </Tooltip.Portal>
                          </Tooltip.Root>
                        </Tooltip.Provider>
                        <button
                          className="ml-3"
                          onClick={() => deleteSuite(suite.id)}
                        >
                          <Trash color="#E1654A" size={18} />
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}

                <Table.Row>
                  <Table.Cell colSpan={5} className="bg-[#FDFCFA] ">
                    <button
                      style={{ fontFamily: "poppins" }}
                      className="w-full py-1.5 flex items-center justify-center text-[#388aeb] "
                      onClick={addBlankSuite}
                    >
                      + Add new blank Suite
                    </button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
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
