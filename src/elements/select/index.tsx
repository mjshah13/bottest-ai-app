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
  isBorderless?: boolean;
  isNoLabel?: boolean;
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
  isBorderless = false,
  isNoLabel = false,
}) => {
  //f3f3f5
  return (
    <div className="flex flex-col justify-start">
      <label
        className={`font-poppin text-sm text-black dark:text-white mb-1 ${
          isNoLabel && "hidden"
        }`}
      >
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
          variant={isBorderless ? "ghost" : undefined}
          placeholder={placeholder}
          className={`font-poppin cursor-pointer text-black dark:text-white disabled:bg-[#f3f3f5] disabled:text-[#aeb1b6] disabled:cursor-not-allowed  ${
            isBorderless
              ? "text-intermediate  outline-none focus:none placeholder_color"
              : null
          } `}
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
