"use client";

import { TextField } from "@radix-ui/themes";
import React, { useState } from "react";

type InputType = "text" | "password" | "email" | "number";
type ResponsiveSize = "1" | "2" | "3";
interface InputProps {
  type?: InputType;
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  size?: ResponsiveSize;
  className?: any;
}

const CustomInput: React.FC<InputProps> = ({
  type = "text",
  label,
  placeholder,
  onChange,
  size = "2",
  className,
}) => {
  const [inputType, setInputType] = useState<InputType>(type);

  return (
    <div>
      {label && (
        <label className="block font-poppins text-sm font-normal mb-2 ">
          {label}
        </label>
      )}
      <TextField.Root
        className={className}
        size={size}
        type={type === "password" ? inputType : type}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
      >
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
    </div>
  );
};

export default CustomInput;
