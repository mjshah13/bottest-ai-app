import { Dialog, Flex } from "@radix-ui/themes";
import React from "react";
import CustomButton from "../../../elements/button";

interface ModalProps {
  title?: string;
  description?: string;
  isDeleteModal?: boolean;
  setIsDeleteModal: (isDeleteModal: boolean) => void;
  onClick?: () => void;
}

const DeleteModal: React.FC<ModalProps> = ({
  title,
  description,
  isDeleteModal,
  setIsDeleteModal,
  onClick,
}: ModalProps) => {
  return (
    <Dialog.Root open={isDeleteModal} onOpenChange={setIsDeleteModal}>
      <Dialog.Content maxWidth={"480px"}>
        <Dialog.Title>
          <div className="border-b border-[#f5f5f5] h-[56px] flex items-center px-5 ">
            <p className=" text-black text-base font-semibold">{title}</p>
          </div>
        </Dialog.Title>

        <div className="px-5 pt-2 pb-7">
          <p className="text-black font-normal text-sm ">{description}</p>
        </div>

        <div className="border-t border-[#f5f5f5]">
          <Flex gap="3" py={"3"} px={"3"} justify="end">
            <Dialog.Close>
              <CustomButton onClick={() => {}} variant="outline" color="gray">
                Cancel
              </CustomButton>
            </Dialog.Close>
            <Dialog.Close>
              <CustomButton
                onClick={onClick}
                variant="outline"
                color="red"
                isDanger
              >
                Yes, delete
              </CustomButton>
            </Dialog.Close>
          </Flex>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DeleteModal;
