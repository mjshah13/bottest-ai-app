import { Dialog, Flex } from "@radix-ui/themes";
import React, { useContext, useState } from "react";
import { Table, TableColumnsType } from "antd";
import CustomButton from "../../../elements/button";
import * as Tooltip from "@radix-ui/react-tooltip";
import { CopyPlus, Trash } from "lucide-react";
import {
  BotAndSuiteModalType,
  GlobalStateType,
} from "../../../utils/typesInterface";
import useAddBot from "../../../hooks/useAddBot";
import useUpdateBot from "../../../hooks/useUpdateBot";
import { useApi } from "../../../hooks/useApi";
import { GlobalStateContext } from "../../../globalState";

interface ModalProps {
  title?: string;
  handleDiscard?: () => void;
  // handleSave?: () => void;
  isBotsModalOpen?: boolean;
  setIsBotsModalOpen?: (isBotsModalopen: boolean) => void | undefined;
  // botModalData?: BotAndSuiteModalType[];
  handleAdd?: () => void;
  // setBotModalData: React.Dispatch<React.SetStateAction<BotAndSuiteModalType[]>>;
}

const ModifyBot: React.FC<ModalProps> = ({
  title,
  handleDiscard,
  // handleSave,
  isBotsModalOpen,
  setIsBotsModalOpen,
  // botModalData,
  handleAdd,
}: // setBotModalData,
ModalProps) => {
  const { request } = useApi();
  const botsColumns: TableColumnsType<BotAndSuiteModalType> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "info", key: "info" },
    {
      dataIndex: "",
      key: "x",
      render: (record) => {
        // console.log("Record:", record); // Add this line to log the record object
        return (
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
                    Create a copy of bots and existing tests.
                    <Tooltip.Arrow className="TooltipArrow" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>

            <button onClick={() => deleteBot(record?.id)}>
              <Trash color="#E1654A" size={18} />
            </button>
          </div>
        );
      },
    },
  ];

  const { botModalData, setBotModalData } = useContext(
    GlobalStateContext
  ) as GlobalStateType;

  const { addBot } = useAddBot();
  const { updateBot } = useUpdateBot();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: React.Key
  ) => {
    const value = e.target.value;
    setBotModalData((prevData) =>
      prevData.map((bot) =>
        bot.id === id
          ? { ...bot, name: value, isEdit: bot?.isNew ? false : true }
          : bot
      )
    );
  };

  const deleteBot = async (botId: string) => {
    try {
      const data = await request({
        url: `/v1/bots/${botId}`,
        method: "DELETE",
      });

      console.log(data?.data);
    } catch (error: any) {
      console.error({ error });
    }
  };

  const handleSave = () => {
    const filteredUpdateBot = botModalData?.filter((bot) => bot?.isEdit);
    if (filteredUpdateBot) {
      filteredUpdateBot?.map((item) => {
        updateBot(item?.id as string, item?.name as string);
      });

      // setIsBotsModalOpen?.(false);
    }
    const filteredNewBot = botModalData?.filter((bot) => bot?.isNew);
    if (filteredNewBot) {
      filteredNewBot?.map((item) => {
        addBot(item?.name as string);
      });

      // setIsBotsModalOpen?.(false);
    }
  };

  return (
    <Dialog.Root open={isBotsModalOpen} onOpenChange={setIsBotsModalOpen}>
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
              columns={botsColumns}
              expandable={{
                expandedRowRender: (record) => {
                  // console.log(record), "record"; // Record ko console me print karna
                  return <p style={{ margin: 0 }}>{record.description}</p>;
                },
              }}
              dataSource={botModalData?.map((bot) => {
                return {
                  ...bot,
                  name: (
                    <>
                      <input
                        className=" py-2 pl-2 w-full outline-none  "
                        type="text"
                        value={`${bot.name}` || ""}
                        onChange={(e) => handleChange(e, bot?.id)}
                      />
                    </>
                  ),
                };
              })}
              footer={() => (
                <button className="w-full text-[#388aeb]" onClick={handleAdd}>
                  + Add new blank Bot
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

export default ModifyBot;
