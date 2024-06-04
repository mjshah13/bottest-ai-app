"use client";

import { TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import LoadingSpin from "react-loading-spin";

type InputType = "text" | "password" | "email" | "number";
type ResponsiveSize = "1" | "2" | "3";
interface InputProps {
  type?: InputType;
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  size?: ResponsiveSize;
  className?: any;
  disabled?: boolean;
  value?: string;
  name?: string;
  isLoader?: boolean;
}

const CustomInput: React.FC<InputProps> = ({
  type = "text",
  label,
  placeholder,
  onChange,
  size = "2",
  className,
  disabled,
  value,
  name,
  isLoader = false,
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
        className={`${className && className} font-poppin  `}
        size={size}
        type={type === "password" ? inputType : type}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        name={name}
      >
        <TextField.Slot className="font-poppins "></TextField.Slot>
        {isLoader && (
          <div className="flex items-center pr-1">
            <LoadingSpin
              size="19px"
              primaryColor="#388aeb"
              secondaryColor="#dde4ee"
              width={"3px"}
            />
          </div>
        )}
      </TextField.Root>
    </div>
  );
};

export default CustomInput;
