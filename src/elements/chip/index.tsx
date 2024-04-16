import * as React from "react";
import { Download, X } from "lucide-react";

interface Props {
  children?: React.ReactNode;
  isCancel?: boolean;
}

const Chip: React.FC<Props> = ({ children, isCancel = false }) => {
  return (
    <div className="flex gap-2 ">
      <div className="py-1.5 border border-[#d9d9d9] flex items-center gap-2 px-3 justify-center rounded-md ">
        <Download size={19} />
        {children}
      </div>
      {isCancel && (
        <button className="outline-none border-none">
          <X size={19} color="red" />
        </button>
      )}
    </div>
  );
};

export default Chip;
