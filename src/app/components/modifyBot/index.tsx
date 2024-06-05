import { Dialog, Flex, Table } from "@radix-ui/themes";
import React, { useContext, useEffect, useState } from "react";

import { CopyPlus, Trash } from "lucide-react";
import { BotType, GlobalStateType } from "../../../utils/typesInterface";
import useAddBot from "../../../hooks/useAddBot";
import useUpdateBot from "../../../hooks/useUpdateBot";
import { GlobalStateContext } from "../../../globalState";
import { v4 as uuidv4 } from "uuid";
import useDeleteBot from "../../../hooks/useDeleteBot";
import DeleteModal from "../deleteModal";
import { useAuth, useOrganization } from "@clerk/nextjs";
import useDuplicateBot from "../../../hooks/useDuplicateBot";
import * as Tooltip from "@radix-ui/react-tooltip";
import CustomButton from "../../../elements/button";

interface ModalProps {
  title?: string;
  isBotsModalOpen?: boolean;
  setIsBotsModalOpen: (isBotsModalopen: boolean) => void;
}

const ModifyBot: React.FC<ModalProps> = ({
  title,

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
  const { duplicateBot, isLoading: loading } = useDuplicateBot();
  const [botData, setBotData] = useState<BotType[]>([]);

  useEffect(() => {
    setBotData(
      botLists?.map((bot: BotType) => ({
        id: bot.id,
        name: bot.name,
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
      isNew: true,
      isDelete: false,
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
    const filteredDeleteBot = botData?.filter((bot) => bot?.isDelete);
    if (filteredDeleteBot) {
      filteredDeleteBot?.map((item) => {
        deleteBot(item.id, botLists);
      });
    }

    const filteredDuplicateBot = botData?.filter((bot) => bot?.isDuplicate);
    if (filteredDuplicateBot) {
      filteredDuplicateBot?.map((item) => {
        duplicateBot(item?.id, botLists);
      });
    }
  };

  const handleDeleteBot = (selectedBotId: string) => {
    setBotData(
      botData.map((bot) =>
        bot.id === selectedBotId ? { ...bot, isDelete: true } : bot
      )
    );
  };

  const handleCopyBot = (bot: BotType) => {
    const newBot = {
      id: bot?.id,
      name: `${bot?.name} Copy`,
      isNew: false,
      isDelete: false,
      isDuplicate: true,
    };
    setBotData([...botData, newBot]);
  };

  return (
    <Dialog.Root open={isBotsModalOpen} onOpenChange={setIsBotsModalOpen}>
      <Dialog.Content maxWidth={"870px"}>
        <Dialog.Title>
          <div className="border-b border-[#f5f5f5] dark:border-b  dark:border-[#434447] py-5 px-6 ">
            <p className="font-poppin text-black text-base font-semibold dark:text-white ">
              {title}
            </p>
          </div>
        </Dialog.Title>
        <div>
          <div className="px-5 pt-4 pb-7">
            <Table.Root variant="surface" size={"2"}>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell
                    style={{ width: "720px" }}
                    className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30] text-sm font-semibold"
                  >
                    Name
                  </Table.ColumnHeaderCell>

                  <Table.ColumnHeaderCell className="dark:bg-[#2a2d30]"></Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {botData
                  ?.filter((item) => !item?.isDelete)
                  .map((bot) => (
                    <Table.Row key={bot.id}>
                      <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                        {" "}
                        <input
                          placeholder="Enter name"
                          className=" py-2  w-full outline-none dark:bg-transparent"
                          type="text"
                          value={`${bot.name}` || ""}
                          onChange={(e) => handleChange(e, bot?.id)}
                          disabled={
                            organization !== null && orgRole === "org:viewer"
                          }
                        />
                      </Table.Cell>

                      <Table.Cell>
                        {bot?.isNew ||
                          (!bot?.isDuplicate && (
                            <div className="flex items-center justify-center gap-1.2 h-full">
                              <Tooltip.Provider skipDelayDuration={100}>
                                <Tooltip.Root delayDuration={100}>
                                  <Tooltip.Trigger asChild>
                                    <button
                                      onClick={() => handleCopyBot(bot)}
                                      disabled={
                                        (organization !== null &&
                                          orgRole === "org:viewer") ||
                                        loading
                                      }
                                      className="outline-none border-none bg-transparent hover:text-[#388aeb] disabled:hover:text-[#adb1bd] disabled:cursor-not-allowed"
                                    >
                                      <CopyPlus size={18} />
                                    </button>
                                  </Tooltip.Trigger>
                                  <Tooltip.Portal>
                                    <Tooltip.Content
                                      className="TooltipContent dark:bg-white dark:text-black"
                                      sideOffset={5}
                                    >
                                      Create a copy of Bot
                                      <Tooltip.Arrow className="TooltipArrow dark:fill-[#e4e5e5]" />
                                    </Tooltip.Content>
                                  </Tooltip.Portal>
                                </Tooltip.Root>
                              </Tooltip.Provider>

                              <Tooltip.Provider skipDelayDuration={100}>
                                <Tooltip.Root delayDuration={100}>
                                  <Tooltip.Trigger asChild>
                                    <button
                                      className=" ml-3 outline-none border-none bg-transparent  disabled:cursor-not-allowed"
                                      onClick={() => {
                                        setIsDeleteModal(true);
                                        setSelectedBot(bot);
                                      }}
                                      disabled={
                                        organization !== null &&
                                        orgRole === "org:viewer"
                                      }
                                    >
                                      <Trash color="#E1654A" size={18} />
                                    </button>
                                  </Tooltip.Trigger>
                                  <Tooltip.Portal>
                                    <Tooltip.Content
                                      className="TooltipContent dark:bg-white dark:text-black"
                                      sideOffset={5}
                                    >
                                      Delete Bot
                                      <Tooltip.Arrow className="TooltipArrow dark:fill-[#e4e5e5]" />
                                    </Tooltip.Content>
                                  </Tooltip.Portal>
                                </Tooltip.Root>
                              </Tooltip.Provider>
                            </div>
                          ))}
                      </Table.Cell>
                    </Table.Row>
                  ))}

                <Table.Row>
                  <Table.Cell
                    colSpan={4}
                    className="bg-[#FDFCFA] dark:bg-[#2a2d30] "
                  >
                    <button
                      className={`w-full py-1.5 flex items-center justify-center text-[#388aeb] ] disabled:text-[#adb1bd] disabled:font-medium disabled:cursor-not-allowed   `}
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

        <div className="border-t border-[#f5f5f5] dark:border-t  dark:border-[#434447]">
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
              handleDeleteBot(selectedBot?.id);
              setIsDeleteModal(false);
            }
          }}
          description={`Are you sure you want to delete the "${selectedBot?.name}" Bot? This will also delete all associated Suites, Environments, and Tests.This action can not be undone.`}
          isDeleteModal={isDeleteModal}
          setIsDeleteModal={setIsDeleteModal}
          title={`Delete "${selectedBot?.name}" Bot`}
        />
      )}
    </Dialog.Root>
  );
};

export default ModifyBot;
