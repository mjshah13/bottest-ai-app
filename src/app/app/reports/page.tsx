"use client";
import React, { useContext, useState } from "react";
import CustomSelect from "../../../elements/select";
import { GlobalStateType, Option } from "../../../utils/typesInterface";
import { GlobalStateContext } from "../../../globalState";
import { Grid } from "@radix-ui/themes";

const Reports = () => {
  const [selectedSuite, setSelectedSuite] = useState<Option | null>(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState<Option | null>(
    null
  );
  const [selectedBot, setSelectedBot] = useState<Option | null>(null);
  const { botLists, suiteLists, environmentLists } = useContext(
    GlobalStateContext
  ) as GlobalStateType;
  return (
    <>
      <div className="h-[92vh] gap-5 flex flex-col ">
        <div className="flex-1 bg-white mt-12 border-2 rounded-lg border-[#f0f0f0]">
          <div className="rounded-t-lg  dark:bg-[#212427] dark:border-none   bg-white ">
            <div className="py-5 px-4 border-b-2 border-[#f0f0f0] dark:border-b  dark:border-[#434447]">
              <h1 className="font-semibold font-poppin text-3xl dark:text-white text-dark">
                Suite Run Reports
              </h1>
            </div>
            <div className="py-4 px-5 ">
              <Grid columns="1fr 1fr 1fr" gap="18px">
                <div className="w-full">
                  <CustomSelect
                    Btntext="Add / Modify Bots"
                    Label={"Select Bot"}
                    options={botLists || []}
                    selectedValue={botLists?.find(
                      (bot) => bot?.id === selectedBot?.id
                    )}
                    placeholder="Select Bots"
                    onSelectChange={(selectedOption) => {
                      setSelectedBot(selectedOption);
                    }}
                  />
                </div>
                <div className="w-full">
                  <CustomSelect
                    Label={"Select Suites"}
                    Btntext="Add / Modify Suites"
                    selectedValue={suiteLists?.find(
                      (suite) => suite?.id === selectedSuite?.id
                    )}
                    placeholder="Select Suites"
                    options={suiteLists || []}
                    onSelectChange={(selectedOption) => {
                      setSelectedSuite(selectedOption);
                    }}
                  />
                </div>
                <div></div>
              </Grid>
              <div className="mt-5 flex flex-col">
                <h3 className="text-black text-sm font-poppin font-normal">
                  Comparison Suite Run:{" "}
                </h3>
                <div className="flex gap-2 items-center mt-1.5">
                  <p className="text-black font-poppin text-sm font-semibold">
                    Most Recent on Same Environment (default)
                  </p>
                  <button className="outline-none text-sm border-none text-[#388AEB] font-semibold cursor-pointer">
                    Configure
                  </button>
                </div>
                <p className="text-[#909193] text-sm font-poppin font-normal mt-1.5 w-[704px] leading-[22px] ">
                  Configure the Comparison Suite Run for all “Test suite 3”
                  reports. Note that updating this configuration will update
                  each interactive report for this Suite.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
