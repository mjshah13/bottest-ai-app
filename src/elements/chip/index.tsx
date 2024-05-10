import * as React from "react";
import { Download, X } from "lucide-react";
import { useAuth, useOrganization } from "@clerk/nextjs";
import CustomButton from "../button";

interface Props {
  children?: React.ReactNode;
  isCancel?: boolean;
  onClick?: () => void;
  handleDelete?: () => void;
}

const Chip: React.FC<Props> = ({
  children,
  isCancel = false,
  onClick,
  handleDelete,
}) => {
  const { orgRole } = useAuth();
  const { organization } = useOrganization();

  return (
    <div className="flex gap-1.5 ">
      <CustomButton
        variant="outline"
        color="gray"
        onClick={onClick}
        // className="py-1.5 cursor-pointer border border-[#d9d9d9] flex items-center gap-2 px-3 justify-center rounded-md text-sm "
      >
        <Download size={16} />
        {children}
      </CustomButton>

      {isCancel && (
        <button
          className="outline-none border-none cursor-pointer disabled:cursor-not-allowed"
          onClick={handleDelete}
          disabled={organization !== null && orgRole === "org:viewer"}
        >
          <X size={16} color="red" />
        </button>
      )}
    </div>
  );
};

export default Chip;
