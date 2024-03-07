"use client";

import React, { useState } from "react";
import { DeleteOutlined, CheckOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";

interface Item {
  id: number;
  value: string;
  label: string;
}

interface CustomSelectProps {
  onChange?: (value: string) => void;
  onSelectChange?: (value: string) => void;
  onDeleteOption?: (value: string) => void;
  onClick?: () => void;
  selectData?: Item[];
  setselectData?: (selectData: Item[]) => void;
  selectedValue?: string;
  setSelectedValue?: (selectedValue: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  onSelectChange,
  onDeleteOption,
  onClick,
  selectData,
  setselectData,
  selectedValue,
  onChange,
}) => {
  const { Option } = Select;

  // const deleteOption = (value: string) => {
  //   setItems(items.filter((item) => item.value !== value));
  //   console.log("deleted", value);
  // };

  return (
    <>
      <Select
        optionLabelProp="label"
        style={{
          width: 210,
        }}
        onSelect={onSelectChange}
        onChange={onChange}
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
                  <PlusOutlined style={{ fontSize: "12px", fontWeight: 900 }} />
                }
                onClick={onClick}
              >
                Add New
              </Button>
            </div>
          </>
        )}
      >
        {selectData?.map((task) => (
          <Option key={task.id} value={task.value} label={task.label}>
            <span>{task.label}</span>
            <span style={{ float: "right" }}>
              {selectedValue === task.value && (
                <CheckOutlined
                  style={{ color: "#388AEB", marginRight: "4px" }}
                />
              )}

              <DeleteOutlined
                style={{ color: "#E1654A" }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteOption(task.value);
                }}
              />
            </span>
          </Option>
        ))}
      </Select>
    </>
  );
};

export default CustomSelect;
