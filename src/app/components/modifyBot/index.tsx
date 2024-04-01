import { Dialog, Flex } from "@radix-ui/themes";
import React, { useState } from "react";
import { Table, TableColumnsType } from "antd";
import CustomButton from "../../../elements/button";
// import { ModifyModalType } from "../../../utils/typesInterface";
import * as Tooltip from "@radix-ui/react-tooltip";
import { CopyPlus, Edit, Trash } from "lucide-react";
import { BotandSuiteModalType } from "../../../utils/typesInterface";
import { useApi } from "../../../hooks/useApi";

interface ModalProps {
  title?: string;
  handleDiscard?: () => void;
  // handleSave?: () => void;
  // isOpen?: boolean;
  // setIsOpen?: (isOpen: boolean) => void;
  isBotsModalopen?: boolean;
  setIsBotsModalopen?: (isBotsModalopen: boolean) => void;
  botModaldata?: BotandSuiteModalType[];
  handleAddBlankRow?: () => void;
  setBotModalData: React.Dispatch<React.SetStateAction<BotandSuiteModalType[]>>;
}

const ModifyBot: React.FC<ModalProps> = ({
  title,
  handleDiscard,
  // handleSave,
  // isOpen,
  // setIsOpen,
  isBotsModalopen,
  setIsBotsModalopen,
  botModaldata,
  handleAddBlankRow,
  setBotModalData,
}: ModalProps) => {
  const botsColumns: TableColumnsType<BotandSuiteModalType> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "info", key: "info" },
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
                  Create a copy of bots and existing tests.
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
    setBotModalData((prevData) =>
      prevData.map((bot) =>
        bot.id === id ? { ...bot, name: value, isEdit: true } : bot
      )
    );
  };

  const updateBot = async (botID: string, name: string) => {
    try {
      const data = await request({
        url: `/v1/bots/${botID}`,
        method: "PATCH",
        data: {
          name: name,
        },
      });
      console.log(data?.data, "hhhh");
    } catch (error: any) {
      console.error({ error });
    }
  };

  const handleSave = () => {
    const filteredBot = botModaldata?.find((bot) => bot?.isEdit);
    if (filteredBot) {
      updateBot(filteredBot?.id as string, filteredBot?.name as string);
      setIsBotsModalopen?.(false);
    }
  };

  return (
    <Dialog.Root open={isBotsModalopen} onOpenChange={setIsBotsModalopen}>
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
              dataSource={botModaldata?.map((bot) => {
                return {
                  ...bot,
                  name: (
                    <>
                      <input
                        className=" py-2 pl-2 w-full "
                        type="text"
                        value={`${bot.name}` || ""}
                        onChange={(e) => handleChange(e, bot?.id)}
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
