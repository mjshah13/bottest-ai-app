"use client";

import React from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import { Option } from "@/utils/Interface";

interface CustomSelectProps {
  onChange?: (value: string) => void;
  onSelectChange?: (selectedOption: Option) => void;
  onClick?: () => void;
  options?: Option[];
  Btntext?: string;
  disabled?: boolean;
  selectedValue?: string;
  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  onSelectChange,
  onClick,
  options,
  onChange,
  Btntext,
  disabled,
  selectedValue,
  placeholder,
}) => {
  const { Option } = Select;

  const handleSelectChange = (selectedValue: string) => {
    if (onSelectChange && options) {
      const selectedOption = options.find(
        (item) => item.name === selectedValue
      );
      if (selectedOption) {
        onSelectChange(selectedOption);
      }
    }
  };

  // const addBots = () => {
  //   const newSelectData = {
  //     id: selectData.length + 1,
  //     value: `new${selectData.length + 1}`,
  //     label: `New Option ${selectData.length + 1}`,
  //   };
  //   setselectData([...selectData, newSelectData]);
  //   setSelectedValue(newSelectData.value);
  // };

  return (
    <>
      <Select
        className="w-full h-[35px]"
        onSelect={handleSelectChange}
        onChange={onChange}
        value={selectedValue}
        placeholder={placeholder}
        disabled={disabled}
        dropdownRender={(menu) => (
          <>
            {menu}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "8px",
              }}
            >
              <Button
                className="w-full border border-[#F0F0F0] hover:bg-transparent font-semibold !important"
                type="text"
                icon={
                  <SettingOutlined
                    style={{ fontSize: "12px", fontWeight: 900 }}
                  />
                }
                onClick={onClick}
              >
                {Btntext}
              </Button>
            </div>
          </>
        )}
      >
        {options?.map((option) => (
          <Option key={option.id} value={option.name} label={option.name}>
            <span>{option?.name}</span>
          </Option>
        ))}
      </Select>
    </>
  );
};

export default CustomSelect;
