import React from "react";
import { Inbox } from "lucide-react";

interface Props {}

const NoData: React.FC<Props> = ({}: Props) => {
  return (
    <div
      className="border border-[#edefed] min-h-[140px] max-h-full rounded flex flex-col  justify-center"
      style={{ boxShadow: "2px 1px 4px 0px rgba(62, 65, 67, 0.08)" }}
    >
      <div className="flex flex-col w-full h-full items-center justify-center">
        <Inbox color="#388aeb" size={45} />
        <p className="text-lg font-normal text-black">No data </p>
      </div>
    </div>
  );
};

export default NoData;
