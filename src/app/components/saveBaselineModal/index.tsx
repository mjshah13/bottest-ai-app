import { Dialog, Flex } from "@radix-ui/themes";
import React from "react";
import CustomButton from "../../../elements/button";

interface ModalProps {
  title?: string;
  isOpenSaveBaselineModal?: boolean;
  setisOpenSaveBaselineModal: (isOpenSaveBaselineModal: boolean) => void;
}

const SaveBaselineModal: React.FC<ModalProps> = ({
  title,
  isOpenSaveBaselineModal,
  setisOpenSaveBaselineModal,
}: ModalProps) => {
  return (
    <Dialog.Root
      open={isOpenSaveBaselineModal}
      onOpenChange={setisOpenSaveBaselineModal}
    >
      <Dialog.Content maxWidth={"480px"}>
        <Dialog.Title>
          <div className="border-b border-[#f5f5f5] py-5 px-6 ">
            <p className=" text-black ">{title}</p>
          </div>
        </Dialog.Title>

        <div className="px-6 pt-2 pb-7">
          <div className=" border border-warning bg-warningLight px-4 rounded-lg mb-5 flex items-center py-3.5 gap-3  ">
            <div className="flex flex-col ">
              <p className="text-black text-sm text-balance ">
                Note that adding large amounts of additional baselines may
                increase billing costs slightly.
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-black ">
              Saving this conversation as an additional baseline for “My third
              test” will cause all future runs of “My third test” to compare
              against this as a reference.
            </p>
          </div>
          <div className="mt-4">
            <label
              htmlFor="
            "
              className="text-md"
            >
              Name:
            </label>
            <input
              className="w-full border border-[#d9d9d9] py-1.5 rounded-lg mt-2 px-3"
              type="text
            "
            />
          </div>
        </div>

        <div className="border-t border-[#f5f5f5]">
          <Flex gap="3" py={"3"} px={"3"} justify="end">
            <Dialog.Close>
              <CustomButton onClick={() => {}} variant="outline" color="gray">
                Cancel
              </CustomButton>
            </Dialog.Close>
            <Dialog.Close>
              <CustomButton onClick={() => {}} color="blue" variant="solid">
                Save Baseline
              </CustomButton>
            </Dialog.Close>
          </Flex>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default SaveBaselineModal;
