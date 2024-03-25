"use client";

import { Button, Select } from "@radix-ui/themes";
import * as React from "react";
import { Option } from "../../utils/typesInterface";
import { Settings } from "lucide-react";

interface CustomSelectProps {
  onSelectChange?: (selectedOption: Option) => void;
  onClick?: () => void;
  options?: Option[];
  Btntext?: string;
  disabled?: boolean;
  selectedValue?: string;
  Label?: string;
  placeholder?: string;
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
}) => {
  return (
    <div className="flex flex-col justify-start gap-1">
      <label className="font-poppin text-sm font-normal text-black">
        {Label}
      </label>
      <Select.Root
        disabled={disabled}
        value={selectedValue}
        onValueChange={(newValue) => {
          const selectedOption = options?.find(
            (option) => option?.name === newValue
          );
          if (selectedOption && onSelectChange) {
            onSelectChange(selectedOption);
          }
        }}
      >
        <Select.Trigger placeholder={placeholder}>
          {selectedValue}
        </Select.Trigger>
        <Select.Content position="popper">
          {options?.map((option) => (
            <Select.Item
              className={`${
                option.name === selectedValue
                  ? "bg-primary text-black font-semibold "
                  : "bg-white text-black px-1.5"
              } mb-1.5 hover:bg-primary hover:text-black  font-poppin`}
              key={option.id}
              value={option.name}
            >
              {option.name}
            </Select.Item>
          ))}
          <Button
            color="gray"
            variant="surface"
            className="w-full py-2.5 text-black bg-transparent cursor-pointer  !important"
            onClick={onClick}
          >
            <Settings />
            {Btntext}
          </Button>
        </Select.Content>
      </Select.Root>
    </div>
  );
};

export default CustomSelect;
