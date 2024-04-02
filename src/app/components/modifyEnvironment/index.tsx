import { Dialog, Flex } from "@radix-ui/themes";
import React, { useState } from "react";
import { Table, TableColumnsType } from "antd";
import CustomButton from "../../../elements/button";
import { EnvironmentModalType } from "../../../utils/typesInterface";
import { Trash, CircleAlert } from "lucide-react";
import { useApi } from "../../../hooks/useApi";

interface ModalProps {
  title?: string;
  handleDiscard?: () => void;
  // handleSave?: () => void;
  isEnvironmentModalopen?: boolean;
  setIsEnvironmentModalopen?: (isEnvironmentModalopen: boolean) => void;
  environmentModaldata?: EnvironmentModalType[];
  handleAddBlankRow?: () => void;
  setEnvironmentModaldata: React.Dispatch<
    React.SetStateAction<EnvironmentModalType[]>
  >;
}

const ModifyEnvironment: React.FC<ModalProps> = ({
  title,
  handleDiscard,
  // handleSave,
  // isOpen,
  // setIsOpen,
  isEnvironmentModalopen,
  setIsEnvironmentModalopen,
  environmentModaldata,
  handleAddBlankRow,
  setEnvironmentModaldata,
}: ModalProps) => {
  const { request } = useApi();

  const environmentColumns: TableColumnsType<EnvironmentModalType> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "URL", dataIndex: "url", key: "url" },
    {
      dataIndex: "",
      key: "x",
      render: () => (
        <div className="flex justify-center items-center gap-3">
          <button>
            <Trash color="#E1654A" size={18} />
          </button>
        </div>
      ),
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: React.Key
  ) => {
    const value = e.target.value;
    setEnvironmentModaldata((prevData) =>
      prevData.map((environment) =>
        environment.id === id
          ? { ...environment, name: value, isEdit: true }
          : environment
      )
    );
  };

  const updateEnvironment = async (environmentID: string, name: string) => {
    try {
      const data = await request({
        url: `/v1/environments/${environmentID}`,
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
    const filteredEnvironment = environmentModaldata?.filter(
      (environment) => environment?.isEdit
    );
    if (filteredEnvironment) {
      filteredEnvironment?.map((item) => {
        updateEnvironment(item?.id as string, item?.name as string);
      });

      // setIsEnvironmentModalopen?.(false);
    }
  };

  return (
    <Dialog.Root
      open={isEnvironmentModalopen}
      onOpenChange={setIsEnvironmentModalopen}
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

              <Table
                bordered
                pagination={false}
                columns={environmentColumns}
                dataSource={
                  environmentModaldata?.map((environment) => ({
                    ...environment,
                    url: (
                      <a href={`${environment?.url}`} target="_blank">
                        {environment.url}
                      </a>
                    ),
                    name: (
                      <>
                        <input
                          className=" py-2 pl-2 w-full "
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
                    onClick={handleAddBlankRow}
                  >
                    + Add new environment
                  </button>
                )}
              />
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
