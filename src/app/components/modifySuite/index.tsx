import { Dialog, Flex, Table } from "@radix-ui/themes";
import React, { useContext, useEffect, useState } from "react";
import CustomButton from "../../../elements/button";
import {
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
import useDeleteSuite from "../../../hooks/useDeleteSuite";
import DeleteModal from "../deleteModal";
import { useAuth, useOrganization } from "@clerk/nextjs";

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
  const { suiteLists } = useContext(GlobalStateContext) as GlobalStateType;

  const { updateSuite } = useUpdateSuite();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [selectedSuite, setSelectedSuite] = useState<SuiteType | null>(null);
  const { addSuite } = useAddSuite();
  const { deleteSuite } = useDeleteSuite();
  const [suiteData, setSuiteData] = useState<SuiteType[]>([]);
  const { orgRole } = useAuth();
  const { organization } = useOrganization();

  useEffect(() => {
    setSuiteData(suiteLists);
  }, [suiteLists]);

  const handleDiscard = () => {
    setSuiteData([]);
    setIsSuiteModalOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: React.Key
  ) => {
    setSuiteData(
      (prevData) =>
        prevData &&
        prevData.map((suite) =>
          suite.id === id
            ? {
                ...suite,
                [e.target.name]: e.target.value,
                isEdit: suite?.isNew ? false : true,
              }
            : suite
        )
    );
  };

  const addBlankSuite = () => {
    const newSuite = {
      id: uuidv4(),
      name: "",
      isNew: true,
      default_success_criteria: "",
      default_variant_count: 1,
      default_iteration_count: 1,
    };
    setSuiteData([...suiteData, newSuite]);
  };

  // const deleteSuite = async (suiteId: string) => {
  //   try {
  //     const data = await request({
  //       url: `/v1/suites/${suiteId}`,
  //       method: "DELETE",
  //     });
  //     deleteSuiteRow(suiteId, suiteLists);
  //   } catch (error: any) {
  //     console.error({ error });
  //   }
  // };

  const handleSave = () => {
    const filteredSuite = suiteData?.filter((suite) => suite?.isEdit);
    if (filteredSuite) {
      filteredSuite?.map(({ id, isEdit, isNew, ...rest }) => {
        updateSuite(id as string, { ...rest }, suiteLists);
      });
    }
    const filteredNewSuite = suiteData?.filter((suite) => suite?.isNew);
    if (filteredNewSuite) {
      filteredNewSuite?.map(({ id, isEdit, isNew, ...rest }) => {
        if (!rest?.name) return;
        addSuite({ bot_id: selectedBot?.id, ...rest }, suiteLists);
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
                    style={{ width: "285px" }}
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
                    style={{ width: "155px" }}
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
                        name="name"
                        value={`${suite.name}` || ""}
                        onChange={(e) => handleChange(e, suite?.id)}
                        disabled={
                          organization !== null && orgRole === "org:viewer"
                        }
                      />
                    </Table.Cell>
                    <Table.Cell className="border-r border-[#d2cdcd] ">
                      <input
                        className=" py-2  w-[90%] outline-none  "
                        type="text"
                        name="default_success_criteria"
                        value={`${suite.default_success_criteria}` || ""}
                        onChange={(e) => handleChange(e, suite?.id)}
                        disabled={
                          organization !== null && orgRole === "org:viewer"
                        }
                      />
                    </Table.Cell>
                    <Table.Cell className="border-r border-[#d2cdcd]">
                      <input
                        className=" py-2  w-[90%] outline-none  "
                        type="number"
                        name="default_variant_count"
                        value={`${suite.default_variant_count}` || ""}
                        onChange={(e) => handleChange(e, suite?.id)}
                        disabled={
                          organization !== null && orgRole === "org:viewer"
                        }
                      />
                    </Table.Cell>
                    <Table.Cell className="border-r border-[#d2cdcd]">
                      <input
                        className=" py-2  w-[90%] outline-none  "
                        type="number"
                        name="default_iteration_count"
                        value={`${suite.default_iteration_count}` || ""}
                        onChange={(e) => handleChange(e, suite?.id)}
                        disabled={
                          organization !== null && orgRole === "org:viewer"
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center justify-center gap-1.2 h-full">
                        {/* <Tooltip.Provider>
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild> */}
                        <button
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
                            setSelectedSuite(suite);
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
                  <Table.Cell colSpan={5} className="bg-[#FDFCFA] ">
                    <button
                      className={`w-full py-1.5 flex items-center justify-center text-[#388aeb] ] disabled:text-[#adb1bd] disabled:font-medium   `}
                      disabled={
                        organization !== null && orgRole === "org:viewer"
                      }
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
            if (selectedSuite) {
              deleteSuite(selectedSuite?.id, suiteLists);
              setIsDeleteModal(false);
            }
          }}
          description={`Are you sure you want to delete the ${selectedSuite?.name} Suite?.This action can not be undone.`}
          isDeleteModal={isDeleteModal}
          setIsDeleteModal={setIsDeleteModal}
          title={`Delete ${selectedSuite?.name} Suite`}
        />
      )}
    </Dialog.Root>
  );
};

export default ModifySuite;
