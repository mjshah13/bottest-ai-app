"use client";

import React from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";

interface Item {
  id: number;
  value: string;
  label: string;
}

interface CustomSelectProps {
  onChange?: (value: string) => void;
  onSelectChange?: (value: string) => void;
  onClick?: () => void;
  selectData?: Item[];
  Btntext?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  onSelectChange,
  onClick,
  selectData,
  onChange,
  Btntext,
}) => {
  const { Option } = Select;

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
        onSelect={onSelectChange}
        onChange={onChange}
        placeholder=""
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
        {selectData?.map((task) => (
          <Option key={task.id} value={task.value} label={task.label}>
            <span>{task.label}</span>
          </Option>
        ))}
      </Select>
    </>
  );
};

export default CustomSelect;
