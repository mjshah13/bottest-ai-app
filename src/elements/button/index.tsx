import React from "react";
import { Button } from "antd";

type Props = {
    type?: "link" | "text" | "default" | "primary" | "dashed" | undefined;
    children?: string;
    svgIcon?: React.ReactNode;

};

const CustomButton = ({type , children  , svgIcon}: Props) => {
  return (
    <>
        <Button className="flex items-center gap-2" type={type}>
        {svgIcon && <>{svgIcon}</>}
        {children}
      </Button>
     
      
    </>
  );
};

export default CustomButton;
