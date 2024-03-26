import { Button, Dialog, Flex } from "@radix-ui/themes";
import React, { useState } from "react";
import CustomButton from "../button";

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  handleDiscard?: () => void;
  handleSave?: () => void;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

const CustomModal: React.FC<ModalProps> = ({
  title,
  children,
  handleDiscard,
  handleSave,
  isOpen,
  setIsOpen,
}: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content maxWidth={"860px"}>
        <Dialog.Title>
          <div className="border-b border-[#f5f5f5] py-5 px-6 ">
            <p className="font-poppin text-black ">{title}</p>
          </div>
        </Dialog.Title>
        <div>{children}</div>

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

export default CustomModal;
