"use client";

import CustomButton from "@/Elements/Button";
import CustomSelect from "@/Elements/CustomSelect";
import CustomInput from "@/Elements/Input";
import { SearchOutlined } from "@ant-design/icons";

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
  //     value: "james",
  //     label: "James",
  //   },
  //   {
  //     id: 2,
  //     value: "lucy",
  //     label: "Lucy",
  //   },
  //   {
  //     id: 3,
  //     value: "lisa",
  //     label: "Lisa",
  //   },
  //   {
  //     id: 4,
  //     value: "peter",
  //     label: "Peter",
  //   },
  // ]);

  // const handleSelect = (value: string) => {
  //   setSelectedValue(value);
  // };

  // const handleChange = (value: string) => {
  //   console.log(`selected ${value}`);
  // };

  // const deleteOption = (value: string) => {
  //   if (setselectData && selectData) {
  //     setselectData(selectData.filter((item) => item.value !== value));
  //     console.log("deleted", value);
  //   }
  // };

  //   const addItem = () => {
  //   const newSelectData = {
  //     id: selectData.length + 1,
  //     value: `new${selectData.length + 1}`,
  //     label: `New Option ${selectData.length + 1}`
  //   };
  //   setselectData([...selectData, newSelectData]);
  //   setSelectedValue(newSelectData.value);
  // };

  return (
    
      <div>hello dashboard</div>


      
   
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
