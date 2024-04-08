import { Dialog, Flex } from "@radix-ui/themes";
import React, { useContext } from "react";
import CustomButton from "../../../elements/button";

interface ModalProps {
  title?: string;
  isCustomizeTestModal?: boolean;
  setIsCustomizeTestModal: (isCustomizeTestModa: boolean) => void;
}

const CustomizeTest: React.FC<ModalProps> = ({
  title,
  isCustomizeTestModal,
  setIsCustomizeTestModal,
}: ModalProps) => {
  return (
    <Dialog.Root
      open={isCustomizeTestModal}
      onOpenChange={setIsCustomizeTestModal}
    >
      <Dialog.Content maxWidth={"860px"}>
        <Dialog.Title>
          <div className="border-b border-[#f5f5f5] py-5 px-6 ">
            <p className="font-poppin text-black ">{title}</p>
          </div>
        </Dialog.Title>
        <div>
          <div className="px-5 pt-4 pb-7">hello</div>
        </div>

        <div className="border-t border-[#f5f5f5]">
          <Flex gap="3" py={"3"} px={"3"} justify="end">
            <Dialog.Close>
              <CustomButton onClick={() => {}} variant="outline" color="gray">
                Discard
              </CustomButton>
            </Dialog.Close>
            <Dialog.Close>
              <CustomButton onClick={() => {}} color="blue" variant="solid">
                Save changes
              </CustomButton>
            </Dialog.Close>
          </Flex>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CustomizeTest;
