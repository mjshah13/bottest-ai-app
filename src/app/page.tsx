"use client";

import CustomButton from "@/Elements/Button";
import CustomSelect from "@/Elements/CustomSelect";
import CustomInput from "@/Elements/Input";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function Home({ children }: { children: any }) {
  interface Item {
    id: number;
    value: string;
    label: string;
  }

  const [selectedValue, setSelectedValue] = useState("");
  const [selectData, setselectData] = useState<Item[]>([
    {
      id: 1,
      value: "My first bot",
      label: "My first bot",
    },
    {
      id: 2,
      value: "My second bot",
      label: "My second bot",
    },
    {
      id: 3,
      value: "My third bot",
      label: "My third bot",
    },
    {
      id: 4,
      value: "My fourth bot",
      label: "My fourth bot",
    },
  ]);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const deleteOption = (value: string) => {
    if (setselectData && selectData) {
      setselectData(selectData.filter((item) => item.value !== value));
      console.log("deleted", value);
    }
  };

    const addItem = () => {
    const newSelectData = {
      id: selectData.length + 1,
      value: `new${selectData.length + 1}`,
      label: `New Option ${selectData.length + 1}`
    };
    setselectData([...selectData, newSelectData]);
    setSelectedValue(newSelectData.value);
  };

  return (
    
      <div>
        <div className="w-1/5 border border-danger">
        <CustomSelect
          onSelectChange={handleSelect}
     selectData={selectData}
         setselectData={setselectData}
    selectedValue={selectedValue}
       setSelectedValue={setSelectedValue}
          onChange={handleChange}
         onDeleteOption={deleteOption}
       onClick={addItem}
     />
          
        </div>
         


      </div>


      
   
    // <>
    //   <div className="p-10 w-[300px]">
    //     <h1>Display Component</h1>
    //     {/* <CustomButton icon={<SearchOutlined/>}  type="primary">
    //   Search
    //  </CustomButton> */}
    //     {/* <CustomInput label="Password" placeholder="Enter Your Password" type="password" />
    //  <CustomInput label="Email" placeholder="Enter Your Email" type="email" />
    //  <CustomInput label="Phone Number" placeholder="Enter Your Number" type="number" /> */}
    //     {/* <CustomSelect
    //       onSelectChange={handleSelect}
    //       selectData={selectData}
    //       setselectData={setselectData}
    //       selectedValue={selectedValue}
    //       setSelectedValue={setSelectedValue}
    //       onChange={handleChange}
    //       onDeleteOption={deleteOption}
    //       onClick={addItem}
    //     /> */}
    //   </div>

    // </>
  );
}
