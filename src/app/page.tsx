"use client";

import CustomButton from "@/Elements/Button";
import CustomSelect from "@/Elements/CustomSelect";
import CustomInput from "@/Elements/Input";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

// import Login from "./sign-in/[[...sign-up]]/page";

export default function Home({ children }: { children: any }) {
  // interface Item {
  //   id: number;
  //   value: string;
  //   label: string;
  // }

  // const [selectedValue, setSelectedValue] = useState("");
  // const [selectData, setselectData] = useState<Item[]>([
  //   {
  //     id: 1,
  //     value: "My first bot",
  //     label: "My first bot",
  //   },
  //   {
  //     id: 2,
  //     value: "My second bot",
  //     label: "My second bot",
  //   },
  //   {
  //     id: 3,
  //     value: "My third bot",
  //     label: "My third bot",
  //   },
  //   {
  //     id: 4,
  //     value: "My fourth bot",
  //     label: "My fourth bot",
  //   },
  // ]);

  // const handleSelect = (value: string) => {
  //   setSelectedValue(value);
  // };

  // const handleChange = (value: string) => {
  //   console.log(`selected ${value}`);
  // };

 

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
    <div className=" w-full h-screen flex justify-center items-center">
      {/* <CustomSelect
        Btntext="Add / Modify Bots"
        selectData={selectData}
        onClick={addBots}
        onChange={handleChange}
        onSelectChange={handleSelect}
      /> */}
      hello home
    </div>
  );
}
