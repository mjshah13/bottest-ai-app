"use client";

import { Button, Select } from "@radix-ui/themes";
import * as React from "react";
import { Option } from "../../utils/typesInterface";
import { Settings } from "lucide-react";
import CustomButton from "../button";

interface CustomSelectProps {
  onSelectChange?: (selectedOption: Option) => void;
  onClick?: () => void;
  options?: Option[];
  Btntext?: string;
  disabled?: boolean;
  selectedValue?: Option | null;
  Label?: string;
  placeholder?: string;
  isAddedBtn?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  onSelectChange,
  onClick,
  options,
  Btntext,
  disabled,
  selectedValue,
  Label,
  placeholder,
  isAddedBtn = true,
}) => {
  //f3f3f5
  return (
    <div className="flex flex-col justify-start gap-1">
      <label className="font-poppin text-sm text-black dark:text-white">
        {Label}
      </label>
      <Select.Root
        key={selectedValue?.id}
        disabled={disabled}
        value={selectedValue?.id || ""}
        onValueChange={(newValue) => {
          const selectedOption = options?.find(
            (option) => option?.id === newValue
          );
          if (selectedOption && onSelectChange) {
            onSelectChange(selectedOption);
          }
        }}
      >
        <Select.Trigger
          placeholder={placeholder}
          className="font-poppin cursor-pointer text-black dark:text-white disabled:bg-[#f3f3f5] disabled:text-[#aeb1b6] disabled:cursor-not-allowed "
        >
          {selectedValue?.name}
        </Select.Trigger>
        <Select.Content
          position="popper"
          className="font-poppin bg-white dark:bg-black "
        >
          {options?.map((option) => (
            <Select.Item
              className={`
              font-poppin cursor-pointer text-black dark:text-white dark:bg-black 
                ${
                  option.id === selectedValue?.id
                    ? "bg-primary text-black font-semibold dark:bg-secondary dark:text-white"
                    : "bg-white  text-black px-1.5 "
                } mb-1.5 hover:bg-primary hover:text-black dark:hover:bg-secondary dark:hover:text-white `}
              key={option.id}
              value={option.id || ""}
            >
              {option.name}
            </Select.Item>
          ))}
          {isAddedBtn && (
            <CustomButton
              isWidth={true}
              color="gray"
              variant="surface"
              // className="w-full text-black font-poppin"
              onClick={onClick}
            >
              <Settings size={17} />
              {Btntext}
            </CustomButton>
          )}
        </Select.Content>
      </Select.Root>
    </div>
  );
};

export default CustomSelect;
