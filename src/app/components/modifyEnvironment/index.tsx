import { Dialog, Flex, Table } from "@radix-ui/themes";
import React, { useContext, useEffect, useState } from "react";
import CustomButton from "../../../elements/button";
import {
  EnvironmentModalType,
  EnvironmentType,
  GlobalStateType,
  Option,
} from "../../../utils/typesInterface";
import { Trash, CircleAlert } from "lucide-react";
import useAddEnvironment from "../../../hooks/useAddEnvironment";
import useUpdateEnvironment from "../../../hooks/useUpdateEnvironment";
import { useApi } from "../../../hooks/useApi";
import { GlobalStateContext } from "../../../globalState";
import { v4 as uuidv4 } from "uuid";

interface ModalProps {
  title?: string;
  selectedBot?: Option | null;
  isEnvironmentModalOpen?: boolean;
  setIsEnvironmentModalOpen: (isEnvironmentModalopen: boolean) => void;
}

const ModifyEnvironment: React.FC<ModalProps> = ({
  title,
  selectedBot,
  isEnvironmentModalOpen,
  setIsEnvironmentModalOpen,
}: ModalProps) => {
  const { environmentLists, deleteEnvironmentRow } = useContext(
    GlobalStateContext
  ) as GlobalStateType;

  const { addEnvironment } = useAddEnvironment();
  const { updateEnvironment } = useUpdateEnvironment();
  const { request } = useApi();
  const [environmentData, setEnvironmentData] = useState<
    EnvironmentModalType[]
  >([]);

  useEffect(
    () =>
      setEnvironmentData(
        environmentLists?.map((bot: EnvironmentType) => ({
          id: bot.id,
          name: bot.name,
          url: bot.url,
        }))
      ),
    [environmentLists]
  );

  const handleDiscard = () => {
    setEnvironmentData([]);
    setIsEnvironmentModalOpen(false);
  };

  // const environmentColumns: TableColumnsType<EnvironmentModalType> = [
  //   { title: "Name", dataIndex: "name", key: "name" },
  //   { title: "URL", dataIndex: "url", key: "url" },
  //   {
  //     dataIndex: "",
  //     key: "x",
  //     render: (record) => (
  //       <div className="flex justify-center items-center gap-3">
  //         <button onClick={() => deleteEnvironment(record?.id)}>
  //           <Trash color="#E1654A" size={18} />
  //         </button>
  //       </div>
  //     ),
  //   },
  // ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: React.Key
  ) => {
    const value = e.target.value;
    setEnvironmentData(
      (prevData) =>
        prevData &&
        prevData.map((environment) =>
          environment.id === id
            ? {
                ...environment,
                name: value,
                isEdit: environment?.isNew ? false : true,
              }
            : environment
        )
    );
  };

  const addBlankEnvironment = () => {
    const newEnvironment = {
      id: uuidv4(),
      name: "",
      info: "",
      description: "",
      isNew: true,
    };
    setEnvironmentData([...environmentData, newEnvironment]);
  };

  const deleteEnvironment = async (environmentId: string) => {
    try {
      const data = await request({
        url: `/v1/environments/${environmentId}`,
        method: "DELETE",
      });

      deleteEnvironmentRow(environmentId, environmentLists);
    } catch (error: any) {
      console.error({ error });
    }
  };

  const handleSave = () => {
    const filteredEnvironment = environmentData?.filter(
      (environment) => environment?.isEdit
    );
    if (filteredEnvironment) {
      filteredEnvironment?.map((item) => {
        updateEnvironment(
          item?.id as string,
          item?.name as string,
          environmentLists
        );
      });
    }
    const filteredNewEnvironment = environmentData?.filter(
      (environment) => environment?.isNew
    );
    if (filteredNewEnvironment) {
      filteredNewEnvironment?.map((item) => {
        addEnvironment(
          item?.name as string,
          selectedBot?.id as string,
          environmentLists
        );
      });
    }
  };

  return (
    <Dialog.Root
      open={isEnvironmentModalOpen}
      onOpenChange={setIsEnvironmentModalOpen}
    >
      <Dialog.Content maxWidth={"860px"}>
        <Dialog.Title>
          <div className="border-b border-[#f5f5f5] py-5 px-6 ">
            <p className="font-poppin text-black ">{title}</p>
          </div>
        </Dialog.Title>
        <div>
          <>
            <div className="px-5 pt-4 pb-7">
              <div className="border border-warning bg-warningLight px-4 py-3 rounded-lg mb-5 flex gap-2">
                <div>
                  <CircleAlert fill="#E7C200" color="white" />
                </div>
                <div className="flex flex-col ">
                  <h1 className="text-black text-normal font-poppin">Note</h1>
                  <p className="text-black text-sm font-poppin w-[80%]">
                    The UI of a different environment should match the UI of
                    original recorded tests. Attempting to run tests on
                    environments where the UI does not match may result in tests
                    failing due to inability to replay or capture data
                    correctly!
                  </p>
                </div>
              </div>

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
                      style={{ width: "500px" }}
                      className="border-r border-[#d2cdcd]"
                    >
                      Url
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {environmentData.map((environment) => (
                    <Table.Row key={environment.id}>
                      <Table.Cell className="border-r border-[#d2cdcd]">
                        {" "}
                        <input
                          className=" py-2  w-[90%] outline-none  "
                          type="text"
                          value={`${environment.name}` || ""}
                          onChange={(e) => handleChange(e, environment?.id)}
                        />
                      </Table.Cell>
                      <Table.Cell className="border-r border-[#d2cdcd]">
                        <div className="flex items-center h-full">
                          {environment.url}
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center justify-center gap-1.2 h-full">
                          <button
                            className=""
                            onClick={() => deleteEnvironment(environment.id)}
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
                        style={{ fontFamily: "poppins" }}
                        className="w-full py-1.5 flex items-center justify-center text-[#388aeb] "
                        onClick={addBlankEnvironment}
                      >
                        + Add new blank Bot
                      </button>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table.Root>

              {/* <Table
                bordered
                pagination={false}
                columns={environmentColumns}
                dataSource={
                  environmentData?.map((environment) => ({
                    ...environment,
                    url: (
                      <a href={`${environment?.url}`} target="_blank">
                        {environment.url}
                      </a>
                    ),
                    name: (
                      <>
                        <input
                          className=" py-2 pl-2 w-full outline-none "
                          type="text"
                          value={`${environment.name}` || ""}
                          onChange={(e) => handleChange(e, environment?.id)}
                        />
                      </>
                    ),
                  })) || []
                }
                footer={() => (
                  <button
                    className="w-full text-[#388aeb]"
                    onClick={addBlankEnvironment}
                  >
                    + Add new environment
                  </button>
                )}
              /> */}
            </div>
          </>
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

export default ModifyEnvironment;
