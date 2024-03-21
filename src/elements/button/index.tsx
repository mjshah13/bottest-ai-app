import React, { Children } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";

type Props = {
    type?: "link" | "text" | "default" | "primary" | "dashed" | undefined;
    children?: string;
    icon?: React.ReactNode;

};

const CustomButton = ({type , children , icon}: Props) => {
  return (
    <>
        <Button type={type}  icon={icon}>
        {children}
      </Button>
     
      
    </>
  );
};

export default CustomButton;
