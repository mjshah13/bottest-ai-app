import { Dialog, Flex, Table } from "@radix-ui/themes";
import React, { useContext, useEffect, useState } from "react";

import CustomButton from "../../../elements/button";
import * as Tooltip from "@radix-ui/react-tooltip";
import { CopyPlus, Trash } from "lucide-react";
import {
  BotType,
  GlobalStateType,
  Option,
} from "../../../utils/typesInterface";
import useAddBot from "../../../hooks/useAddBot";
import useUpdateBot from "../../../hooks/useUpdateBot";
import { useApi } from "../../../hooks/useApi";
import { GlobalStateContext } from "../../../globalState";
import { v4 as uuidv4 } from "uuid";
import useDeleteBot from "../../../hooks/useDeleteBot";
import DeleteModal from "../deleteModal";
import { useAuth, useOrganization } from "@clerk/nextjs";
import useDuplicateBot from "../../../hooks/useDuplicateBot";

interface ModalProps {
  title?: string;
  // selectedBot?: Option | null;
  isBotsModalOpen?: boolean;
  setIsBotsModalOpen: (isBotsModalopen: boolean) => void;
}

const ModifyBot: React.FC<ModalProps> = ({
  title,
  // selectedBot,
  isBotsModalOpen,
  setIsBotsModalOpen,
}: ModalProps) => {
  const { botLists } = useContext(GlobalStateContext) as GlobalStateType;
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [selectedBot, setSelectedBot] = useState<BotType | null>(null);
  const { orgRole } = useAuth();
  const { organization } = useOrganization();
  const { addBot } = useAddBot();
  const { deleteBot } = useDeleteBot();
  const { updateBot } = useUpdateBot();
  const { duplicateBot } = useDuplicateBot();
  const [botData, setBotData] = useState<BotType[]>([]);

  useEffect(() => {
    setBotData(
      botLists?.map((bot: BotType) => ({
        id: bot.id,
        name: bot.name,
        info: `this is ${bot.name}`,
        description: `this is ${bot.name}`,
      }))
    );
  }, [botLists]);

  const handleDiscard = () => {
    setBotData([]);
    setIsBotsModalOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: React.Key
  ) => {
    const value = e.target.value;
    setBotData(
      (prevData) =>
        prevData &&
        prevData.map((bot) =>
          bot.id === id
            ? { ...bot, name: value, isEdit: bot?.isNew ? false : true }
            : bot
        )
    );
  };
  const addBlankBot = () => {
    const newBot = {
      id: uuidv4(),
      name: "",
      info: "",
      description: "",
      isNew: true,
    };
    setBotData([...botData, newBot]);
  };

  const handleSave = () => {
    const filteredUpdateBot = botData?.filter((bot) => bot?.isEdit);
    if (filteredUpdateBot) {
      filteredUpdateBot?.map((item) => {
        updateBot(item?.id as string, item?.name as string, botLists);
      });
    }
    const filteredNewBot = botData?.filter((bot) => bot?.isNew);
    if (filteredNewBot) {
      filteredNewBot?.map((item) => {
        if (!item?.name) return;
        addBot(item?.name as string, botLists);
      });
    }
  };

  return (
    <Dialog.Root open={isBotsModalOpen} onOpenChange={setIsBotsModalOpen}>
      <Dialog.Content maxWidth={"870px"}>
        <Dialog.Title>
          <div className="border-b border-[#f5f5f5] py-5 px-6 ">
            <p className="font-poppin text-black ">{title}</p>
          </div>
        </Dialog.Title>
        <div>
          <div className="px-5 pt-4 pb-7">
            <Table.Root variant="surface" size={"2"}>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell
                    style={{ width: "250px" }}
                    className="border-r border-[#d2cdcd]"
                  >
                    Name
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell
                    style={{ width: "480px" }}
                    className="border-r border-[#d2cdcd]"
                  >
                    Description
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {botData.map((bot) => (
                  <Table.Row key={bot.id}>
                    <Table.Cell className="border-r border-[#d2cdcd]">
                      {" "}
                      <input
                        className=" py-2  w-[90%] outline-none  "
                        type="text"
                        value={`${bot.name}` || ""}
                        onChange={(e) => handleChange(e, bot?.id)}
                        disabled={
                          organization !== null && orgRole === "org:viewer"
                        }
                      />
                    </Table.Cell>
                    <Table.Cell className="border-r border-[#d2cdcd]">
                      <div className="flex items-center h-full">{bot.info}</div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center justify-center gap-1.2 h-full">
                        {/* <Tooltip.Provider>
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild> */}
                        <button
                          onClick={() => duplicateBot(bot?.id, botLists)}
                          disabled={
                            organization !== null && orgRole === "org:viewer"
                          }
                          className="outline-none border-none bg-transparent hover:text-[#388aeb] disabled:hover:text-[#adb1bd]"
                        >
                          <CopyPlus size={18} />
                        </button>
                        {/* </Tooltip.Trigger>
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
                        </Tooltip.Provider> */}
                        <button
                          className=" ml-3 outline-none border-none bg-transparent  disabled:hover:text-[#adb1bd]"
                          onClick={() => {
                            setIsDeleteModal(true);
                            setSelectedBot(bot);
                          }}
                          disabled={
                            organization !== null && orgRole === "org:viewer"
                          }
                        >
                          <Trash color="#E1654A" size={18} />
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}

                <Table.Row>
                  <Table.Cell colSpan={4} className="bg-[#FDFCFA] ">
                    <button
                      className={`w-full py-1.5 flex items-center justify-center text-[#388aeb] ] disabled:text-[#adb1bd] disabled:font-medium   `}
                      onClick={addBlankBot}
                      disabled={
                        organization !== null && orgRole === "org:viewer"
                      }
                    >
                      + Add new blank Bot
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
              <CustomButton
                onClick={handleSave}
                color="blue"
                variant="solid"
                disabled={organization !== null && orgRole === "org:viewer"}
                isPrimary
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
            if (selectedBot) {
              deleteBot(selectedBot.id, botLists);
              setIsDeleteModal(false);
            }
          }}
          description={`Are you sure you want to delete the ${selectedBot?.name} Bot? This will also delete all associated Suites, Environments, and Tests.This action can not be undone.`}
          isDeleteModal={isDeleteModal}
          setIsDeleteModal={setIsDeleteModal}
          title={`Delete ${selectedBot?.name} Bot`}
        />
      )}
    </Dialog.Root>
  );
};

export default ModifyBot;
