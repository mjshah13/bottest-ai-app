import { Dialog, Flex, Table } from "@radix-ui/themes";
import React, { useContext, useEffect, useState } from "react";
import CustomButton from "../../../elements/button";
import {
  GlobalStateType,
  Option,
  SuiteType,
} from "../../../utils/typesInterface";
import { CopyPlus, Trash } from "lucide-react";
import useUpdateSuite from "../../../hooks/useUpdateSuite";
import useAddSuite from "../../../hooks/useAddSuite";
import { GlobalStateContext } from "../../../globalState";
import { v4 as uuidv4 } from "uuid";
import useDeleteSuite from "../../../hooks/useDeleteSuite";
import DeleteModal from "../deleteModal";
import { useAuth, useOrganization } from "@clerk/nextjs";
import * as Tooltip from "@radix-ui/react-tooltip";
import useDuplicateSuite from "../../../hooks/useDuplicateSuite";

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
  const { duplicateSuite, isLoading: loading } = useDuplicateSuite();
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
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
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
      // isDelete: false,
      default_success_criteria: "",
      default_variant_count: 1,
      default_iteration_count: 1,
    };
    setSuiteData([...suiteData, newSuite]);
  };

  const handleSave = () => {
    const filteredSuite = suiteData?.filter((suite) => suite?.isEdit);
    if (filteredSuite) {
      filteredSuite?.map(({ id, isEdit, isNew, ...rest }) => {
        updateSuite(id, { ...rest }, suiteLists);
      });
    }
    const filteredNewSuite = suiteData?.filter((suite) => suite?.isNew);
    if (filteredNewSuite) {
      filteredNewSuite?.map(({ id, isEdit, isNew, isDuplicate, ...rest }) => {
        if (!rest?.name) return;
        addSuite({ bot_id: selectedBot?.id, ...rest }, suiteLists);
      });
    }

    const filteredDeleteSuite = suiteData?.filter((suite) => suite?.isDelete);
    if (filteredDeleteSuite) {
      filteredDeleteSuite?.map((suite) => {
        deleteSuite(suite?.id, suiteLists);
      });
    }
    const filteredDuplicateSuite = suiteData?.filter(
      (suite) => suite?.isDuplicate
    );
    if (filteredDuplicateSuite) {
      filteredDuplicateSuite?.map((item) => {
        duplicateSuite(item?.id, suiteLists);
      });
    }
  };

  const handleDeleteSuite = (selectedSuiteId: string) => {
    setSuiteData(
      suiteData.map((suite) =>
        suite.id === selectedSuiteId ? { ...suite, isDelete: true } : suite
      )
    );
  };

  const handleCopySuite = (suite: SuiteType) => {
    const newSuite = {
      id: `${suite?.id}`,
      name: `${suite?.name} Copy`,
      isNew: false,
      isDelete: false,
      isDuplicate: true,
      default_success_criteria: `${suite?.default_success_criteria} Copy`,
      default_variant_count: 1,
      default_iteration_count: 1,
    };
    setSuiteData([...suiteData, newSuite]);
  };

  return (
    <Dialog.Root open={isSuiteModalOpen} onOpenChange={setIsSuiteModalOpen}>
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
                    style={{ width: "180px" }}
                    className="border-r border-[#d2cdcd] text-sm font-semibold dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30]"
                  >
                    Name
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell
                    style={{ width: "285px" }}
                    className="border-r border-[#d2cdcd] text-sm font-semibold dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30]"
                  >
                    Default Success Criteria
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell
                    style={{ width: "150px" }}
                    className="border-r border-[#d2cdcd] text-sm font-semibold dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30]"
                  >
                    Default Variants
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell
                    style={{ width: "155px" }}
                    className="border-r border-[#d2cdcd] text-sm font-semibold dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30]"
                  >
                    Default Iterations
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className="dark:border-r dark:border-[#373a3b] dark:bg-[#2a2d30]"></Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {suiteData
                  ?.filter((suite) => !suite?.isDelete)
                  .map((suite) => (
                    <Table.Row key={suite.id}>
                      <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                        {" "}
                        <input
                          placeholder="Enter name"
                          className=" py-2 w-[90%] outline-none dark:bg-transparent "
                          type="text"
                          name="name"
                          value={`${suite.name}` || ""}
                          onChange={(e) => handleChange(e, suite?.id)}
                          disabled={
                            organization !== null && orgRole === "org:viewer"
                          }
                        />
                      </Table.Cell>
                      <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b] ">
                        <textarea
                          placeholder="Enter success criteria"
                          className=" w-[100%] h-full outline-none resize-none dark:bg-transparent"
                          // type="text"
                          name="default_success_criteria"
                          value={`${suite.default_success_criteria}` || ""}
                          onChange={(e) => handleChange(e, suite?.id)}
                          disabled={
                            organization !== null && orgRole === "org:viewer"
                          }
                        />
                      </Table.Cell>
                      <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                        <input
                          placeholder="Enter variant count"
                          className=" py-2  w-[90%] outline-none dark:bg-transparent "
                          type="number"
                          name="default_variant_count"
                          value={`${suite.default_variant_count}` || ""}
                          onChange={(e) => handleChange(e, suite?.id)}
                          disabled={
                            organization !== null && orgRole === "org:viewer"
                          }
                        />
                      </Table.Cell>
                      <Table.Cell className="border-r border-[#d2cdcd] dark:border-r dark:border-[#373a3b]">
                        <input
                          className=" py-2  w-[90%] outline-none dark:bg-transparent "
                          type="number"
                          placeholder="Enter iteration count"
                          name="default_iteration_count"
                          value={`${suite.default_iteration_count}` || ""}
                          onChange={(e) => handleChange(e, suite?.id)}
                          disabled={
                            organization !== null && orgRole === "org:viewer"
                          }
                        />
                      </Table.Cell>
                      <Table.Cell>
                        {suite.isNew ||
                          (!suite?.isDuplicate && (
                            <div className="flex items-center justify-center gap-1.2 h-full">
                              <Tooltip.Provider skipDelayDuration={100}>
                                <Tooltip.Root delayDuration={100}>
                                  <Tooltip.Trigger asChild>
                                    <button
                                      onClick={() => handleCopySuite(suite)}
                                      // onClick={() => duplicateSuite(suite?.id, suiteLists)}
                                      disabled={
                                        organization !== null &&
                                        orgRole === "org:viewer"
                                        // loading
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
                                      Create a copy of Suite
                                      <Tooltip.Arrow className="TooltipArrow dark:fill-[#e4e5e5]" />
                                    </Tooltip.Content>
                                  </Tooltip.Portal>
                                </Tooltip.Root>
                              </Tooltip.Provider>

                              <Tooltip.Provider skipDelayDuration={100}>
                                <Tooltip.Root delayDuration={100}>
                                  <Tooltip.Trigger asChild>
                                    <button
                                      className=" ml-3 outline-none border-none bg-transparent  disabled:hover:text-[#adb1bd] disabled:cursor-not-allowed "
                                      onClick={() => {
                                        setIsDeleteModal(true);
                                        setSelectedSuite(suite);
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
                                      Delete Suite
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
                    colSpan={5}
                    className="bg-[#FDFCFA] dark:bg-[#2a2d30] "
                  >
                    <button
                      className={`w-full py-1.5 flex items-center justify-center text-[#388aeb] ] disabled:text-[#adb1bd] disabled:font-medium disabled:cursor-not-allowed `}
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
            if (selectedSuite) {
              handleDeleteSuite(selectedSuite?.id);
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
